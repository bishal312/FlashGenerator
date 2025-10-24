"use server";

import z from "zod";
import { APIError } from "better-auth/api";
import { db } from "../../../lib/db";
import { user } from "../../../lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export type SignUpFormstate = {
  errors?: {
    properties?: {
      username?: string[];
      email?: string[];
      password?: string[];
      confirmPassword?: string[];
    };
  };
  message?: string;
  success?: boolean;
  inputs?: {
    username?: string;
    password?: string;
    email?: string;
    confirmPassword?: string;
  };
  timestamp: number;
};

const adminEmails = process.env.ADMIN_EMAILS?.split(",") ?? [];

export async function signUp(
  prevState: SignUpFormstate,
  formData: FormData
): Promise<SignUpFormstate> {
  const userData = z.object({
    username: z
      .string()
      .trim()
      .min(5, "Username must be at least 5 characters")
      .max(32, "Username must be at most 32 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Only letters, numbers, and underscores are allowed"
      )
      .nonempty(),

    email: z.email().trim().nonempty(),
    password: z
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character"
      ),
  });

  const validateFields = userData.safeParse({
    email: formData.get("email") as string,
    username: formData.get("username") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  });

  const inputs = Object.fromEntries(formData.entries());
  if (!validateFields.success) {
    const tree = z.treeifyError(validateFields.error);
    return {
      errors: {
        properties: {
          username: tree.properties?.username?.errors,
          email: tree.properties?.email?.errors,
          password: tree.properties?.password?.errors,
          confirmPassword: tree.properties?.confirmPassword?.errors,
        },
      },
      message: "Validation Failed",
      success: false,
      inputs,
      timestamp: Date.now(),
    };
  }

  const { username, email, password, confirmPassword } = validateFields.data;

  if (password !== confirmPassword) {
    return {
      success: false,
      errors: {
        properties: {
          password: ["Password didn't match"],
          confirmPassword: ["Password didn't match"],
        },
      },
      inputs,
      timestamp: Date.now(),
    };
  }

  console.log(email);

  try {
    await auth.api.signUpEmail({
      body: {
        name: username.toLowerCase(),
        email,
        password,
        username: username.toLowerCase(),
        displayUsername: username,
      },
    });

    const normalizedEmail = email.toLowerCase();
    const isAdmin = adminEmails.includes(normalizedEmail);

    await db
      .update(user)
      .set({
        role: isAdmin ? "admin" : "user",
      })
      .where(eq(user.email, email))
      .returning();

    redirect("/dashboard");
  } catch (error) {
    if (error instanceof APIError) {
      console.error("STATUS:", error.status, "MESSAGE:", error.message);
      switch (error.status) {
        case "UNPROCESSABLE_ENTITY":
          return {
            success: false,
            message: "User already exists",
            timestamp: Date.now(),
            inputs,
          };
        case "BAD_REQUEST":
          return {
            success: false,
            message: error.message,
            timestamp: Date.now(),
            inputs,
          };
        default:
          return {
            success: false,
            message: "Something went wrong",
            timestamp: Date.now(),
            inputs,
          };
      }
    }
    throw error;
  }
}

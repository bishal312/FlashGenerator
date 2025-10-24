"use server";

import z from "zod";
import { APIError } from "better-auth/api";
import { db } from "../../../lib/db";
import { user } from "../../../lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export type SignInFormState = {
  errors?: {
    properties?: {
      username?: string[];
      password?: string[];
    };
  };
  message?: string;
  success?: boolean;
  inputs?: {
    username?: string;
    password?: string;
  };
  timestamp: number;
};

export async function signIn(
  prevState: SignInFormState,
  formData: FormData
): Promise<SignInFormState> {
  const userData = z.object({
    username: z
      .string()
      .trim()
      .min(1, "Username is required")
      .nonempty({ error: "Username is required" }),
    password: z.string().trim().nonempty({ error: "Password is required" }),
  });

  const validateFields = userData.safeParse({
    username: formData.get("username") as string,
    password: formData.get("password") as string,
  });

  const inputs = Object.fromEntries(formData.entries());
  if (!validateFields.success) {
    const tree = z.treeifyError(validateFields.error);
    return {
      errors: {
        properties: {
          username: tree.properties?.username?.errors,
          password: tree.properties?.password?.errors,
        },
      },
      message: "Validation Failed",
      success: false,
      inputs,
      timestamp: Date.now(),
    };
  }

  const { username, password } = validateFields.data;

  try {
    await auth.api.signInUsername({
      body: {
        username,
        password,
      },
    });

    const [userRecord] = await db
      .select()
      .from(user)
      .where(eq(user.username, username.toLowerCase()));

    console.log("username frm form: ", username);
    console.log("lowercased username from form: ", username.toLowerCase());
    console.log("usernmae from db: ", userRecord.username);

    if (userRecord.role === "admin") return redirect("/admin");

    redirect("/dashboard");
  } catch (error) {
    if (error instanceof APIError) {
      // switch (error.status) {
      //   case "UNPROCESSABLE_ENTITY":
      //     return {
      //       success: false,
      //       message: "Incorrect password",
      //       errors: {
      //         properties: {
      //           password: ["Incorrect password"],
      //         },
      //       },
      //       inputs,
      //       timestamp: Date.now(),
      //     };
      //   case "BAD_REQUEST":
      //     return {
      //       success: false,
      //       message: "Invalid username",
      //       errors: {
      //         properties: {
      //           username: ["Invalid username"],
      //         },
      //       },
      //       inputs,
      //       timestamp: Date.now(),
      //     };
      //   default:
      //     return {
      //       success: false,
      //       message: error.body?.message ?? "Something went wrong",
      //       timestamp: Date.now(),
      //       inputs,
      //     };
      // }
      return {
        message: error.message,
        inputs,
        success: false,
        timestamp: Date.now(),
      };
    }
    throw error;
  }
}

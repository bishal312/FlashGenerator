"use server";

import { getCurrentAdmin } from "@/helpers/getCurrentAdmin";
import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import z from "zod";

export type UpdatePasswordFormstate = {
  errors?: {
    properties?: {
      newPassword?: string[];
    };
  };
  currentPassword?: string;
  userId?: string;
  success: boolean;
  message: string;
  inputs?: {
    currentPassword?: string;
    newPassword?: string;
    confirmNewPassword?: string;
  };
  timestamp: number;
};
export async function updatePassword(
  prevState: UpdatePasswordFormstate,
  formData: FormData
): Promise<UpdatePasswordFormstate> {
  console.log("fromdata: ", formData);
  const result = await getCurrentAdmin();
  if (!result.success) {
    return {
      success: false,
      message: result.message,
      timestamp: Date.now(),
    };
  }

  const userId = formData.get("userId") as string;
  if (userId !== result.adminRecord.id) {
    return {
      success: false,
      message: "Unauthorized attempt",
      timestamp: Date.now(),
    };
  }

  const passwordSchema = z.object({
    newPassword: z
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

  const validateFields = passwordSchema.safeParse({
    newPassword: formData.get("newPassword") as string,
  });

  if (!validateFields.success) {
    return {
      errors: {
        properties: {
          newPassword: z.treeifyError(validateFields.error).properties
            ?.newPassword?.errors,
        },
      },
      success: false,
      message: "Validation failed",
      inputs: Object.fromEntries(formData),
      timestamp: Date.now(),
    };
  }
  const { newPassword } = validateFields.data;

  const confirmNewPassword = formData.get("confirmNewPassword") as string;
  const currentPassword = formData.get("currentPassword") as string;
  if (newPassword !== confirmNewPassword) {
    return {
      success: false,
      message: "Password didnt match",
      timestamp: Date.now(),
      inputs: Object.fromEntries(formData),
    };
  }
  if (newPassword === currentPassword) {
    return {
      success: false,
      message: "New password cannot be same as old password",
      timestamp: Date.now(),
      inputs: Object.fromEntries(formData),
    };
  }

  try {
    await auth.api.changePassword({
      body: {
        newPassword,
        currentPassword,
      },
      headers: await headers(),
    });
    return {
      success: true,
      message: "Password updated successfully",
      timestamp: Date.now(),
    };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        success: false,
        message: error.message,
        timestamp: Date.now(),
        inputs: Object.fromEntries(formData),
      };
    }
    console.log("error: ", error);
    return {
      success: false,
      message: "Something went wrong",
      timestamp: Date.now(),
      inputs: Object.fromEntries(formData),
    };
  }
}

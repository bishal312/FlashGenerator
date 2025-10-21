"use server";

import { getCurrentAdmin } from "@/helpers/getCurrentAdmin";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { APIError } from "better-auth/api";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import z from "zod";

export type UpdateNameEmailFormState = {
  errors?: {
    properties?: {
      name?: string[];
      email?: string[];
    };
  };
  userId?: string;
  message: string;
  success: boolean;
  timestamp: number;
  inputs?: {
    name?: string;
    email?: string;
  };
};

export async function updateNameEmail(
  prevState: UpdateNameEmailFormState,
  formData: FormData
): Promise<UpdateNameEmailFormState> {
  //   console.log("fromdata: ", formData);
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
  const profileSchema = z.object({
    name: z.string().trim().min(1).optional(),
    email: z.email().trim().optional(),
  });
  const validateFields = profileSchema.safeParse({
    name: formData.get("name") as string,
    email: formData.get("email") as string,
  });

  if (!validateFields.success) {
    const tree = z.treeifyError(validateFields.error);
    // console.log("name: ", tree.properties?.name?.errors[0]);
    // console.log("email: ", tree.properties?.email?.errors[0]);
    return {
      errors: {
        properties: {
          name: tree.properties?.name?.errors,
          email: tree.properties?.email?.errors,
        },
      },
      message: "Validation failed",
      success: false,
      timestamp: Date.now(),
      inputs: Object.fromEntries(formData),
    };
  }
  const { name, email } = validateFields.data;

  if (
    (!email || email === result.adminRecord.email) &&
    (!name || name === result.adminRecord.name)
  ) {
    return {
      success: false,
      message: "No changes detected",
      timestamp: Date.now(),
    };
  }

  try {
    if (email && email !== result.adminRecord.email) {
      await auth.api.changeEmail({
        body: {
          newEmail: email,

          callbackURL: "/admin/account",
        },
        headers: await headers(),
      });
    }

    if (name && name !== result.adminRecord.name) {
      await db
        .update(user)
        .set({
          name,
          username: name,
          displayUsername: name,
          updatedAt: new Date(),
        })
        .where(eq(user.id, userId));
    }
    revalidatePath("/admin/account");
    return {
      success: true,
      message: "Profile updated successfully",
      timestamp: Date.now(),
    };
  } catch (error) {
    console.log("Error: ", error instanceof Error ? error.message : error);
    console.log("Error: ", error instanceof APIError ? error.message : error);
    console.log("error: ", error);
    return {
      success: false,
      inputs: Object.fromEntries(formData),
      timestamp: Date.now(),
      message: "Something went wrong",
    };
  }
}

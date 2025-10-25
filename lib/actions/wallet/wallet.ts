"use server";

import { getCurrentUser } from "@/helpers/getCurrentUser";
import { db } from "@/lib/db";
import { orders, user } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import z from "zod";

export type WalletFormState = {
  errors?: {
    properties?: {
      walletAddress?: string[];
    };
  };
  userId?: string;
  orderId?: string;
  username?: string;
  message: string;
  success: boolean;
  timestamp: number;
  inputs?: {
    walletAddress?: string;
  };
};

export async function wallet(
  prevState: WalletFormState,
  formData: FormData
): Promise<WalletFormState> {
  console.log("formdata: ", formData);
  const result = await getCurrentUser();
  if (!result.success)
    return {
      success: result.success,
      message: result.message,
      timestamp: Date.now(),
    };
  const userId = formData.get("userId") as string;
  const orderId = formData.get("orderId") as string;
  const username = formData.get("username") as string;
  if (!userId || !orderId || !username) {
    return {
      success: false,
      message: "Missing required credentials",
      timestamp: Date.now(),
    };
  }

  if (userId !== result.user.id) {
    return {
      success: false,
      message: "Unauthorized attempt",
      timestamp: Date.now(),
    };
  }

  if (username.toLowerCase() !== result.user.username) {
    return {
      success: false,
      message: "Unauthorized attempt",
      timestamp: Date.now(),
    };
  }

  const walletSchema = z.object({
    walletAddress: z
      .string()
      .trim()
      .min(34, "Wallet address must be at least 34 characters!")
      .nonempty("Wallet address is required"),
  });

  const validateFields = walletSchema.safeParse({
    walletAddress: formData.get("walletAddress"),
  });
  if (!validateFields.success) {
    return {
      errors: {
        properties: {
          walletAddress: z.treeifyError(validateFields.error).properties
            ?.walletAddress?.errors,
        },
      },
      success: false,
      message: "Validation failed!",
      timestamp: Date.now(),
      inputs: Object.fromEntries(formData),
    };
  }

  const { walletAddress } = validateFields.data;

  try {
    const [orderRecord] = await db
      .select()
      .from(orders)
      .where(and(eq(orders.id, orderId), eq(orders.userId, userId)));
    if (!orderRecord) {
      return {
        success: false,
        message: "No order record found",
        timestamp: Date.now(),
      };
    }

    await db
      .update(orders)
      .set({
        walletAddress,
        telegramName: username.toLowerCase(),
        updatedAt: new Date(),
      })
      .where(eq(orders.id, orderId));

    await db
      .update(user)
      .set({
        lastUpdatedAt: new Date(),
      })
      .where(eq(user.id, userId));
  } catch (error) {
    console.log("Error: ", error);
    return {
      success: false,
      message: "Something went wrong",
      timestamp: Date.now(),
      inputs: Object.fromEntries(formData),
    };
  }

  redirect(`/new-order/select-amount/${orderId}`);
}

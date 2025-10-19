"use server";

import { getCurrentUser } from "@/helpers/getCurrentUser";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { success } from "zod";

export type PaymentFormState = {
  userId?: string;
  orderId?: string;
  depositAddress?: string;
  depositeQrCodeUrl?: string;
  message: string;
  success: boolean;
  timestamp: number;
};
export async function payment(
  prevState: PaymentFormState,
  formData: FormData
): Promise<PaymentFormState> {
  const result = await getCurrentUser();
  if (!result.success)
    return {
      success: result.success,
      message: result.message,
      timestamp: Date.now(),
    };
  const userId = formData.get("userId") as string;
  const orderId = formData.get("orderId") as string;
  const depositAddress = formData.get("depositAddress") as string;
  const depositQrCodeUrl = formData.get("depositQrCodeUrl") as string;
  if (!userId || !orderId || !depositAddress || !depositQrCodeUrl) {
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

  try {
    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.id, orderId));
    if (!order) {
      return {
        success: false,
        message: "Order doesn't exist",
        timestamp: Date.now(),
      };
    }
    if (
      order.depositAddress !== depositAddress ||
      order.depositQrCodeUrl !== depositQrCodeUrl
    ) {
      return {
        success: false,
        message: "Values don't match",
        timestamp: Date.now(),
      };
    }
  } catch (error) {
    console.log("Error: ", error);
    return {
      success: false,
      message: "Something went wrong",
      timestamp: Date.now(),
    };
  }
  redirect(`/new-order/deposit/${orderId}`);
}

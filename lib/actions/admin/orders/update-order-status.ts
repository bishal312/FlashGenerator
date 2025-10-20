"use server";

import { getCurrentAdmin } from "@/helpers/getCurrentAdmin";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export type UpdateOrderStatusFormState = {
  orderId?: string;
  newStatus?: string;
  message: string;
  success: boolean;
  timestamp: number;
};

export async function updateOrderStatus(
  prevState: UpdateOrderStatusFormState,
  formData: FormData
): Promise<UpdateOrderStatusFormState> {
  console.log("formdata: ", formData);
  const result = await getCurrentAdmin();
  if (!result.success) {
    return {
      success: false,
      message: result.message,
      timestamp: Date.now(),
    };
  }
  const orderId = formData.get("orderId");
  if (!orderId || typeof orderId !== "string") {
    return {
      success: false,
      message: "Missing order ID",
      timestamp: Date.now(),
    };
  }
  const status = formData.get("newStatus");
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

    if (order.status === status) {
      return {
        success: false,
        message: "The order already has this status.",
        timestamp: Date.now(),
      };
    }

    await db
      .update(orders)
      .set({
        status: status as "pending" | "success" | "rejected" | "submitted",
      })
      .where(eq(orders.id, orderId));

    return {
      success: true,
      message: "Updated order status successfully",
      timestamp: Date.now(),
    };
  } catch (error) {
    console.log("Error: ", error);
    return {
      success: false,
      message: "Something went wrong",
      timestamp: Date.now(),
    };
  }
}

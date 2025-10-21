"use server";

import { getCurrentUser } from "@/helpers/getCurrentUser";
import { db } from "@/lib/db";
import { orders, user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect, RedirectType } from "next/navigation";
import z from "zod";

export type NewOrderFormState = {
  errors?: {
    properties?: {
      token?: string[];
    };
  };
  userId?: string[];
  success: boolean;
  message: string;
  timestamp: number;
  inputs?: {
    token?: string;
  };
};

const tokenEnum = z
  .enum(["usdt"])
  .refine((val) => ["usdt"].includes(val), { error: "Only USDT is allowed" });
export async function newOrder(
  prevState: NewOrderFormState,
  formData: FormData
): Promise<NewOrderFormState> {
  console.log("formdata: ", formData);
  const result = await getCurrentUser();
  if (!result.success)
    return {
      success: result.success,
      message: result.message,
      timestamp: Date.now(),
    };

  console.log("user: ", result.user.name, result.user.role);

  const userId = formData.get("userId");
  if (!userId) {
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
  const orderSchema = z.object({
    token: tokenEnum,
  });
  const validateFields = orderSchema.safeParse({
    token: formData.get("token"),
  });

  if (!validateFields.success) {
    const tree = z.treeifyError(validateFields.error);
    return {
      errors: {
        properties: {
          token: tree.properties?.token?.errors,
        },
      },
      success: false,
      message: "Validation failed!",
      timestamp: Date.now(),
      inputs: Object.fromEntries(formData),
    };
  }

  const { token } = validateFields.data;
  let orderId: string;

  try {
    const [order] = await db
      .insert(orders)
      .values({
        token,
        userId,
      })
      .returning({ id: orders.id });
    console.log("orderid: ", order.id);
    orderId = order.id;

    await db
      .update(user)
      .set({
        lastUpdatedAt: new Date(),
      })
      .where(eq(user.id, userId));
  } catch (error) {
    console.log("Error: ", error);
    return {
      message: "Something went wrong",
      success: false,
      timestamp: Date.now(),
      inputs: Object.fromEntries(formData),
    };
  }
  redirect(`/new-order/choose-network/${orderId}`, RedirectType.replace);
}

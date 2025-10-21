"use server";

import { getCurrentUser } from "@/helpers/getCurrentUser";
import { db } from "@/lib/db";
import { orders, user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import z from "zod";

export type SelectAmountFormState = {
  errors?: {
    properties?: {
      fromAmount?: string[];
      toAmount?: string[];
      conversionRate?: string[];
    };
  };
  userId?: string;
  orderId?: string;
  message: string;
  inputs?: {
    fromAmount?: string;
    toAmount?: string;
    conversionRate?: string;
  };
  success: boolean;
  timestamp: number;
};

export async function selectAmount(
  prevState: SelectAmountFormState,
  formData: FormData
): Promise<SelectAmountFormState> {
  const result = await getCurrentUser();
  if (!result.success)
    return {
      success: result.success,
      message: result.message,
      timestamp: Date.now(),
    };
  const userId = formData.get("userId") as string;
  const orderId = formData.get("orderId") as string;
  if (!userId || !orderId) {
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

  const amountSchema = z.object({
    fromAmount: z.number().min(50, "Minimum TRC20 required is 50"),
    toAmount: z.number().min(500, "Minimum FLASH required is 500"),
    conversionRate: z
      .number()
      .refine((v) => Math.abs(v - 0.1) <= 0.0001, "Invalid conversion rate"),
  });

  const validateFields = amountSchema.safeParse({
    fromAmount: Number(formData.get("fromAmount")),
    toAmount: Number(formData.get("toAmount")),
    conversionRate: Number(formData.get("conversionRate")),
  });

  if (!validateFields.success) {
    const tree = z.treeifyError(validateFields.error);
    return {
      errors: {
        properties: {
          fromAmount: tree.properties?.fromAmount?.errors,
          toAmount: tree.properties?.toAmount?.errors,
          conversionRate: tree.properties?.conversionRate?.errors,
        },
      },
      success: false,
      message: "Validation failed",
      timestamp: Date.now(),
      inputs: Object.fromEntries(formData),
    };
  }

  const { fromAmount, toAmount, conversionRate } = validateFields.data;
  if (fromAmount < 50 || toAmount < 500) {
    return {
      success: false,
      message: "Minimum balance is not met",
      inputs: Object.fromEntries(formData),
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
        message: "Invalid order",
        timestamp: Date.now(),
        success: false,
      };
    }

    await db
      .update(orders)
      .set({
        fromAmount,
        toAmount,
        conversionRate,
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
  redirect(`/new-order/payment/${orderId}`);
}

"use server";

import { getCurrentUser } from "@/helpers/getCurrentUser";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import z from "zod";

export type DepositFormState = {
  errors?: {
    properties?: {
      transactionId?: string[];
      paymentScreenshotUrl?: string[];
    };
  };
  userId?: string;
  orderId?: string;
  success: boolean;
  message: string;
  timestamp: number;
  inputs?: {
    transactionId?: string;
    paymentScreenshotUrl?: string;
  };
};

export async function deposit(
  prevState: DepositFormState,
  formData: FormData
): Promise<DepositFormState> {
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
  const transactionId = formData.get("transactionId") as string;
  if (!userId || !orderId || !transactionId) {
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

  const transactionSchema = z.object({
    transactionId: z
      .string()
      .trim()
      .min(34, "Transaction id must be at least 34 characters!")
      .nonempty("Transaction id is required"),
    paymentScreenshotUrl: z.string().trim().optional(),
  });

  const validateFields = transactionSchema.safeParse({
    transactionId: formData.get("transactionId") as string,
    paymentScreenshotUrl: formData.get("paymentScreenshotUrl") as string,
  });

  if (!validateFields.success) {
    const tree = z.treeifyError(validateFields.error);
    console.log("error: ", tree.properties?.transactionId?.errors[0]);
    console.log("error: ", tree.properties?.paymentScreenshotUrl?.errors[0]);
    return {
      success: false,
      message: "Validation failed",
      inputs: Object.fromEntries(formData),
      errors: {
        properties: {
          transactionId: tree.properties?.transactionId?.errors,
          paymentScreenshotUrl: tree.properties?.paymentScreenshotUrl?.errors,
        },
      },
      timestamp: Date.now(),
    };
  }

  const { paymentScreenshotUrl } = validateFields.data;

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

    await db
      .update(orders)
      .set({
        txId: transactionId,
        paymentProofUrl: paymentScreenshotUrl ? paymentScreenshotUrl : null,
        updatedAt: new Date(),
      })
      .where(eq(orders.id, orderId));
  } catch (error) {
    console.log("Error: ", error);
    return {
      success: false,
      message: "Somethign went wrong",
      inputs: Object.fromEntries(formData),
      timestamp: Date.now(),
    };
  }
  redirect(`/order-history/${orderId}`);
}

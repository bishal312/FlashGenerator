"use server";

import { getCurrentUser } from "@/helpers/getCurrentUser";
import { db } from "@/lib/db";
import { orders, user } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import z from "zod";

export type ChooseNetworkFormState = {
  errors?: {
    properties?: {
      network?: string[];
    };
  };
  userId?: string;
  orderId?: string;
  message: string;
  success: boolean;
  timestamp: number;
  inputs?: { network?: string };
};

const networkEnum = z
  .enum(["trc20"])
  .refine((val) => ["trc20"].includes(val), { error: "Invalid network" });
export async function chooseNetwork(
  prevState: ChooseNetworkFormState,
  formData: FormData
): Promise<ChooseNetworkFormState> {
  console.log("formdat: ", formData);
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

  console.log("formdata: ", formData);
  const orderSchema = z.object({
    network: networkEnum,
  });
  const validateFields = orderSchema.safeParse({
    network: formData.get("network"),
  });

  if (!validateFields.success) {
    const tree = z.treeifyError(validateFields.error);
    return {
      errors: {
        properties: {
          network: tree.properties?.network?.errors,
        },
      },
      success: false,
      message: "Validation failed!",
      timestamp: Date.now(),
      inputs: Object.fromEntries(formData),
    };
  }

  const { network } = validateFields.data;
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
        network,
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
  redirect(`/new-order/wallet-address/${orderId}`);
}

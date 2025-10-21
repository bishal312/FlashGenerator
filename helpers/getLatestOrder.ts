"use server";

import { orders, OrderSelectType } from "@/lib/db/schema";
import { getCurrentUser } from "./getCurrentUser";
import { db } from "@/lib/db";

type LatestOrder =
  | { success: false; message: string }
  | { success: true; latestOrder: OrderSelectType };

export async function getLatestOrder(): Promise<LatestOrder> {
  const result = await getCurrentUser();

  if (!result.success) {
    return {
      success: false,
      message: result.message,
    };
  }

  const userId = result.user.id;

  const latestOrder = await db.query.orders.findMany({
    where: (fields, { eq }) => eq(fields.userId, userId),
    orderBy: (fields, { desc }) => desc(fields.createdAt),
    limit: 1,
  });

  if (latestOrder.length === 0) {
    return {
      success: false,
      message: "No orders found",
    };
  }

  return {
    success: true,
    latestOrder: latestOrder[0],
  };
}

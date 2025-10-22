"use server";

import { OrderSelectType } from "@/lib/db/schema";
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

  const latestValidOrder = await db.query.orders.findFirst({
    where: (fields, { and, eq, isNotNull, ne }) =>
      and(
        eq(fields.userId, userId),
        isNotNull(fields.txId),
        ne(fields.txId, ""),
        isNotNull(fields.walletAddress),
        ne(fields.walletAddress, ""),
        isNotNull(fields.depositAddress),
        ne(fields.depositAddress, ""),
        isNotNull(fields.depositQrCodeUrl),
        ne(fields.depositQrCodeUrl, "")
      ),
    orderBy: (fields, { desc }) => desc(fields.createdAt),
  });

  if (!latestValidOrder) {
    return {
      success: false,
      message: "No valid orders found",
    };
  }

  return {
    success: true,
    latestOrder: latestValidOrder,
  };
}

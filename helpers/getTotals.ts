"use server";

import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { and, eq, sum } from "drizzle-orm";
import { getCurrentUser } from "./getCurrentUser";

type TotalsReturnType =
  | { success: false; message: string }
  | { success: true; pendingSum: number; approvedSum: number };

export async function getTotals(): Promise<TotalsReturnType> {
  const result = await getCurrentUser();
  if (!result.success) {
    return {
      success: false,
      message: result.message,
    };
  }

  const userId = result.user.id;

  const [pendingSum] = await db
    .select({
      totalAmount: sum(orders.fromAmount),
    })
    .from(orders)
    .where(and(eq(orders.status, "pending"), eq(orders.userId, userId)));

  const [approvedSum] = await db
    .select({
      totalAmount: sum(orders.fromAmount),
    })
    .from(orders)
    .where(and(eq(orders.status, "success"), eq(orders.userId, userId)));
  console.log("pendingamount: ", pendingSum.totalAmount);
  console.log("approvedamount: ", approvedSum.totalAmount);
  return {
    success: true,
    pendingSum: Number(pendingSum.totalAmount),
    approvedSum: Number(approvedSum.totalAmount),
  };
}

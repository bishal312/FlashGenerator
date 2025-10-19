"use server";

import { OrderSelectType } from "@/lib/db/schema";

type OrderDepositType =
  | { success: true; orders: OrderSelectType[] }
  | { success: false; message: string };
export async function getOrderDepositInfo() {
  const session = await ge;
}

import { getCurrentUser } from "@/helpers/getCurrentUser";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import OrderHistory from "@/modules/OrderHistroy";
import { and, desc, isNotNull, ne } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const result = await getCurrentUser();
  if (!result.success) redirect("/sign-in");

  const userId = result.user.id;

  const allOrders = await db.query.orders.findMany({
    where: (fields, { eq }) =>
      and(
        eq(orders.userId, userId),
        isNotNull(orders.walletAddress),
        ne(orders.walletAddress, ""),
        isNotNull(orders.txId),
        ne(orders.txId, ""),
        isNotNull(orders.telegramName),
        ne(orders.telegramName, ""),
        ne(orders.depositAddress, ""),
        ne(orders.depositQrCodeUrl, "")
      ),
    orderBy: desc(orders.createdAt),
  });

  return (
    <>
      <OrderHistory allOrders={allOrders ?? []} from="order-history" />
    </>
  );
};

export default page;

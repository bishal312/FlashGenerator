import { getCurrentUser } from "@/helpers/getCurrentUser";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import OrderStatus from "@/modules/OrderStatus";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: Promise<{ orderId: string }>;
};

const Page = async ({ params }: Props) => {
  const result = await getCurrentUser();
  if (!result.success) redirect("/sign-in");
  const { orderId } = await params;
  if (!orderId) {
    return (
      <div>
        <h1>Order Id not found</h1>
      </div>
    );
  }

  const order = await db.query.orders.findFirst({
    where: (fields, { eq, ne, isNotNull, and }) =>
      and(
        eq(orders.id, orderId),
        isNotNull(orders.walletAddress),
        ne(orders.walletAddress, ""),
        isNotNull(orders.txId),
        ne(orders.txId, ""),
        isNotNull(orders.telegramName),
        ne(orders.telegramName, ""),
        ne(orders.depositAddress, ""),
        ne(orders.depositQrCodeUrl, "")
      ),
    with: {
      user: true,
    },
  });

  if (!order) {
    return (
      <div>
        <h1>Order not found</h1>
      </div>
    );
  }
  return (
    <>
      <OrderStatus orderRecord={order} />
    </>
  );
};

export default Page;

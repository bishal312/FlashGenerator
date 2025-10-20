import { requireAdmin } from "@/helpers/requireAdmin";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import OrderDetailPage from "@/modules/admin/orders/order-detail";
import { and, isNotNull, ne, gte } from "drizzle-orm";
import React from "react";

type Props = {
  params: Promise<{ orderId: string }>;
};
const Page = async ({ params }: Props) => {
  const { orderId } = await params;
  if (!orderId) {
    return <div>missing order Id</div>;
  }
  await requireAdmin();
  const order = await db.query.orders.findFirst({
    where: (field, { eq }) =>
      and(
        eq(orders.id, orderId),
        isNotNull(orders.walletAddress),
        ne(orders.walletAddress, ""),
        isNotNull(orders.txId),
        ne(orders.txId, ""),
        isNotNull(orders.telegramName),
        ne(orders.telegramName, ""),
        gte(orders.toAmount, 500),
        gte(orders.fromAmount, 50),
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
        <h1>Order record not found!</h1>
      </div>
    );
  }
  return <OrderDetailPage order={order} />;
};

export default Page;

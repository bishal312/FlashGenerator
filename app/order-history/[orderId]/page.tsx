import { getCurrentUser } from "@/helpers/getCurrentUser";
import { db } from "@/lib/db";
import { orders, OrderSelectType, UserSelectType } from "@/lib/db/schema";
import Navbar from "@/modules/Navbar/Navbar";
import OrderStatus from "@/modules/OrderStatus";
import { and } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: Promise<{ orderId: string }>;
};

type OrderWithUserType = OrderSelectType & {
  user: UserSelectType;
};
const Page = async ({ params }: Props) => {
  const result = await getCurrentUser();
  if (!result.success) redirect("/sign-in");
  const userId = result.user.id;
  const { orderId } = await params;
  if (!orderId) {
    return (
      <div>
        <h1>Order Id not found</h1>
      </div>
    );
  }

  const order = await db.query.orders.findFirst({
    where: (fields, { eq }) =>
      and(eq(orders.id, orderId), eq(orders.userId, userId)),
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
      <Navbar />
      <OrderStatus orderRecord={order} />
    </>
  );
};

export default Page;

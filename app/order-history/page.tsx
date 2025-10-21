import { getCurrentUser } from "@/helpers/getCurrentUser";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import Navbar from "@/modules/Navbar/Navbar";
import OrderHistory from "@/modules/OrderHistroy";
import { desc } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const result = await getCurrentUser();
  if (!result.success) redirect("/sign-in");

  const userId = result.user.id;

  const allOrders = await db.query.orders.findMany({
    where: (fields, { eq }) => eq(orders.userId, userId),
    orderBy: desc(orders.createdAt),
  });

  return (
    <>
      <Navbar />
      <OrderHistory allOrders={allOrders ?? []} />
    </>
  );
};

export default page;

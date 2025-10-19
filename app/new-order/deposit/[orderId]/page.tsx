import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { orders, user } from "@/lib/db/schema";
import Deposit from "@/modules/admin/deposit/deposit";
import Payment from "@/modules/admin/payment/payment";
import SelectAmount from "@/modules/admin/select-amount/select-amount";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
type Props = {
  params: Promise<{ orderId: string }>;
};
const Page = async ({ params }: Props) => {
  const { orderId } = await params;
  if (!orderId) {
    return redirect("/new-order");
  }
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/sign-in");
  const [userRecord] = await db
    .select()
    .from(user)
    .where(eq(user.id, session.user.id));
  if (!userRecord) {
    await auth.api.signOut({ headers: await headers() });
  }
  if (userRecord.role !== "user") return redirect("/dashboard");
  const [orderRecord] = await db
    .select()
    .from(orders)
    .where(eq(orders.id, orderId));
  if (!orderRecord) {
    redirect("/new-order");
  }

  if (!orderRecord.network || !orderRecord.fromAmount) {
    return <div>Invalid order</div>;
  }
  return <Deposit userId={userRecord.id} orderId={orderRecord.id} />;
};

export default Page;

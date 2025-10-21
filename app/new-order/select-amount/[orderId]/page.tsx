import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { orders, systemSettings, user } from "@/lib/db/schema";
import SelectAmount from "@/modules/admin/select-amount/select-amount";
import Navbar from "@/modules/Navbar/Navbar";
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
  const [systemRecord] = await db
    .select()
    .from(systemSettings)
    .where(eq(systemSettings.id, "system"));
  return (
    <>
      <Navbar />
      <SelectAmount
        userId={userRecord.id}
        orderId={orderRecord.id}
        conversionRate={systemRecord.conversionRate}
      />
    </>
  );
};

export default Page;

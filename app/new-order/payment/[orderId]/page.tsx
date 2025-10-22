import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { orders, systemSettings, user } from "@/lib/db/schema";
import Payment from "@/modules/admin/payment/payment";
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

  const [systemRecord] = await db
    .select()
    .from(systemSettings)
    .where(eq(systemSettings.id, "system"));
  if (!systemRecord) {
    return (
      <div className="flex flex-col gap-4 min-h-screen items-center justify-center">
        <h1>Missing deposit address and qr</h1>
        <p>We&apos;ll fix this shortly</p>
      </div>
    );
  }
  return (
    <>
      <Payment
        userId={userRecord.id}
        orderId={orderRecord.id}
        network={orderRecord.network}
        depositAddress={systemRecord.depositAddress}
        depositQrCodeUrl={systemRecord.depositQrCodeUrl}
        depositedAmount={orderRecord.fromAmount}
      />
    </>
  );
};

export default Page;

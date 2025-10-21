import { getLatestOrder } from "@/helpers/getLatestOrder";
import { getTotals } from "@/helpers/getTotals";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { OrderSelectType, user } from "@/lib/db/schema";
import DashboardView from "@/modules/dashboard/ui/view/dashboard-view";
import Navbar from "@/modules/Navbar/Navbar";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return redirect("/sign-in");

  const [userRecord] = await db
    .select()
    .from(user)
    .where(eq(user.id, session.user.id));
  if (!userRecord) {
    await auth.api.signOut({ headers: await headers() });
    return redirect("/sign-in");
  }

  if (userRecord.role === "admin") {
    return redirect("/admin");
  }

  const total = await getTotals();
  let pendingAmountTotal: number = 0;
  let approvedAmountTotal: number = 0;
  if (total.success) {
    pendingAmountTotal = total.pendingSum;
    approvedAmountTotal = total.approvedSum;
  }

  let latestOrder: OrderSelectType | null = null;
  const order = await getLatestOrder();
  if (order.success) {
    latestOrder = order.latestOrder;
  }

  return (
    <>
      <Navbar />
      <DashboardView
        userRecord={userRecord}
        total={{
          pendingAmount: pendingAmountTotal ?? 0,
          approvedAmount: approvedAmountTotal ?? 0,
        }}
        latestOrder={latestOrder}
      />
    </>
  );
};

export default page;

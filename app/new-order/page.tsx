import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import NewOrder from "@/modules/admin/new-order/new-order";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) return redirect("/sign-in");
  const [userRecord] = await db
    .select()
    .from(user)
    .where(eq(user.id, session.user.id));
  if (!userRecord) {
    await auth.api.signOut({ headers: await headers() });
  }
  if (userRecord.role !== "user") return redirect("/dashboard");
  return (
    <>
      <NewOrder userId={userRecord.id} />)
    </>
  );
};

export default Page;

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import DashboardView from "@/modules/dashboard/ui/view/dashboard-view";
import Navbar from "@/modules/Navbar/Navbar";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  // const session = await auth.api.getSession({ headers: await headers() });
  // if (!session) return redirect("/sign-in");

  // const [userRecord] = await db
  //   .select()
  //   .from(user)
  //   .where(eq(user.id, session.user.id));
  // if (!userRecord) {
  //   await auth.api.signOut({ headers: await headers() });
  //   return redirect("/sign-in");
  // }

  // if (userRecord.role === "admin") {
  //   return redirect("/admin");
  // }
  return (<>
    <Navbar />
    <DashboardView />
  </>);
};

export default page;

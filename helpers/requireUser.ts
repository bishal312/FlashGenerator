"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function requireUser() {
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

  return redirect("/dashboard");
}

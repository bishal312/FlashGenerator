"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user, UserSelectType } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

type CurrentUserType =
  | { success: false; message: string }
  | { success: true; message: string; user: UserSelectType };
export async function getCurrentUser(): Promise<CurrentUserType> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { success: false, message: "Unauthorized" };
  }

  const [userRecord] = await db
    .select()
    .from(user)
    .where(eq(user.id, session.user.id));
  if (!userRecord) {
    return { success: false, message: "Unauthorized" };
  }

  if (userRecord.role !== "user") {
    return { success: false, message: "Invalid role" };
  }

  return { success: true, message: "Authorized user", user: userRecord };
}

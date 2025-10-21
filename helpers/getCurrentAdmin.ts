"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user, UserSelectType } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

type CurrentAdmin =
  | { success: false; message: string }
  | { success: true; adminRecord: UserSelectType };

export async function getCurrentAdmin(): Promise<CurrentAdmin> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const [userRecord] = await db
    .select()
    .from(user)
    .where(eq(user.id, session.user.id));
  if (!userRecord) {
    return {
      success: false,
      message: "User doesn't exist",
    };
  }

  if (userRecord.role !== "admin") {
    return {
      success: false,
      message: "User is not a admin",
    };
  }

  return { success: true, adminRecord: userRecord };
}

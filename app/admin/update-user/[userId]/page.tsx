import { requireAdmin } from "@/helpers/requireAdmin";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import User from "@/modules/admin/manage-users-ui/ui/view/User";
import { eq } from "drizzle-orm";
import React from "react";

type Props = {
  params: Promise<{ userId: string }>;
};

const page = async ({ params }: Props) => {
  const { userId } = await params;
  await requireAdmin();

  const [userRecord] = await db.select().from(user).where(eq(user.id, userId));
  if (!userRecord) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        <h1>No record found for the user!</h1>
      </div>
    );
  }
  return <User user={userRecord} />;
};

export default page;

import { requireAdmin } from "@/helpers/requireAdmin";
import { db } from "@/lib/db";
import { user, UserSelectType } from "@/lib/db/schema";
import Users from "@/modules/admin/manage-users-ui/ui/view/Users";
import React from "react";

const page = async () => {
  await requireAdmin();
  const users: UserSelectType[] = await db.query.user.findMany({
    where: (fields, { eq }) => eq(user.role, "user"),
  });
  if (users.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen text-2xl font-bold">
        <h1>No user found</h1>
      </div>
    );
  }
  return <Users users={users} />;
};

export default page;

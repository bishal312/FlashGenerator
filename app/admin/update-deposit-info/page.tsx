import { requireAdmin } from "@/helpers/requireAdmin";
import { db } from "@/lib/db";
import { systemSettings } from "@/lib/db/schema";
import UpdateDepositInfo from "@/modules/admin/ui/update-deposit-info/update-deposit-info";
import { eq } from "drizzle-orm";
import React from "react";

const page = async () => {
  await requireAdmin();

  const [systemRecord] = await db
    .select()
    .from(systemSettings)
    .where(eq(systemSettings.id, "system"));

  return <UpdateDepositInfo systemRecord={systemRecord} />;
};

export default page;

import { requireAdmin } from "@/helpers/requireAdmin";
import { db } from "@/lib/db";
import { systemSettings } from "@/lib/db/schema";
import UpdateContact from "@/modules/admin/update-contact-info/update-contact";
import { eq } from "drizzle-orm";

export default async function Page() {
  await requireAdmin();
  const [systemRecord] = await db
    .select()
    .from(systemSettings)
    .where(eq(systemSettings.id, "system"));

  return <UpdateContact supportUsername={systemRecord.supportUsername} />;
}

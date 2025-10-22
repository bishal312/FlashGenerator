import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { systemSettings } from "@/lib/db/schema";
import ContactUs from "@/modules/contact-us/contact-us";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }

  const [systemRecord] = await db
    .select()
    .from(systemSettings)
    .where(eq(systemSettings.id, "system"));

  return <ContactUs contactUsername={systemRecord.supportUsername ?? null} />;
}

import { requireAdmin } from "@/helpers/requireAdmin";
import Faq from "@/modules/admin/faqs/faq";
import { db } from "@/lib/db";
import { FaqsSelectType } from "@/lib/db/schema";

const Page = async () => {
  await requireAdmin();

  const allFaqs: FaqsSelectType[] = await db.query.faqs.findMany();
  return <Faq allFaqs={allFaqs ?? []} />;
};

export default Page;

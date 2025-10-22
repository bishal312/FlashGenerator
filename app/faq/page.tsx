import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { faqs } from "@/lib/db/schema";
import Faq from "@/modules/Faq";
import { desc } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }
  const allFaqs = await db.query.faqs.findMany({
    orderBy: desc(faqs.createdAt),
  });
  return (
    <>
      <Faq allFaqs={allFaqs} />
    </>
  );
};

export default page;

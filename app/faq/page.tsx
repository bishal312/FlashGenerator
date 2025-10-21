import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import Faq from "@/modules/Faq";
import Navbar from "@/modules/Navbar/Navbar";
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
  const allFaqs = await db.query.faqs.findMany();
  return (
    <>
      <Navbar />
      <Faq allFaqs={allFaqs} />
    </>
  );
};

export default page;

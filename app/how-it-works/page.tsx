import { auth } from "@/lib/auth";
import HowItWorks from "@/modules/HowItWorks";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/sign-in");
  return (
    <>
      <HowItWorks />
    </>
  );
};

export default page;

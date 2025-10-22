import { auth } from "@/lib/auth";
import SupportedPlatform from "@/modules/SupportedPlatform";
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
      <SupportedPlatform />
    </>
  );
};

export default page;

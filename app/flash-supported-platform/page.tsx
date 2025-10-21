import { auth } from "@/lib/auth";
import Navbar from "@/modules/Navbar/Navbar";
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
      <Navbar />
      <SupportedPlatform />
    </>
  );
};

export default page;

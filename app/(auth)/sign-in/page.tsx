import { auth } from "@/lib/auth";
import LoginPage from "@/modules/auth/Login";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) redirect("/dashboard");

  return (
    <div>
      <LoginPage />
    </div>
  );
};

export default page;

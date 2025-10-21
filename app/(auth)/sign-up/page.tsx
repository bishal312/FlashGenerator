import { auth } from "@/lib/auth";
import SignupPage from "@/modules/auth/Signup";
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
      <SignupPage />
    </div>
  );
};

export default page;

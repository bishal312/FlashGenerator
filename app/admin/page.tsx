import { requireAdmin } from "@/helpers/requireAdmin";
import React from "react";

const page = async () => {
  await requireAdmin();
  return <div>page</div>;
};

export default page;

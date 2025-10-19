<<<<<<< HEAD
import Navbar from "@/modules/Navbar/Navbar";
import SelectAmount from "@/modules/SelectAmount";
import React from "react";

const page = () => {
  return (
    <>
      <Navbar />
      <SelectAmount />
    </>
  );
=======
import { redirect } from "next/navigation";

const Page = () => {
  redirect("/new-order");
>>>>>>> main
};

export default Page;

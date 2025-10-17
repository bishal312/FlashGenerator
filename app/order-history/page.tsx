import Navbar from "@/modules/Navbar/Navbar";
import OrderHistory from "@/modules/OrderHistroy";
import ViewOrderHistory from "@/modules/ViewOrderHistory";
import React from "react";

const page = () => {
  return (
    <>
      <Navbar />
      <ViewOrderHistory />
      <OrderHistory /></>
  );
};

export default page;

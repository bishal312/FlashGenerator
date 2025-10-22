"use client";
import React, { useState } from "react";
import { UserSelectType, OrderSelectType } from "@/lib/db/schema";
import Link from "next/link";

type Props = {
  allOrders: (OrderSelectType & {
    user: UserSelectType;
  })[];
};

const Order = ({ allOrders }: Props) => {
  const [activeTab, setActiveTab] = useState<
    "pending" | "success" | "rejected" | "submitted"
  >("pending");

  const filteredOrders = allOrders.filter(
    (order) => order.status === activeTab
  );

  const tabs = [
    {
      id: "pending",
      label: "Pending",
      count: allOrders.filter((o) => o.status === "pending").length,
    },
    {
      id: "success",
      label: "Success",
      count: allOrders.filter((o) => o.status === "success").length,
    },
    {
      id: "rejected",
      label: "Rejected",
      count: allOrders.filter((o) => o.status === "rejected").length,
    },
    {
      id: "submitted",
      label: "Submitted",
      count: allOrders.filter((o) => o.status === "submitted").length,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Orders</h1>

        <div className="mb-6 border-b border-gray-200 overflow-x-auto">
          <nav
            className="flex space-x-2 sm:space-x-4 min-w-max sm:min-w-0"
            aria-label="Tabs"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`whitespace-nowrap py-3 px-4 sm:px-6 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
                <span
                  className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                    activeTab === tab.id
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No {activeTab} orders found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-md p-5 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg truncate">
                      {order.user.name}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      @{order.telegramName}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ml-2 flex-shrink-0 ${
                      order.status === "success"
                        ? "bg-green-100 text-green-800"
                        : order.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "rejected"
                        ? "bg-red-100 text-red-800 border-red-200"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium text-gray-900">
                      ${order.toAmount}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Deposit:</span>
                    <span className="font-medium text-gray-900">
                      {order.fromAmount} TRC
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {order.createdAt?.toLocaleDateString()}
                  </div>
                </div>
                <Link
                  href={`/admin/orders/${order.id}`}
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;

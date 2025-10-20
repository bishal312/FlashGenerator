import React from "react";
import { UserSelectType, OrderSelectType } from "@/lib/db/schema";

type Props = {
  allOrders: (OrderSelectType & {
    user: UserSelectType;
  })[];
};

const Order = ({ allOrders }: Props) => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Orders</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-md p-5 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {order.user.name}
                  </h3>
                  <p className="text-sm text-gray-500">@{order.telegramName}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
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

              <a
                href={`/admin/orders/${order.id}`}
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                View Details
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;

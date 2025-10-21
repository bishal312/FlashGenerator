"use client";

import { useState } from "react";
import { Search, Calendar, ChevronDown } from "lucide-react";
import OrderDetails from "./OrderDetails";
import { OrderSelectType } from "@/lib/db/schema";

type Props = {
  allOrders: OrderSelectType[];
  from?: "search-results" | "order-history";
};

export default function OrderHistory({ allOrders, from }: Props) {
  const [status, setStatus] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [selectedOrder, setSelectedOrder] = useState<OrderSelectType | null>(
    null
  );

  const statuses = [
    { label: "Pending", color: "bg-yellow-400" },
    { label: "Success", color: "bg-green-400" },
    { label: "Rejected", color: "bg-red-400" },
  ];

  const filtered = allOrders.filter((o) => {
    const matchesQuery = o.id.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = status ? o.status === status.toLowerCase() : true;
    const orderDate = new Date(o.createdAt!);
    const matchesDate =
      (!startDate || orderDate >= new Date(startDate)) &&
      (!endDate || orderDate <= new Date(endDate));

    return matchesQuery && matchesStatus && matchesDate;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-6 sm:px-8  py-5">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-10">
        {from === "search-results" ? "Search Results" : "View Order History"}
      </h1>

      {from === "order-history" && (
        <>
          <div className="w-full max-w-md mx-auto mb-10">
            <h2 className="text-lg font-semibold text-center mb-3">
              Date Range
            </h2>
            <div className="flex items-center bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 space-x-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-transparent w-full focus:outline-none text-gray-300 text-sm"
              />
              <span className="text-gray-500">→</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-transparent w-full focus:outline-none text-gray-300 text-sm"
              />
              <Calendar className="text-gray-400 w-5 h-5" />
            </div>
          </div>

          <div className="w-full max-w-md mx-auto mb-8">
            <h2 className="text-lg font-semibold text-center mb-3">Status</h2>
            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-sm text-gray-300 focus:outline-none appearance-none"
              >
                <option value="">Select Status</option>
                {statuses.map((s) => (
                  <option key={s.label} value={s.label}>
                    {s.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3.5 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>
        </>
      )}

      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex items-center bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3">
          <Search className="text-gray-400 w-6 h-5 mr-3" />
          <input
            type="text"
            placeholder="Enter your TX / Transaction ID"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent focus:outline-none text-sm text-gray-200"
          />
        </div>
      </div>

      {/* Filtered Orders */}
      <div className="max-w-2xl mx-auto space-y-4">
        {filtered.length > 0 ? (
          filtered.map((order) => (
            <button
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className="w-full text-left bg-gray-800/40 hover:bg-gray-800/70 border border-gray-700 rounded-xl p-4 transition-all"
            >
              <p className="font-semibold text-teal-400 break-words">
                {order.txId}
              </p>
              <p className="text-gray-300 text-sm">
                {order.fromAmount} • {order.status} •{" "}
                {order.createdAt?.toDateString()}
              </p>
            </button>
          ))
        ) : (
          <p className="text-center text-gray-400">No history results found.</p>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}

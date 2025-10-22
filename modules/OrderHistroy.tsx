"use client";

import { useState } from "react";
import { Search, Calendar, ChevronDown, Filter } from "lucide-react";
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
  const [showFilters, setShowFilters] = useState<boolean>(false);

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

  const getStatusColor = (orderStatus: string) => {
    const statusObj = statuses.find(
      (s) => s.label.toLowerCase() === orderStatus.toLowerCase()
    );
    return statusObj?.color || "bg-gray-400";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4 sm:px-6 lg:px-8 py-6 sm:py-8 mt-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            {from === "search-results" ? "Search Results" : "Order History"}
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Track and manage your transactions
          </p>
        </div>

        <div className="mb-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
            <div className="relative flex items-center bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl px-4 py-3.5 sm:py-4 shadow-xl">
              <Search className="text-gray-400 w-5 h-5 sm:w-6 sm:h-6 mr-3 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search by Transaction ID"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-sm sm:text-base text-gray-200 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {from === "order-history" && (
          <div className="mb-8">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden w-full flex items-center justify-center gap-2 bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 mb-4 hover:bg-gray-800 transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span className="text-sm font-medium">
                {showFilters ? "Hide Filters" : "Show Filters"}
              </span>
            </button>

            <div
              className={`${
                showFilters ? "block" : "hidden"
              } lg:block grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6`}
            >
              <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-teal-400" />
                  Date Range
                </h2>
                <div className="space-y-3">
                  <div className="relative">
                    <label className="text-xs text-gray-400 mb-1 block">
                      From
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-teal-500 transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <label className="text-xs text-gray-400 mb-1 block">
                      To
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-teal-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-green-400 to-teal-400"></div>
                  Status
                </h2>
                <div className="relative">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-teal-500 appearance-none cursor-pointer transition-colors"
                  >
                    <option value="">All Statuses</option>
                    {statuses.map((s) => (
                      <option key={s.label} value={s.label}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-400">
            {filtered.length} {filtered.length === 1 ? "result" : "results"}{" "}
            found
          </p>
          {(status || startDate || endDate || query) && (
            <button
              onClick={() => {
                setStatus("");
                setStartDate("");
                setEndDate("");
                setQuery("");
              }}
              className="text-sm text-teal-400 hover:text-teal-300 transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>

        <div className="space-y-3 sm:space-y-4">
          {filtered.length > 0 ? (
            filtered.map((order) => (
              <button
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className="w-full text-left bg-gray-800/40 backdrop-blur-sm hover:bg-gray-800/70 border border-gray-700/50 hover:border-gray-600 rounded-2xl p-4 sm:p-5 transition-all duration-200 hover:shadow-lg hover:shadow-teal-500/10 group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-xs font-medium text-gray-400">
                        Transaction ID
                      </p>
                      <div
                        className={`${getStatusColor(
                          order.status
                        )} w-2 h-2 rounded-full`}
                      ></div>
                    </div>
                    <p className="font-mono font-semibold text-teal-400 text-sm sm:text-base truncate group-hover:text-teal-300 transition-colors">
                      {order.txId}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-700/50 text-gray-300 font-medium">
                      {order.fromAmount}
                    </span>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full ${
                        order.status.toLowerCase() === "success"
                          ? "bg-green-500/20 text-green-400"
                          : order.status.toLowerCase() === "pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      } font-medium capitalize`}
                    >
                      {order.status}
                    </span>
                    <span className="text-gray-400 hidden sm:inline">
                      {order.createdAt?.toLocaleDateString()}
                    </span>
                    <span className="text-gray-400 sm:hidden">
                      {order.createdAt?.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800/50 mb-4">
                <Search className="w-8 h-8 text-gray-600" />
              </div>
              <p className="text-gray-400 text-base sm:text-lg font-medium mb-2">
                No orders found
              </p>
              <p className="text-gray-500 text-sm">
                Try adjusting your filters or search criteria
              </p>
            </div>
          )}
        </div>
      </div>

      {selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}

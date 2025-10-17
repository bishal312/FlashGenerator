"use client";
import { Search } from "lucide-react";
import { useState } from "react";
import OrderDetails from "./OrderDetails";

interface Order {
  id: string;
  amount: string | number;
  status: string;
  date: string;
}

export default function OrderHistory() {
  const [query, setQuery] = useState<string>("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const orders = [
    { id: "TXN-19293", amount: "$200", status: "Pending", date: "2025-10-17" },
    { id: "TXN-18274", amount: "$150", status: "Approved", date: "2025-10-16" },
  ];

  const filtered = orders.filter((o) =>
    o.id.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-6 sm:px-8 py-12">
      <h1 className="text-2xl mt-10 sm:text-3xl font-bold text-center mb-8">
        Search History Results
      </h1>
      {/*search bar*/}
      <div className="max-w-2xl mx-auto mb-10">
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
      <div className="max-w-2xl mx-auto space-y-4">
        {filtered.length > 0 ? (
          filtered.map((order) => (
            <button key={order.id}
              onClick={() => setSelectedOrder(order)} className="w-full text-left bg-gray-800/40 hover:bg-gray-800/70 border border-gray-700 rounded-xl p-4 transition-all"
            >
              <p className="font-semibold text-teal-400">{order.id}</p>
              <p className="text-gray-300 text-sm">
                {order.amount} • {order.status} • {order.date}
              </p>
            </button>
          ))
        ) : (
          <p className="text-center text-gray-400">No history results found.</p>
        )}
      </div>
      {
        selectedOrder && (
          <OrderDetails order={selectedOrder} onClose={() => setSelectedOrder(null)} />
        )
      }
    </div>
  )

}
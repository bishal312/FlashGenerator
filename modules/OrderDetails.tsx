"use client";
import { OrderSelectType } from "@/lib/db/schema";
import { X } from "lucide-react";
import Link from "next/link";

interface OrderDetailsProps {
  order: OrderSelectType;
  onClose: () => void;
}

export default function OrderDetails({ order, onClose }: OrderDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-indigo-400">Order Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-800 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="space-y-3 text-sm">
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-gray-400 text-xs uppercase tracking-wide">
                Transaction ID
              </span>
              <span className="text-white font-mono text-xs break-all bg-gray-800 p-2 rounded-lg">
                {order.txId}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-800">
              <span className="font-semibold text-gray-400">Amount</span>
              <span className="text-white font-semibold">
                {order.fromAmount}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-800">
              <span className="font-semibold text-gray-400">Status</span>
              <span className="text-white">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === "success"
                      ? "bg-green-500/20 text-green-400"
                      : order.status === "pending"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-gray-500/20 text-gray-400"
                  }`}
                >
                  {order.status}
                </span>
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-800">
              <span className="font-semibold text-gray-400">Date</span>
              <span className="text-white">
                {order.createdAt?.toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-3">
            <p className="text-gray-300 text-xs leading-relaxed">
              This transaction is verified through the FlashGen system. Please
              ensure you entered the correct TX hash.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0">
          <Link
            href={`/order-history/${order.id}`}
            className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all text-center"
          >
            View Detailed Info
          </Link>
        </div>
      </div>
    </div>
  );
}

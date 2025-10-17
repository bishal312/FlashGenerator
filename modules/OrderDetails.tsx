"use client"
import { X } from "lucide-react";

interface Order {
  id: string;
  amount: string | number;
  status: string;
  date: string
}

interface OrderDetailsProps {
  order: Order
  onClose: () => void;
}

export default function OrderDetails({ order, onClose }:OrderDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-[90%] sm:w-[50%] shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-indigo-400">Order Details</h2>
          <button onClick={onClose}>
            <X className="text-gray-400 hover:text-white transition" />
          </button>
        </div>
        <div className="space-y-3 text-gray-300 text-sm">
          <p>
            <span className="font-semibold text-white">Transaction ID:</span>{" "}
            {order.id}
          </p>
          <p>
            <span className="font-semibold text-white">Amount:</span>{" "}
            {order.amount}
          </p>
          <p>
            <span className="font-semibold text-white">Status:</span>{" "}
            {order.status}
          </p>
          <p>
            <span className="font-semibold text-white">Date:</span>{" "}
            {order.date}
          </p>
          <p className="text-gray-400 italic">
            “This transaction is verified through the FlashGen system. Please
            ensure you entered the correct TX hash.”
          </p>
        </div>
      </div>
    </div>
  )
}
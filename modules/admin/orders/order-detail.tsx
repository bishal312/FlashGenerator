"use client";

import React, { useActionState, useEffect, useState } from "react";
import { UserSelectType, OrderSelectType } from "@/lib/db/schema";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  updateOrderStatus,
  UpdateOrderStatusFormState,
} from "@/lib/actions/admin/orders/update-order-status";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type OrderSelectTypeWithUser = OrderSelectType & {
  user: UserSelectType;
};

type Props = {
  order: OrderSelectTypeWithUser;
};

const OrderDetailPage = ({ order }: Props) => {
  const currentStatus = order.status;
  const [newStatus, setNewStatus] = useState<string | null>(null);
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const initialState: UpdateOrderStatusFormState = {
    message: "",
    success: false,
    timestamp: Date.now(),
  };
  const [state, formAction, isPending] = useActionState<
    UpdateOrderStatusFormState,
    FormData
  >(updateOrderStatus, initialState);

  useEffect(() => {
    if (state.success && state.message) {
      toast.success(state.message, { position: "top-right" });
      router.refresh();
    }
    if (!state.success && state.message) {
      toast.error(state.message, { position: "top-right" });
    }
  }, [state.success, state.message, state.timestamp, router]);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/admin/orders"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-2 inline-block"
          >
            ← Back to Orders
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Order Status
            </h2>
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${getStatusColor(
                currentStatus
              )}`}
            >
              {currentStatus.toUpperCase()}
            </span>
          </div>
          <Separator />
          {currentStatus !== "success" && currentStatus !== "rejected" ? (
            <form action={formAction} className="flex flex-col gap-3">
              <h1 className="text-lg font-semibold text-gray-900">
                Set new Status
              </h1>
              <div className="flex gap-3">
                <button
                  onClick={() => setNewStatus("pending")}
                  disabled={isPending || currentStatus === "pending"}
                  className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg font-medium transition-all ${
                    currentStatus === "pending"
                      ? "bg-yellow-600 text-white cursor-not-allowed"
                      : "bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border-2 border-yellow-200"
                  }`}
                >
                  {isPending && newStatus === "pending" ? (
                    <Spinner />
                  ) : (
                    "Pending"
                  )}
                </button>
                <button
                  onClick={() => setNewStatus("rejected")}
                  disabled={isPending}
                  className="flex-1 flex items-center justify-center py-3 px-4 rounded-lg font-medium transition-all bg-red-50 text-red-700 hover:bg-red-100 border-2 border-red-200"
                >
                  {isPending && newStatus === "rejected" ? (
                    <Spinner />
                  ) : (
                    "Reject"
                  )}
                </button>
                <button
                  onClick={() => setNewStatus("accepted")}
                  disabled={isPending}
                  className="flex-1 flex items-center justify-center py-3 px-4 rounded-lg font-medium transition-all bg-green-50 text-green-700 hover:bg-green-100 border-2 border-green-200"
                >
                  {isPending && newStatus === "success" ? (
                    <Spinner />
                  ) : (
                    "Success"
                  )}
                </button>
              </div>
              {newStatus && (
                <input
                  type="hidden"
                  name="newStatus"
                  value={newStatus}
                  required
                />
              )}
              <input type="hidden" name="orderId" value={order.id} required />
            </form>
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-gray-600">
                This order has been finalized and cannot be modified.
              </p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Order Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">Order ID</p>
              <p className="font-mono text-gray-900 font-medium">{order.id}</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">Transaction ID</p>
              <p className="font-mono text-gray-900 font-medium break-all">
                {order.txId}
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">Flash USDT Amount</p>
              <p className="text-2xl font-bold text-green-600">
                ${order.toAmount}
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">Deposit Amount</p>
              <p className="text-2xl font-bold text-purple-600">
                {order.fromAmount} TRC
              </p>
            </div>
            <div className="border-l-4 border-gray-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">Created At</p>
              <p className="text-gray-900 font-medium">
                {order.createdAt?.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Customer Information
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {order.user.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-lg">
                  {order.user.name}
                </p>
                <p className="text-gray-600">Flash Coin Keeper</p>
              </div>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">Telegram Username</p>
              <p className="text-gray-900 font-medium">@{order.telegramName}</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">User ID</p>
              <p className="font-mono text-gray-900">{order.user.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;

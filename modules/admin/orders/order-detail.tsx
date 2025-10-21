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
import Image from "next/image";

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
  console.log("imageurl: ", order.paymentProofUrl);
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/admin/orders"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-2 inline-block"
          >
            ← Back to Orders
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Order Details
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
            <h2 className="text-lg font-semibold text-gray-900">
              Order Status
            </h2>
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${getStatusColor(
                currentStatus
              )} text-center`}
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
              <div className="flex flex-col sm:flex-row gap-3">
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
                  onClick={() => setNewStatus("success")}
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

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Order Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">Order ID</p>
              <p className="font-mono text-gray-900 font-medium break-all">
                {order.id}
              </p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">Transaction ID</p>
              <p className="font-mono text-gray-900 font-medium break-all">
                {order.txId}
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">Flash USDT Amount</p>
              <p className="text-xl sm:text-2xl font-bold text-green-600">
                ${order.toAmount}
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">Deposit Amount</p>
              <p className="text-xl sm:text-2xl font-bold text-purple-600">
                {order.fromAmount} TRC
              </p>
            </div>
            <div className="border-l-4 border-gray-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">Created At</p>
              <p className="text-gray-900 font-medium text-sm sm:text-base">
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

        {order.paymentProofUrl && (
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Payment Proof
            </h2>
            <div className="relative w-full aspect-[4/3] sm:aspect-video max-w-2xl mx-auto rounded-lg overflow-hidden border-2 border-gray-200">
              <Image
                loading="eager"
                src={order.paymentProofUrl}
                alt="Payment Proof"
                fill
                className="object-contain bg-gray-50"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
              />
            </div>
            <div className="mt-3 text-center">
              <Link
                href={order.paymentProofUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1"
              >
                View Full Size
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Customer Information
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                {order.user.name?.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 text-base sm:text-lg truncate">
                  {order.user.name}
                </p>
                <p className="text-gray-600 text-sm">Flash Coin Keeper</p>
              </div>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">Telegram Username</p>
              <p className="text-gray-900 font-medium break-all">
                @{order.telegramName}
              </p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm text-gray-600 mb-1">User ID</p>
              <p className="font-mono text-gray-900 break-all">
                {order.user.id}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;

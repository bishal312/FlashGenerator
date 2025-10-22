"use client";

import {
  CheckCircle,
  Clock,
  XCircle,
  Loader2,
  Copy,
  Check,
} from "lucide-react";
import { OrderSelectType, UserSelectType } from "@/lib/db/schema";
import { useState } from "react";

type Props = OrderSelectType & {
  user: UserSelectType;
};

export default function OrderStatus({ orderRecord }: { orderRecord: Props }) {
  const [copied, setCopied] = useState(false);
  const status = orderRecord.status.toLowerCase();
  const orderId = orderRecord.id;

  const steps = [
    {
      key: "submitted",
      label: "Submitted",
      icon: Clock,
      color: "text-blue-400",
    },
    {
      key: "pending",
      label: "Pending",
      icon: Loader2,
      color: "text-yellow-400",
    },
    {
      key: "success",
      label: "Success",
      icon: CheckCircle,
      color: "text-green-400",
    },
    {
      key: "rejected",
      label: "Rejected",
      icon: XCircle,
      color: "text-red-400",
    },
  ];

  const getStatusIndex = () => {
    if (status === "submitted") return 0;
    if (status === "pending") return 1;
    if (status === "success") return 2;
    if (status === "rejected") return 3;
    return 0;
  };

  const currentStepIndex = getStatusIndex();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusColor = () => {
    if (status === "success")
      return "from-green-500/20 to-emerald-500/20 border-green-500/30";
    if (status === "rejected")
      return "from-red-500/20 to-rose-500/20 border-red-500/30";
    if (status === "pending")
      return "from-yellow-500/20 to-amber-500/20 border-yellow-500/30";
    return "from-blue-500/20 to-cyan-500/20 border-blue-500/30";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 flex items-center justify-center px-4 py-8 sm:py-12 mt-16">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-3">
            Order Status
          </h1>
          <div className="inline-flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full px-4 py-2">
            <p className="text-sm sm:text-base text-gray-400">Order ID:</p>
            <p className="font-mono text-sm sm:text-base text-white font-medium">
              {orderId}
            </p>
          </div>
        </div>

        <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10">
          <div
            className={`bg-gradient-to-r ${getStatusColor()} border rounded-2xl p-4 sm:p-6 mb-8`}
          >
            <div className="flex items-center justify-center gap-3">
              {status === "success" && (
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
              )}
              {status === "pending" && (
                <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 animate-spin" />
              )}
              {status === "rejected" && (
                <XCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-400" />
              )}
              {status === "submitted" && (
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
              )}
              <div className="text-center">
                <p className="text-xl sm:text-2xl font-bold text-white capitalize">
                  {status}
                </p>
                <p className="text-xs sm:text-sm text-gray-300 mt-1">
                  {status === "success" &&
                    "Your order has been completed successfully"}
                  {status === "pending" && "Your order is being processed"}
                  {status === "rejected" && "Your order has been declined"}
                  {status === "submitted" && "Your order has been received"}
                </p>
              </div>
            </div>
          </div>

          <div className="hidden sm:block mb-10">
            <div className="relative">
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-700"></div>
              <div className="relative flex justify-between">
                {steps.map((step, i) => {
                  const Icon = step.icon;
                  const isActive = i === currentStepIndex;
                  const isPassed =
                    i < currentStepIndex && status !== "rejected";

                  return (
                    <div
                      key={step.key}
                      className="flex flex-col items-center relative"
                    >
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 z-10 ${
                          isActive
                            ? `${step.color} bg-gray-800 border-current shadow-lg shadow-current/50`
                            : isPassed
                            ? "bg-gray-700 border-gray-600 text-gray-400"
                            : "bg-gray-800 border-gray-600 text-gray-500"
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 ${
                            isActive && step.key === "pending"
                              ? "animate-spin"
                              : ""
                          }`}
                        />
                      </div>
                      <p
                        className={`text-sm mt-3 font-medium ${
                          isActive ? "text-white" : "text-gray-500"
                        }`}
                      >
                        {step.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="sm:hidden mb-8">
            <div className="flex items-center gap-2 justify-center">
              {steps.map((step, i) => {
                const isActive = i === currentStepIndex;
                return (
                  <div
                    key={step.key}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isActive ? "w-12 bg-teal-400" : "w-2 bg-gray-600"
                    }`}
                  ></div>
                );
              })}
            </div>
            <p className="text-center text-sm text-gray-400 mt-3 capitalize">
              Current Status:{" "}
              <span className="text-white font-medium">{status}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-700/30 backdrop-blur-sm border border-gray-600/50 rounded-2xl p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-1">
                    Estimated Time
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-white">
                    1 Day
                  </p>
                </div>
                <Clock className="w-8 h-8 text-teal-400/60" />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Processing time may vary
              </p>
            </div>

            <div className="bg-gray-700/30 backdrop-blur-sm border border-gray-600/50 rounded-2xl p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-1">
                    Order Amount
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-white">
                    ${orderRecord.toAmount}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Deposit</p>
                  <p className="text-sm font-semibold text-teal-400">
                    {orderRecord.fromAmount} TRX
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Flash USDT order</p>
            </div>
          </div>

          <div className="bg-gray-700/30 backdrop-blur-sm border border-gray-600/50 rounded-2xl p-5 sm:p-6 mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-teal-400 rounded-full"></div>
              Order Details
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 pb-3 border-b border-gray-600/50">
                <p className="text-sm text-gray-400">Flash Coin Keeper</p>
                <p className="text-sm sm:text-base font-medium text-white break-words">
                  {orderRecord.user.name}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 pb-3 border-b border-gray-600/50">
                <p className="text-sm text-gray-400">Deposit Amount</p>
                <p className="text-sm sm:text-base font-medium text-white">
                  {orderRecord.fromAmount} TRX
                </p>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 pb-3 border-b border-gray-600/50">
                <p className="text-sm text-gray-400">Flash USDT Amount</p>
                <p className="text-sm sm:text-base font-medium text-white">
                  ${orderRecord.toAmount}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 pb-3 border-b border-gray-600/50">
                <p className="text-sm text-gray-400">Telegram Username</p>
                <p className="text-sm sm:text-base font-medium text-teal-400">
                  @{orderRecord.telegramName}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between  gap-2 sm:gap-4 pb-3 border-b border-gray-600/50">
                <p className="text-sm text-gray-400 flex-shrink-0">
                  Transaction ID
                </p>
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <p className="text-sm sm:text-base font-mono font-medium text-white break-all">
                    {orderRecord.txId}
                  </p>
                  <button
                    onClick={() => copyToClipboard(orderRecord.txId || "")}
                    className="flex-shrink-0 p-2 hover:bg-gray-600/50 rounded-lg transition-colors"
                    title="Copy transaction ID"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                <p className="text-sm text-gray-400">Order Date</p>
                <p className="text-sm sm:text-base font-medium text-white">
                  {orderRecord.createdAt!.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <button className="relative group w-full sm:w-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 shadow-lg">
                We&apos;ll notify you when status changes
              </div>
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-400 leading-relaxed max-w-2xl mx-auto">
              {status === "pending" &&
                "Your order is under review. Please wait while our system processes it."}
              {status === "success" &&
                "Your order has been completed. Thank you for your patience!"}
              {status === "rejected" &&
                "Your order could not be processed. Please contact support if you have questions."}
              {status === "submitted" &&
                "Your order has been received and will be processed shortly."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

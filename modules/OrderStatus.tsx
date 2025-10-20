"use client";

import { useState } from "react";
import { CheckCircle, Clock, XCircle, Loader2 } from "lucide-react";

interface UserDetail {
  user: string;
  deposit: number;
  orderAmount: number;
  telegramUid: string;
  orderId: string;
  date: Date;
}

export default function OrderStatus() {
  const [status, setStatus] = useState<"submitted" | "pending" | "reject" | "success">("submitted");
  const [orderId, setOrderId] = useState("#PI4UZ3CA");

  const steps = [
    { key: "submitted", label: "Submitted", icon: Clock },
    { key: "pending", label: "Pending", icon: Loader2 },
    { key: "reject", label: "Rejected", icon: XCircle },
    { key: "success", label: "Success", icon: CheckCircle },
  ];

  const [userDetail] = useState<UserDetail>({
    user: "Mitra.exe",
    deposit: 12333,
    orderAmount: 3505040,
    telegramUid: "@Mitra.exe",
    orderId: "#PI4UZ3CA",
    date: new Date(),
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#04171a] to-[#0b1f21] text-gray-100 flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-[#0d002d] border border-gray-800 rounded-2xl shadow-2xl p-6">
        <h1 className="text-center text-lg font-semibold mb-8">
          Order Status <span className="text-white">({orderId})</span>
        </h1>

        <div className="flex items-center justify-between mb-8 relative">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isActive = step.key === status;
            const isCompleted = steps.findIndex((s) => s.key === status) > i;

            return (
              <div key={step.key} className="flex flex-col items-center relative w-1/4">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${isActive
                      ? "border-white bg-[#0d002d] text-white"
                      : isCompleted
                        ? "border-emerald-400 bg-emerald-400 text-gray-900"
                        : "border-gray-600 text-gray-600"
                    }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <p
                  className={`text-sm mt-2 ${isActive ? "text-emerald-400" : "text-gray-400"
                    }`}
                >
                  {step.label}
                </p>
                {i < steps.length - 1 && (
                  <div
                    className={`absolute top-5 left-1/2 translate-x-1/2 w-full h-[2px] -z-10 ${isCompleted ? "bg-emerald-400" : "bg-gray-700"
                      }`}
                  ></div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mb-6 bg-[#153739] rounded-lg p-4">
          <p className="text-gray-400 text-sm">Estimated Time</p>
          <p className="text-lg font-medium text-gray-100">1 Day</p>
        </div>

        <div className="bg-[#153739] rounded-lg p-4 space-y-2">
          <p className="text-gray-400 text-sm font-medium">Order Details</p>
          <div className="text-sm leading-relaxed text-gray-200 space-y-1">
            <p>
              Flash coin keeper: <span className="text-gray-300">{userDetail.user}</span>
            </p>
            <p>
              Your deposit amount: <span className="text-gray-300">{userDetail.deposit} TRX</span>
            </p>
            <p>
              Flash USDT order amount: <span className="text-gray-300">${userDetail.orderAmount}</span>
            </p>
            <p>
              Your telegram username: <span className="text-gray-300">{userDetail.telegramUid}</span>
            </p>
            <p>
              Transaction or order id: <span className="text-gray-300">{userDetail.orderId}</span>
            </p>
            <p>
              Date:{" "}
              <span className="text-gray-300">
                {userDetail.date.toLocaleDateString()}
              </span>
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-6 rounded-lg transition-all">
            We’ll alert you when status changes
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          Your order is under review. Please wait while our system processes it.
        </p>
      </div>
    </div>
  );
}

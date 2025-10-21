"use client";
import React from "react";
import {
  Clock,
  DollarSign,
  Info,
  MonitorSmartphone,
  Zap,
  HelpCircle,
  ArrowRight,
  History,
  Send,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { OrderSelectType, UserSelectType } from "@/lib/db/schema";
import { cn } from "@/lib/utils";

type Props = {
  userRecord: UserSelectType;
  total: {
    pendingAmount: number;
    approvedAmount: number;
  };
  latestOrder: OrderSelectType | null;
};

const getTimeAgo = (date: Date | string) => {
  const diffMs = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diffMs / 60000);

  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} minute${mins > 1 ? "s" : ""} ago`;

  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
};

const DashboardView = ({ userRecord, total, latestOrder }: Props) => {
  return (
    <div className="min-h-screen text-sm sm:text-base w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100 px-6 sm:px-8 md:px-10 lg:px-20 py-10 md:py-16 overflow-x-hidden">
      <div className="mx-2 md:mx-30 lg:mx-60">
        {/* Greeting */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-transparent mb-2">
            Welcome back, {userRecord.name}
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Your last activity was updated{" "}
            <span className="text-indigo-400">
              {getTimeAgo(userRecord.updatedAt)}
            </span>
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {[
            {
              title: "Approved Amount",
              value: total.approvedAmount,
              icon: <DollarSign className="w-5 h-5" />,
            },
            {
              title: "Pending Amount",
              value: total.pendingAmount,
              icon: <Clock className="w-5 h-5" />,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-gray-800/60 to-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700 hover:border-gray-500 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-gray-700/30 flex items-center justify-center text-indigo-400">
                  {item.icon}
                </div>
                <p className="text-gray-200 font-medium">{item.title}</p>
              </div>
              <p className="text-3xl font-bold text-white">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Order History */}
        <Link
          href="/order-history"
          className="w-full bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-5 border border-gray-700 hover:border-indigo-500/60 transition-all flex items-center justify-between group mb-10"
        >
          <div className="flex items-center gap-3">
            <History className="w-6 h-6 text-gray-300" />
            <span className="font-medium text-gray-200">
              View Order History
            </span>
          </div>
          <ArrowRight className="w-5 h-5 text-indigo-400 group-hover:translate-x-1 transition-transform" />
        </Link>

        {/* latest order */}
        {latestOrder && (
          <div className="flex flex-col gap-5 py-5">
            <div className="flex justify-between">
              <h1 className="text-xl font-semibold">Your Order Details</h1>
              <Link
                href="/order-history/search-results"
                className="underline hover:no-underline hover:text-indigo-400 transition-colors duration-200 font-semibold"
              >
                See all
              </Link>
            </div>

            <Link
              href={`/order-history/${latestOrder.id}`}
              className="bg-gray-700/30 flex flex-col gap-4 py-4 px-5 rounded-lg"
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-3">
                  <p className="flex items-center gap-2 font-semibold">
                    {latestOrder.status === "pending" && (
                      <>
                        <Loader2 className="text-yellow-500 animate-spin" />
                      </>
                    )}

                    {latestOrder.status === "submitted" && (
                      <>
                        <Send className="text-blue-500" />
                      </>
                    )}

                    {latestOrder.status === "success" && (
                      <>
                        <CheckCircle2 className="text-green-500" />
                      </>
                    )}

                    {latestOrder.status === "rejected" && (
                      <>
                        <XCircle className="text-red-500" />
                      </>
                    )}
                  </p>

                  <p className="font-semibold">Order ID: {latestOrder.id}</p>
                </div>
                <p
                  className={cn(
                    "font-semibold capitalize",
                    latestOrder.status === "pending"
                      ? "text-yellow-500"
                      : latestOrder.status === "success"
                      ? "text-green-500"
                      : latestOrder.status === "rejected"
                      ? "text-red-500"
                      : "text-gray-100"
                  )}
                >
                  {latestOrder.status}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="font-semibold">FLASH USDT: $142001</p>
                <p className="text-gray-400">Date: 10/19/2025</p>
              </div>
            </Link>
          </div>
        )}

        {/* Order Details */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">
              More about FlashGen
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                color: "purple",
                href: "/how-it-works",
                label: "How FlashGen Works",
                icon: <Zap className="w-5 h-5 text-purple-400" />,
              },
              {
                color: "blue",
                href: "/flash-supported-platform",
                label: "Supported Platforms",
                icon: <MonitorSmartphone className="w-5 h-5 text-blue-400" />,
              },
              {
                color: "red",
                href: "/warning",
                label: "Important Notice",
                icon: <Info className="w-5 h-5 text-red-400" />,
              },
              {
                color: "gray",
                href: "/faq",
                label: "Frequently Asked Questions",
                icon: <HelpCircle className="w-5 h-5 text-gray-300" />,
              },
            ].map((item, idx) => (
              <Link
                href={item.href}
                key={idx}
                className={`w-full bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-5 border border-gray-700 hover:border-indigo-500/60 transition-all flex items-center justify-between group`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 bg-${item.color}-500/20 rounded-full flex items-center justify-center`}
                  >
                    {item.icon}
                  </div>
                  <span className="font-medium text-gray-200">
                    {item.label}
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-400 transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        {/* Start New Order */}
        <Link
          href="/new-order"
          className="w-full bg-gradient-to-br from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-700 py-4 px-6 rounded-2xl text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 flex items-center justify-center gap-2 transition-all group"
        >
          <span>Start a New Order</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default DashboardView;

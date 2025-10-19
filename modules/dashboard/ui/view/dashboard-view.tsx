"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Clock,
  DollarSign,
  Info,
  MonitorSmartphone,
  Zap,
  HelpCircle,
  ArrowRight,
  History,
} from "lucide-react";

const DashboardView = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen text-sm sm:text-base w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100 px-6 sm:px-8 md:px-10 lg:px-20 py-10 md:py-16 overflow-x-hidden">
      <div className="mx-2 md:mx-30 lg:mx-60">
        {/* Greeting */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-transparent mb-2">
            Welcome back, Mitra.exe
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Your last activity was updated <span className="text-indigo-400">5 minutes ago</span>
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {[
            { title: "Approved Amount", value: "$0", icon: <DollarSign className="w-5 h-5" /> },
            { title: "Pending Amount", value: "$0", icon: <Clock className="w-5 h-5" /> },
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
        <button onClick={() => router.push("/order-history")} className="w-full bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-5 border border-gray-700 hover:border-indigo-500/60 transition-all flex items-center justify-between group mb-10">
          <div className="flex items-center gap-3">
            <History className="w-6 h-6 text-gray-300" />
            <span className="font-medium text-gray-200">View Order History</span>
          </div>
          <ArrowRight className="w-5 h-5 text-indigo-400 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Order Details */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">More about FlashGen</h2>
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
                href: "/supported-platform",
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
              <button
                onClick={() => router.push(item.href)}
                key={idx}
                className={`w-full bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-5 border border-gray-700 hover:border-indigo-500/60 transition-all flex items-center justify-between group`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 bg-${item.color}-500/20 rounded-full flex items-center justify-center`}
                  >
                    {item.icon}
                  </div>
                  <span className="font-medium text-gray-200">{item.label}</span>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-400 transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* Start New Order */}
        <button className="w-full bg-gradient-to-br from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-700 py-4 px-6 rounded-2xl text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 flex items-center justify-center gap-2 transition-all group">
          <span>Start a New Order</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default DashboardView;

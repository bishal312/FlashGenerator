"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function NewOrder() {
  const [selectedCoin, setSelectedCoin] = useState("");
  const router = useRouter();

  const handleContinue = () => {
    if (!selectedCoin) {
      alert("Please Select Coin before continuing.");
      return;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1a18] to-[#000] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#0e2321]/50 rounded-2xl p-8 border border-gray-700 shadow-lg">
        <h1 className="text-center text-2xl font-semibold text-white mb-6">
          New Order
        </h1>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Select Coin
          </label>
          <div
            className={`flex items-center justify-between bg-gray-900 hover:bg-gray-800 rounded-xl p-3 cursor-pointer border transition-all duration-200 ${
              selectedCoin === "USDT"
                ? "border-indigo-500 ring-2 ring-indigo-500/40"
                : "border-gray-700"
            }`}
            onClick={() => {
              setSelectedCoin((prev) => (prev === "USDT" ? "" : "USDT"));
            }}
          >
            <div className="flex items-center space-x-3">
              <Image
                src="/images/usdt2.svg"
                alt="USDT"
                width={30}
                height={30}
                className="rounded-full"
              />
              <span className="text-white font-medium">USDT</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            handleContinue();
            if (selectedCoin) router.push("/new-order/choose-network");
          }}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

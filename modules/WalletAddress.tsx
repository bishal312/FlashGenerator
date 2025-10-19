"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WalletAddress() {
  const [walletAddress, setWalletAddress] = useState("");
  const [telegram, setTelegram] = useState("");
  const router = useRouter();

  const handleContinue = () => {
    if (!walletAddress || !telegram) {
      alert("Please fill all fields before continuing.");
      return;
    }
    router.push("/new-order/select-amount");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1a18] to-[#000] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#0e2321]/50 rounded-2xl p-8 border border-gray-700 shadow-lg">
        <h1 className="text-center text-2xl font-semibold text-white mb-6">
          Add Your Wallet Address
        </h1>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Wallet Address
          </label>
          <input
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            placeholder="Enter your USDT wallet address"
            className="w-full bg-gray-900 text-gray-200 placeholder-gray-500 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Telegram Username
          </label>
          <input
            type="text"
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
            placeholder="@yourusername"
            className="w-full bg-gray-900 text-gray-200 placeholder-gray-500 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>

        <button
          onClick={handleContinue}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";

export default function SelectAmount() {
  const [amount, setAmount] = useState("");
  const [converted, setConverted] = useState(0);
  const [minmumAmt, setMinimumAmt] = useState(122500)
  const router = useRouter();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    setConverted(Number(value) * 290);
  };
  const handleContinue = () => {
    if (converted <= minmumAmt) {
      alert("you need at least minmum amount.");
      return;
    }
    router.push("/new-order/payment");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1a18] to-black flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-center text-2xl font-semibold text-white">
          Select Amount
        </h1>

        <div className="bg-[#0e2321]/70 border border-gray-700 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src="/images/usdt2.svg"
              alt="USDT"
              width={36}
              height={36}
              className="rounded-full"
            />
            <div>
              <p className="text-white font-medium">Flash USDT</p>
              <p className="text-xs text-gray-400">TRC20</p>
            </div>
          </div>
          <button className="bg-green-600 text-white text-sm px-4 py-1.5 rounded-lg font-semibold hover:bg-green-500 transition">
            Buy
          </button>
        </div>

        <div className="flex justify-center">
          <ArrowUpDown className="text-indigo-500 w-6 h-6" />
        </div>

        <div className="bg-[#0e2321]/70 border border-gray-700 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src="/icons/trx.svg"
              alt="TRX"
              width={36}
              height={36}
              className="rounded-full"
            />
            <div>
              <p className="text-white font-medium">TRX</p>
              <p className="text-xs text-gray-400">Tron (TRC20)</p>
            </div>
          </div>
          <button className="bg-red-600 text-white text-sm px-4 py-1.5 rounded-lg font-semibold hover:bg-red-500 transition">
            Sell
          </button>
        </div>

        <div className="bg-[#0e2321]/70 border border-gray-700 rounded-2xl p-5">
          <h2 className="text-white font-medium mb-3">Enter TRX Amount</h2>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount (TRX)"
            className="w-full bg-gray-900 text-gray-200 placeholder-gray-500 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          <div className="mt-3 text-sm text-gray-400 space-y-1">
            <p>
              Converted to Flash USDT:{" "}
              <span className="text-white">${converted.toFixed(2)}</span>
            </p>
            <p>
              Minimum required Flash:{" "}
              <span className="text-indigo-400">$122,500</span>
            </p>
          </div>
        </div>

        <div className="bg-[#0e2321]/70 border border-gray-700 rounded-2xl p-5">
          <h2 className="text-white font-medium mb-3">Transaction Details</h2>
          <div className="flex justify-between text-sm text-gray-300">
            <p>Service Fee:</p>
            <span>2%</span>
          </div>
          <div className="flex justify-between text-sm text-gray-300">
            <p>Processing Time:</p>
            <span>20 minutes</span>
          </div>
        </div>

        <button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

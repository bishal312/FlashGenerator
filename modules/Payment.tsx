"use client";

import { Copy, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Payment() {
  const depositAddress = "TEVHMmSTFqSxBegY8VvF8dW5n7ADMzQYgv";
  const depositAmount = "12333 TRX";
  const router = useRouter();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(depositAddress);
    alert("Address copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1a18] to-[#000] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#0e2321]/60 border border-gray-700 rounded-2xl p-8 shadow-lg text-center space-y-6">
        <h1 className="text-2xl font-semibold text-white">Payment</h1>

        <div className="bg-[#111e1c] rounded-2xl p-5 flex flex-col items-center justify-center">
          <Image
            src="/images/qr.svg"
            alt="TRX QR"
            width={150}
            height={150}
            className="rounded-xl mb-3"
          />
        </div>

        <div className="text-left">
          <label className="block text-sm text-gray-400 mb-1">Network</label>
          <div className="flex items-center justify-between bg-gray-900 border border-gray-700 rounded-xl px-4 py-3">
            <span className="text-gray-200 text-sm">Tron (TRC20)</span>
            <Star className="text-yellow-400 w-5 h-5" />
          </div>
        </div>

        <div className="text-left">
          <label className="block text-sm text-gray-400 mb-1">Deposit Address</label>
          <div className="flex items-center justify-between bg-gray-900 border border-gray-700 rounded-xl px-4 py-3">
            <span className="text-gray-200 text-xs truncate">{depositAddress}</span>
            <Copy
              onClick={copyToClipboard}
              className="text-gray-400 hover:text-white cursor-pointer w-5 h-5 transition-colors"
            />
          </div>
          <p className="text-xs text-red-400 mt-2">
            Your deposit amount: {depositAmount}
          </p>
        </div>

        <button onClick={() => router.push("/new-order/deposit")} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all">
          Deposit Now
        </button>
      </div>
    </div>
  );
}

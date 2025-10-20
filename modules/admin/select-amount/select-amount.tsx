"use client";

import { selectAmount, SelectAmountFormState } from "@/lib/actions/selec-amount/select-amount";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  userId: string;
  orderId: string;
};

const SelectAmount = ({ userId, orderId }: Props) => {
  const [trxAmount, setTrxAmount] = useState<number>(0);
  const [flashUSDT, setFlashUSDT] = useState<number>(0);
  const conversionRate = 0.1;

  useEffect(() => {
    setFlashUSDT(Number(trxAmount) * conversionRate);
  }, [trxAmount]);

  const initialState: SelectAmountFormState = {
    errors: {},
    message: "",
    success: false,
    timestamp: Date.now(),
  };

  const [state, formAction, isPending] = useActionState<
    SelectAmountFormState,
    FormData
  >(selectAmount, initialState);

  useEffect(() => {
    if (!state.success && state.message) {
      toast.message(state.message, { position: "top-center" });
    }
  }, [state.success, state.message, state.timestamp]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#061b19] to-black flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <h2 className="text-center text-gray-100 text-lg font-semibold">
          Select Amount
        </h2>

        <div className="bg-[#121212] border border-gray-800 rounded-xl p-4 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <p className="text-gray-400 text-sm">To</p>
              <h1 className="text-gray-100 font-semibold text-base">TRC20</h1>
            </div>
            <span className="bg-green-600 text-white text-sm px-3 py-1 rounded">
              Buy
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8">
                <Image src="/images/usdt2.svg" alt="USDT" fill />
              </div>
              <p className="text-gray-100 font-semibold">Flash USDT</p>
            </div>
            <p className="text-gray-100 font-bold text-lg">
              {flashUSDT.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <ArrowUpDown className="text-indigo-500 w-6 h-6" />
        </div>

        <div className="bg-[#121212] border border-gray-800 rounded-xl p-4 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <p className="text-gray-400 text-sm">From</p>
              <h1 className="text-gray-100 font-semibold text-base">
                Tron (TRC20)
              </h1>
            </div>
            <span className="bg-red-600 text-white text-sm px-3 py-1 rounded">
              Sell
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8">
                <Image src="/icons/trx.svg" alt="TRX" fill />
              </div>
              <p className="text-gray-100 font-semibold">TRX</p>
            </div>
            <p className="text-gray-100 font-bold text-lg">{trxAmount}</p>
          </div>
        </div>

        <form
          action={formAction}
          className="bg-[#121212] border border-gray-800 rounded-xl p-4 flex flex-col gap-3"
        >
          <p className="text-gray-300 font-semibold">Enter TRX Amount</p>
          <input
            type="number"
            placeholder="Enter amount (TRX)"
            className="bg-black text-gray-100 p-3 rounded-md outline-none border border-gray-700 focus:ring-1 focus:ring-indigo-500 transition"
            value={trxAmount || ""}
            onChange={(e) => setTrxAmount(Number(e.target.value))}
            name="fromAmount"
            required
          />
          <input type="hidden" name="userId" value={userId} required />
          <input type="hidden" name="orderId" value={orderId} required />
          <input type="hidden" name="toAmount" value={flashUSDT} required />
          <input type="hidden" name="conversionRate" value={conversionRate} required />

          <div className="text-sm text-gray-400 flex flex-col gap-1">
            <p>
              Converted to Flash USDT:{" "}
              <span className="text-gray-100 font-medium">
                ${flashUSDT.toFixed(2)}
              </span>
            </p>
            <p>
              Minimum required Flash:{" "}
              <span className="text-gray-100 font-medium">$122500</span>
            </p>
          </div>

          <button
            type="submit"
            disabled={flashUSDT < 122500 || isPending}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg text-lg font-medium transition disabled:opacity-50 mt-2"
          >
            Continue
          </button>
        </form>

        <div className="bg-[#121212] border border-gray-800 rounded-xl p-4 text-gray-300 text-sm space-y-1">
          <p className="font-semibold">Transaction Details</p>
          <div className="flex justify-between">
            <span>Service Fee:</span>
            <span className="text-gray-100 font-medium">2%</span>
          </div>
          <div className="flex justify-between">
            <span>Processing Time:</span>
            <span className="text-gray-100 font-medium">20 minutes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectAmount;

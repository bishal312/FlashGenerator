"use client";

import { Spinner } from "@/components/ui/spinner";
import {
  selectAmount,
  SelectAmountFormState,
} from "@/lib/actions/select-amount/select-amount";
import { ArrowUpDown, AlertCircle, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  userId: string;
  orderId: string;
  conversionRate: number;
};

const SelectAmount = ({ userId, orderId, conversionRate }: Props) => {
  const MIN_TRX = 500;
  const MIN_FLASH_USDT = 5000;
  const SERVICE_FEE_PERCENT = 2;

  const [trxAmount, setTrxAmount] = useState<number>(0);
  const [flashUSDT, setFlashUSDT] = useState<number>(0);

  useEffect(() => {
    setFlashUSDT(Number(trxAmount) / conversionRate);
  }, [trxAmount, conversionRate]);

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

  const isTrxValid = trxAmount >= MIN_TRX;
  const isFlashValid = flashUSDT >= MIN_FLASH_USDT;
  const canProceed = isTrxValid && isFlashValid && !isPending;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#061b19] via-[#0a1f1d] to-black flex flex-col items-center justify-center px-4 py-8 sm:py-12 mt-16">
      <div className="w-full max-w-lg space-y-5 sm:space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-gray-100 text-2xl sm:text-3xl font-bold tracking-tight">
            Select Amount
          </h2>
          <p className="text-gray-400 text-sm">
            Exchange TRX for Flash USDT instantly
          </p>
        </div>
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-gray-700 rounded-2xl p-5 sm:p-6 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2 sm:gap-3 items-center">
              <span className="text-gray-400 text-xs sm:text-sm font-medium">
                To
              </span>
              <h1 className="text-gray-100 font-semibold text-sm sm:text-base">
                TRC20
              </h1>
            </div>
            <span className="bg-gradient-to-r from-green-600 to-green-500 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-full font-medium shadow-lg shadow-green-600/20">
              Buy
            </span>
          </div>
          <div className="flex justify-between items-center bg-black/40 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-green-500/10 p-2">
                <Image src="/images/usdt2.svg" alt="USDT" fill />
              </div>
              <div>
                <p className="text-gray-400 text-xs">You receive</p>
                <p className="text-gray-100 font-semibold text-sm sm:text-base">
                  Flash USDT
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-100 font-bold text-xl sm:text-2xl">
                {flashUSDT.toFixed(2)}
              </p>
              <p className="text-gray-500 text-xs">≈ ${flashUSDT.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center -my-2">
          <div className="bg-indigo-600 rounded-full p-3 shadow-lg shadow-indigo-600/30">
            <ArrowUpDown className="text-white w-5 h-5" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-gray-700 rounded-2xl p-5 sm:p-6 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2 sm:gap-3 items-center">
              <span className="text-gray-400 text-xs sm:text-sm font-medium">
                From
              </span>
              <h1 className="text-gray-100 font-semibold text-sm sm:text-base">
                Tron (TRC20)
              </h1>
            </div>
            <span className="bg-gradient-to-r from-red-600 to-red-500 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-full font-medium shadow-lg shadow-red-600/20">
              Sell
            </span>
          </div>
          <div className="flex justify-between items-center bg-black/40 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-red-500/10 p-2">
                <Image src="/icons/trx.svg" alt="TRX" fill />
              </div>
              <div>
                <p className="text-gray-400 text-xs">You pay</p>
                <p className="text-gray-100 font-semibold text-sm sm:text-base">
                  TRX
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-100 font-bold text-xl sm:text-2xl">
                {trxAmount || "0"}
              </p>
              <p className="text-gray-500 text-xs">
                Rate: 1 TRX = ${(1 / conversionRate).toFixed(4)}
              </p>
            </div>
          </div>
        </div>

        <form
          action={formAction}
          className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-gray-700 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4"
        >
          <div>
            <label className="text-gray-300 font-semibold text-sm sm:text-base mb-2 block">
              Enter TRX Amount
            </label>
            <div className="relative">
              <input
                type="number"
                placeholder="Enter amount (TRX)"
                className="w-full bg-black/60 text-gray-100 text-lg p-4 rounded-xl outline-none border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                value={trxAmount || ""}
                onChange={(e) => setTrxAmount(Number(e.target.value))}
                name="fromAmount"
                required
                min={MIN_TRX}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                TRX
              </span>
            </div>
          </div>

          <input type="hidden" name="userId" value={userId} required />
          <input type="hidden" name="orderId" value={orderId} required />
          <input type="hidden" name="toAmount" value={flashUSDT} required />
          <input
            type="hidden"
            name="conversionRate"
            value={conversionRate}
            required
          />

          {/* Requirements Status */}
          <div className="bg-black/40 rounded-xl p-4 space-y-2">
            <p className="text-gray-300 font-semibold text-sm mb-3">
              Requirements
            </p>
            <div className="flex items-center gap-2 text-sm">
              {isTrxValid ? (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-500" />
              )}
              <span className={isTrxValid ? "text-green-400" : "text-gray-400"}>
                Minimum TRX: {MIN_TRX} TRX
              </span>
              {trxAmount > 0 && !isTrxValid && (
                <span className="text-amber-500 text-xs ml-auto">
                  Need {(MIN_TRX - trxAmount).toFixed(2)} more
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm">
              {isFlashValid ? (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-500" />
              )}
              <span
                className={isFlashValid ? "text-green-400" : "text-gray-400"}
              >
                Minimum Flash USDT: ${MIN_FLASH_USDT}
              </span>
              {flashUSDT > 0 && !isFlashValid && (
                <span className="text-amber-500 text-xs ml-auto">
                  Need ${(MIN_FLASH_USDT - flashUSDT).toFixed(2)} more
                </span>
              )}
            </div>
          </div>

          {/* Conversion Display */}
          <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-xl p-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">You will receive</span>
              <span className="text-indigo-300 font-bold text-lg">
                ${flashUSDT.toFixed(2)} Flash USDT
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={!canProceed}
            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white py-4 rounded-xl text-base sm:text-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 flex justify-center items-center gap-2"
          >
            {isPending ? (
              <>
                <Spinner />
                <span>Processing...</span>
              </>
            ) : (
              "Continue to Payment"
            )}
          </button>

          {!canProceed && trxAmount > 0 && (
            <p className="text-amber-500 text-xs text-center">
              Please meet the minimum requirements to continue
            </p>
          )}
        </form>

        {/* Transaction Details */}
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-gray-700 rounded-2xl p-5 sm:p-6 shadow-xl">
          <p className="font-semibold text-gray-100 mb-4 text-sm sm:text-base">
            Transaction Details
          </p>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-gray-800">
              <span className="text-gray-400">Service Fee</span>
              <span className="text-gray-100 font-semibold">
                {SERVICE_FEE_PERCENT}%
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-800">
              <span className="text-gray-400">Processing Time</span>
              <span className="text-gray-100 font-semibold">~20 minutes</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-400">Network</span>
              <span className="text-gray-100 font-semibold">TRC20</span>
            </div>
          </div>
        </div>

        {/* Info Note */}
        <div className="bg-blue-950/20 border border-blue-500/20 rounded-xl p-4 flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
            Please ensure you have sufficient TRX balance in your wallet before
            proceeding. The transaction will be processed within 20 minutes
            after confirmation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelectAmount;

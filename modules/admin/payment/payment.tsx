"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { payment, PaymentFormState } from "@/lib/actions/payment/payment";
import Image from "next/image";
import React, { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Copy, CheckCircle2 } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  userId: string;
  orderId: string;
  network: string;
  depositAddress: string;
  depositQrCodeUrl: string;
  depositedAmount: number;
};

const Payment = ({
  userId,
  depositQrCodeUrl,
  orderId,
  network,
  depositAddress,
  depositedAmount,
}: Props) => {
  const [state, formAction, isPending] = useActionState<
    PaymentFormState,
    FormData
  >(payment, { message: "", success: false, timestamp: Date.now() });

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!state.success && state.message) {
      toast.error(state.message, { position: "top-center" });
    }
  }, [state.success, state.message, state.timestamp]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(depositAddress);
      setCopied(true);
      toast.success("Deposit address copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy address.");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#061b19] to-black px-4 mt-16">
      <div className="bg-[#111111] border border-gray-800 py-8 px-6 max-w-2xl rounded-2xl flex flex-col items-center gap-6 w-full shadow-lg shadow-black/40">
        <h1 className="text-2xl font-bold text-gray-100 tracking-wide">
          Payment
        </h1>

        <div className="w-44 h-44 relative border border-gray-700 rounded-lg overflow-hidden">
          <Image
            loading="lazy"
            unoptimized
            src={depositQrCodeUrl || "/images/qr.jpeg"}
            alt="qrcode"
            fill
            className="object-cover"
          />
        </div>

        <div className="w-full">
          <form action={formAction} className="flex flex-col gap-4">
            <Field>
              <FieldLabel className="text-gray-300">Network</FieldLabel>
              <Input
                type="text"
                value={network}
                disabled
                className="bg-black border-gray-700 text-gray-100"
              />
            </Field>

            <Field>
              <FieldLabel className="text-gray-300">Deposit Address</FieldLabel>
              <div className="flex items-center justify-between bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 gap-2">
                <span className="text-gray-200 text-xs truncate">
                  {depositAddress}
                </span>
                {copied ? (
                  <CheckCircle2 className="text-green-500 w-5 h-5" />
                ) : (
                  <Copy
                    onClick={handleCopy}
                    className="text-gray-400 hover:text-white cursor-pointer w-5 h-5 transition-colors"
                  />
                )}
              </div>
            </Field>

            {/* Hidden Inputs */}
            <input type="hidden" name="userId" value={userId} required />
            <input type="hidden" name="orderId" value={orderId} required />
            <input type="hidden" name="network" value={network} required />
            <input
              type="hidden"
              name="depositAddress"
              value={depositAddress}
              required
            />
            <input
              type="hidden"
              name="depositQrCodeUrl"
              value={depositQrCodeUrl}
              required
            />

            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg text-lg font-medium transition disabled:opacity-50"
            >
              {isPending ? <Spinner /> : "Continue"}
            </Button>
          </form>
        </div>

        {/* Deposited Amount */}
        <p className="text-gray-300 font-medium">
          Your deposited amount:{" "}
          <span className="text-gray-100 font-semibold">
            {depositedAmount} TRC
          </span>
        </p>
      </div>
    </div>
  );
};

export default Payment;

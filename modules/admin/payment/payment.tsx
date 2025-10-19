"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { payment, PaymentFormState } from "@/lib/actions/payment/payment";
import Image from "next/image";
import React, { useActionState, useEffect } from "react";
import { toast } from "sonner";

type Props = {
  userId: string;
  orderId: string;
  network: string;
  depositAddress: string;
  depositQrCodeUrl: string;
  depositedAmount: string;
};

const Payment = ({
  userId,
  depositQrCodeUrl,
  orderId,
  network,
  depositAddress,
  depositedAmount,
}: Props) => {
  const initialState: PaymentFormState = {
    message: "",
    success: false,
    timestamp: Date.now(),
  };
  const [state, formAction, isPending] = useActionState<
    PaymentFormState,
    FormData
  >(payment, initialState);

  useEffect(() => {
    if (!state.success && state.message) {
      toast.message(state.message, { position: "top-center" });
    }
  }, [state.success, state.message, state.timestamp]);
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <div className="bg-slate-50  py-5 px-6 max-w-2xl rounded-xl flex flex-col items-center gap-5 w-full">
        <h1 className="text-2xl font-bold">Payment</h1>
        <div className="w-40 h-40 relative">
          <Image
            src={depositQrCodeUrl || "/images/qr.jpeg"}
            alt="qrcode"
            fill
          />
        </div>
        <div className="w-full">
          <form action={formAction} className="flex flex-col gap-3">
            <h1>Network</h1>
            <Input type="text" value={network} disabled />
            <Input type="text" value={depositAddress} disabled />
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
            <Button type="submit" disabled={isPending}>
              Continue
            </Button>
          </form>
        </div>
        <p>Your deposited amount: {depositedAmount} TRC</p>
      </div>
    </div>
  );
};

export default Payment;

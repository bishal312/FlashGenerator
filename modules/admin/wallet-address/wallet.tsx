"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { wallet, WalletFormState } from "@/lib/actions/wallet/wallet";
import React, { useActionState, useEffect } from "react";
import { toast } from "sonner";

type Props = {
  userId: string;
  username: string;
  orderId: string;
};

const Wallet = ({ userId, orderId, username }: Props) => {
  const initialState: WalletFormState = {
    errors: {},
    message: "",
    success: false,
    timestamp: Date.now(),
  };
  const [state, formAction, isPending] = useActionState<
    WalletFormState,
    FormData
  >(wallet, initialState);

  useEffect(() => {
    if (!state.success && state.message) {
      toast.message(state.message, { position: "top-center" });
    }
  }, [state.success, state.message, state.timestamp]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1a18] to-[#000] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#0e2321]/50 rounded-2xl px-8 pt-7 pb-5 border border-gray-700 shadow-lg">
        <h1 className="text-center text-2xl font-semibold text-white mb-6">
          Add Your Wallet Address
        </h1>
        <form
          action={formAction}
          className="mb-5"
        >
          <Field>
            <FieldLabel htmlFor="wallet-address" className="block text-sm font-medium text-gray-400">Wallet Address</FieldLabel>
            <input type="text" id="wallet-address" name="walletAddress" placeholder="Enter your wallet Address" className="w-full bg-gray-900 text-gray-200 placeholder-gray-500 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
            {state.errors?.properties?.walletAddress && (
              <FieldError>{state.errors.properties.walletAddress[0]}</FieldError>
            )}
          </Field>
          <Field>
            <FieldLabel className="block text-sm font-medium text-gray-400 mt-4">Telegram username</FieldLabel>
            <Input disabled value={username} name="username" className="text-white" />
          </Field>
          <input type="hidden" name="userId" value={userId} />
          <input type="hidden" name="orderId" value={orderId} />
          <input type="hidden" name="username" value={username} />
          <Button type="submit" disabled={isPending} className="mt-5 w-full bg-indigo-600 hover:bg-indigo-700">
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Wallet;

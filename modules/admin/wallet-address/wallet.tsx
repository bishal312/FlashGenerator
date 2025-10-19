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
    <div className="min-h-screen flex flex-col justify-center">
      <form
        action={formAction}
        className="max-w-xl shadow-2xl mx-auto flex flex-col gap-3  w-full py-5 px-3 rounded-lg"
      >
        <Field>
          <FieldLabel htmlFor="wallet-address">Wallet Address</FieldLabel>
          <Input type="text" id="wallet-address" name="walletAddress" />
          {state.errors?.properties?.walletAddress && (
            <FieldError>{state.errors.properties.walletAddress[0]}</FieldError>
          )}
        </Field>
        <Field>
          <FieldLabel>Telegram username</FieldLabel>
          <Input disabled value={username} name="username" />
        </Field>
        <input type="hidden" name="userId" value={userId} />
        <input type="hidden" name="orderId" value={orderId} />
        <input type="hidden" name="username" value={username} />
        <Button type="submit" disabled={isPending}>
          Continue
        </Button>
      </form>
    </div>
  );
};

export default Wallet;

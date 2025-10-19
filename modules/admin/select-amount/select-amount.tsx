"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  selectAmount,
  SelectAmountFormState,
} from "@/lib/actions/selec-amount/select-amount";
import Image from "next/image";
import React, { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  userId: string;
  orderId: string;
};

const SelectAmount = ({ userId, orderId }: Props) => {
  const [trcValue, setTrcValue] = useState("");
  const [flashUSDT, setFlashUSDT] = useState<number>(0);
  const conversionRate = 0.1;
  useEffect(() => {
    setFlashUSDT(Number(trcValue) / conversionRate);
  }, [trcValue]);
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
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="shadow-xl bg-slate-50 py-7 px-5 rounded-lg max-w-5xl w-full">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3 bg-violet-900 py-4 px-5 rounded-lg">
            <div className="flex w-full justify-between items-center">
              <div className="flex gap-4 items-center">
                <p className="text-gray-50">To</p>
                <h1 className="text-gray-100 font-bold text-lg">TRC20</h1>
              </div>
              <p className="bg-green-700 text-white font-medium px-5 py-1 rounded-sm">
                Buy
              </p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <div className="relative h-10 w-10">
                  <Image fill src="/images/icon2.svg" alt="logo" />
                </div>
                <h1 className="text-xl font-bold text-gray-100/80">
                  Flash USDT
                </h1>
              </div>
              <p className="text-lg font-bold text-white">{flashUSDT}</p>
            </div>
          </div>
          <Separator />
          <div className="flex flex-col gap-3 bg-violet-900 py-4 px-5 rounded-lg">
            <div className="flex w-full justify-between items-center">
              <div className="flex gap-4 items-center">
                <p className="text-gray-50">From</p>
                <h1 className="text-gray-100 font-bold text-lg">
                  Tron (TRC20)
                </h1>
              </div>
              <p className="bg-red-700 text-white font-medium px-5 py-1 rounded-sm">
                Sell
              </p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <div className="relative h-10 w-10">
                  <Image fill src="/images/icon2.svg" alt="logo" />
                </div>
                <h1 className="text-xl font-bold text-gray-100/80">TRX</h1>
              </div>
              <p className="text-lg font-bold text-white">{trcValue}</p>
            </div>
          </div>
        </div>
        <div>
          <form action={formAction}>
            <Field>
              <FieldLabel></FieldLabel>
              <FieldGroup>
                <Input
                  type="number"
                  name="fromAmount"
                  value={trcValue}
                  onChange={(e) => setTrcValue(e.target.value)}
                  required
                />
                <div className="flex flex-col gap-3">
                  <p>Converted to Flash USDT: ${flashUSDT}</p>
                  <p>Minimum required Flash: $500</p>
                </div>
              </FieldGroup>
            </Field>
            <input type="hidden" name="userId" value={userId} required />
            <input type="hidden" name="orderId" value={orderId} required />
            <input type="hidden" name="toAmount" value={flashUSDT} required />
            <input
              type="hidden"
              name="conversionRate"
              value={conversionRate}
              required
            />

            <Button type="submit" disabled={flashUSDT < 500 || isPending}>
              Continue
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SelectAmount;

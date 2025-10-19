"use client";
import CustomImageUploader from "@/components/CustomImageButton";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { DepositFormState, deposit } from "@/lib/actions/deposit/deposit";
import React, { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  userId: string;
  orderId: string;
};

const Deposit = ({ userId, orderId }: Props) => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [transactionId, setTransactionId] = useState<string>("");
  const [transactionLengthError, setTransactionLenghtError] =
    useState<boolean>(false);
  const initialState: DepositFormState = {
    errors: {},
    message: "",
    success: false,
    timestamp: Date.now(),
  };
  const [state, formAction, isPending] = useActionState<
    DepositFormState,
    FormData
  >(deposit, initialState);
  useEffect(() => {
    if (!state.success && state.message) {
      toast.message(state.message, { position: "top-center" });
    }
  }, [state.success, state.message, state.timestamp]);

  useEffect(() => {
    const transactionArray = transactionId.split("");
    console.log("transactionarray: ", transactionArray);
    if (transactionId && transactionArray.length < 34) {
      setTransactionLenghtError(true);
    } else {
      setTransactionLenghtError(false);
    }
  }, [transactionId]);
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="flex flex-col gap-8 bg-slate-50 shadow-xl py-5 px-7 rounded-lg max-w-2xl w-full">
        <h1>Verify Payment</h1>
        <form action={formAction} className="flex flex-col gap-4">
          <Field>
            <FieldLabel htmlFor="transactionId">
              Transaction / Order ID *
            </FieldLabel>
            <Input
              placeholder="Enter your Transaction ID"
              name="transactionId"
              onChange={(e) => setTransactionId(e.target.value)}
              value={transactionId}
              required
            />
            {transactionLengthError && (
              <FieldError>
                Transaction id must be at least 34 characters!
              </FieldError>
            )}
          </Field>
          <Field className="flex flex-col gap-2">
            <FieldLabel htmlFor="paymentScreenshotUrl">
              Image (Optional)
            </FieldLabel>
            <CustomImageUploader
              imageUploadName="upload payment screenshot"
              onUploadComplete={setUploadedImageUrl}
              currentImage={uploadedImageUrl}
            />
          </Field>
          <input type="hidden" name="userId" value={userId} required />
          <input type="hidden" name="orderId" value={orderId} required />
          <input
            type="hidden"
            name="paymentScreenshotUrl"
            value={uploadedImageUrl}
            required
          />
          <Button type="submit" disabled={isPending || transactionLengthError}>
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Deposit;

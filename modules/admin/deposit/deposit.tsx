"use client";

import CustomImageUploader from "@/components/CustomImageButton";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { DepositFormState, deposit } from "@/lib/actions/deposit/deposit";
import React, { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { UploadCloud, CheckCircle2, AlertTriangle } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  userId: string;
  orderId: string;
};

const Deposit = ({ userId, orderId }: Props) => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [transactionId, setTransactionId] = useState<string>("");
  const [transactionLengthError, setTransactionLengthError] =
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
      toast(state.message, { position: "top-center" });
    }
  }, [state.success, state.message, state.timestamp]);

  useEffect(() => {
    setTransactionLengthError(
      transactionId.length > 0 && transactionId.length < 34
    );
  }, [transactionId]);

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-b from-[#061b19] to-black px-4">
      <div className="flex flex-col gap-8 bg-[#111111] border border-gray-800 shadow-lg shadow-black/40 py-8 px-7 rounded-2xl max-w-2xl w-full">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-100 tracking-wide text-center">
          Verify Payment
        </h1>

        {/* Form */}
        <form action={formAction} className="flex flex-col gap-6">
          {/* Transaction ID */}
          <Field>
            <FieldLabel htmlFor="transactionId" className="text-gray-300">
              Transaction / Order ID *
            </FieldLabel>
            <div className="relative">
              <input
                placeholder="Enter your Transaction ID"
                name="transactionId"
                onChange={(e) => setTransactionId(e.target.value)}
                value={transactionId}
                required
                className={`w-full p-2 rounded-md bg-black border 
                        ${
                          transactionLengthError
                            ? "border-red-600"
                            : "border-gray-700"
                        } 
                          focus:outline-none focus:ring-1 focus:ring-indigo-600 
                         text-gray-100 placeholder-gray-500`}
              />

              {transactionId.length > 0 && !transactionLengthError && (
                <CheckCircle2 className="absolute right-3 top-3 text-indigo-500 w-5 h-5" />
              )}
              {transactionLengthError && (
                <AlertTriangle className="absolute right-3 top-3 text-red-500 w-5 h-5" />
              )}
            </div>
            {transactionLengthError && (
              <FieldError className="text-red-400 text-sm mt-1">
                Transaction ID must be at least 34 characters long.
              </FieldError>
            )}
          </Field>

          {/* Upload Screenshot */}
          <Field className="flex flex-col gap-3">
            <FieldLabel
              htmlFor="paymentScreenshotUrl"
              className="text-gray-300"
            >
              Upload Payment Screenshot (Optional)
            </FieldLabel>

            <CustomImageUploader
              imageUploadName="Upload Payment Screenshot"
              onUploadComplete={setUploadedImageUrl}
              currentImage={uploadedImageUrl}
            />
            {uploadedImageUrl && (
              <p className="text-sm text-indigo-400 mt-1">
                Image uploaded successfully.
              </p>
            )}
          </Field>

          {/* Hidden Inputs */}
          <input type="hidden" name="userId" value={userId} required />
          <input type="hidden" name="orderId" value={orderId} required />
          <input
            type="hidden"
            name="paymentScreenshotUrl"
            value={uploadedImageUrl}
            required
          />

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isPending || transactionLengthError}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg text-lg font-medium transition disabled:opacity-50"
          >
            {isPending ? <Spinner /> : "Continue"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Deposit;

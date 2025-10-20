"use client";

import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  updateDepositInfo,
  UpdateDepositInfoFormState,
} from "@/lib/actions/admin/update-deposit-info/update-deposit-info";
import { SystemSettingSelectType } from "@/lib/db/schema";
import Image from "next/image";
import { useActionState } from "react";
import { toast } from "sonner";
import CustomImageUploader from "@/components/CustomImageButton";

type Props = {
  systemRecord: SystemSettingSelectType;
};

const UpdateDepositInfo = ({ systemRecord }: Props) => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [showUpdate, setShowUpdate] = useState<boolean>(false);
  const updateFormRef = useRef<HTMLDivElement>(null);

  const initialState: UpdateDepositInfoFormState = {
    success: false,
    message: "",
    timestamp: Date.now(),
  };

  const [state, formAction, isPending] = useActionState<
    UpdateDepositInfoFormState,
    FormData
  >(updateDepositInfo, initialState);

  useEffect(() => {
    if (state.success && state.message) {
      toast.success(state.message, { position: "top-right" });
      setShowUpdate(false);
      setUploadedImageUrl("");
    }
    if (!state.success && state.message) {
      toast.error(state.message, { position: "top-right" });
    }
  }, [state.success, state.message, state.timestamp]);

  useEffect(() => {
    if (showUpdate && updateFormRef.current) {
      updateFormRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [showUpdate]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Deposit Settings
          </h1>
          <p className="text-gray-600">
            Manage deposit address, conversion rate, and QR code
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Current Deposit Information
            </h2>
            {!showUpdate ? (
              <Button onClick={() => setShowUpdate(true)}>Update Info</Button>
            ) : (
              <Button
                disabled={isPending}
                onClick={() => {
                  setShowUpdate(false);
                  setUploadedImageUrl("");
                }}
                variant="outline"
              >
                Cancel
              </Button>
            )}
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Deposit Address
              </label>
              <div className="p-3 bg-gray-50 rounded-lg border-2 border-gray-200">
                <p className="font-mono text-sm text-gray-900 break-all">
                  {systemRecord.depositAddress}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Conversion Rate
              </label>
              <div className="p-3 bg-gray-50 rounded-lg border-2 border-gray-200">
                <p className="text-2xl font-bold text-gray-900">
                  {systemRecord.conversionRate}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Deposit QR Code
              </label>
              <div className="relative w-40 h-40 border-2 border-gray-200 rounded-lg overflow-hidden">
                <Image
                  src={systemRecord.depositQrCodeUrl}
                  fill
                  alt="QR CODE"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {showUpdate && (
          <div
            ref={updateFormRef}
            className="bg-white rounded-lg shadow-md border border-gray-200 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Update Deposit Information
            </h2>
            <form action={formAction} className="space-y-6">
              <Field>
                <FieldLabel
                  htmlFor="depositAddress"
                  className="text-sm font-medium text-gray-900"
                >
                  New Deposit Address
                </FieldLabel>
                <Input
                  type="text"
                  name="depositAddress"
                  id="depositAddress"
                  placeholder="Enter new deposit address"
                  className="mt-1"
                  required
                />
              </Field>

              <Field>
                <FieldLabel
                  htmlFor="conversionRate"
                  className="text-sm font-medium text-gray-900"
                >
                  New Conversion Rate
                </FieldLabel>
                <Input
                  type="text"
                  name="conversionRate"
                  id="conversionRate"
                  placeholder="Enter new conversion rate"
                  className="mt-1"
                  required
                />
              </Field>

              <Field>
                <FieldLabel
                  htmlFor="paymentQR"
                  className="text-sm font-medium text-gray-900"
                >
                  New Payment QR Code Image
                </FieldLabel>
                <div className="mt-1">
                  <CustomImageUploader
                    onUploadComplete={setUploadedImageUrl}
                    imageUploadName="new payment qr code image"
                    currentImage={uploadedImageUrl}
                  />
                  <input
                    type="hidden"
                    name="newQRurl"
                    value={uploadedImageUrl}
                  />
                </div>
              </Field>

              <Button
                type="submit"
                disabled={isPending || !uploadedImageUrl}
                className="w-full"
              >
                {isPending ? "Updating..." : "Update Deposit Info"}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateDepositInfo;

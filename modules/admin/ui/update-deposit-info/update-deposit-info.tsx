"use client";

import CustomImageUploader from "@/components/CustomImageButton";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  updateDepositInfo,
  UpdateDepositInfoFormState,
} from "@/lib/actions/admin/update-deposit-info/update-deposit-info";
import { SystemSettingSelectType } from "@/lib/db/schema";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  systemRecord: SystemSettingSelectType;
};
const UpdateDepositInfo = ({ systemRecord }: Props) => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [showUpdate, setShowUpdate] = useState<boolean>(false);
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
  return (
    <div className="min-h-screen flex flex-col items-center my-10 gap-5">
      <div className="flex flex-col gap-7 bg-slate-200/80 py-5 px-7 rounded-lg max-w-2xl w-full">
        <div className="flex justify-between">
          <h1 className="text-lg font-black">Current Deposit Values</h1>
          {!showUpdate ? (
            <Button onClick={() => setShowUpdate(true)}>Update Info</Button>
          ) : (
            <Button disabled={isPending} onClick={() => setShowUpdate(false)}>
              Cancel
            </Button>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h1>Deposit Address</h1>
          <Input
            value={systemRecord.depositAddress}
            className="border-red-500 border-2 disabled:font-black"
            disabled
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1>Deposit QR Image</h1>
          <div className="w-20 h-20 relative">
            <Image src={systemRecord.depositQrCodeUrl} fill alt="QR CODE" />
          </div>
        </div>
      </div>
      {showUpdate && (
        <div className=" flex flex-col gap-2 py-5 px-7 rounded-xl max-w-2xl w-full bg-slate-50 shadow-xl">
          <h1>Update Deposit Information</h1>
          <form action={formAction} className="flex flex-col gap-5">
            <Field>
              <FieldLabel
                htmlFor="depositAddress"
                className="text-lg font-medium"
              >
                New Deposit Address
              </FieldLabel>
              <Input
                type="text"
                name="depositAddress"
                id="depositAddress"
                min={34}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="paymentQR" className="text-lg font-medium">
                New Payment QR Image
              </FieldLabel>
              <CustomImageUploader
                onUploadComplete={setUploadedImageUrl}
                imageUploadName="new payment qr code image"
                currentImage={uploadedImageUrl}
              />
              <input
                type="hidden"
                name="newQRurl"
                value={uploadedImageUrl}
                required
              />
            </Field>
            <Button disabled={isPending || !uploadedImageUrl}>
              Update Deposit Info
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateDepositInfo;

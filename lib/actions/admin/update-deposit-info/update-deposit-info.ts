"use server";

import { getCurrentAdmin } from "@/helpers/getCurrentAdmin";
import { db } from "@/lib/db";
import { systemSettings } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

export type UpdateDepositInfoFormState = {
  success: boolean;
  depositAddress?: string;
  newQRurl?: string;
  timestamp: number;
  message: string;
};

export async function updateDepositInfo(
  prevState: UpdateDepositInfoFormState,
  formData: FormData
): Promise<UpdateDepositInfoFormState> {
  const result = await getCurrentAdmin();

  if (!result.success) {
    return {
      success: false,
      message: "User is not an admin",
      timestamp: Date.now(),
    };
  }
  const depositAddress = formData.get("depositAddress") as string;
  const newQRurl = formData.get("newQRurl") as string;

  try {
    await db.update(systemSettings).set({
      depositAddress,
      depositQrCodeUrl: newQRurl,
      updatedAt: new Date(),
    });
    revalidatePath("/admin/update-deposit-info");
    return {
      success: true,
      message: "Deposit Info updated successfully",
      timestamp: Date.now(),
    };
  } catch (error) {
    console.log("Error: ", error);
    return {
      success: false,
      message: "Something went wrong",
      timestamp: Date.now(),
    };
  }
}

"use server";

import { getCurrentAdmin } from "@/helpers/getCurrentAdmin";
import { db } from "@/lib/db";
import { faqs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export type DeleteFaqFormState = {
  faqId?: string;
  message: string;
  success: boolean;
  timestamp: number;
};

export async function deleteFaq(
  prevState: DeleteFaqFormState,
  formData: FormData
): Promise<DeleteFaqFormState> {
  const result = await getCurrentAdmin();
  if (!result.success) {
    return {
      success: false,
      message: result.message,
      timestamp: Date.now(),
    };
  }

  const faqId = formData.get("faqId") as string;

  try {
    const [faq] = await db.select().from(faqs).where(eq(faqs.id, faqId));
    if (!faq) {
      return {
        message: "Faq doesn't exist",
        success: false,
        timestamp: Date.now(),
      };
    }

    await db.delete(faqs).where(eq(faqs.id, faqId));
    revalidatePath("/admin/create-faq");
    return {
      success: true,
      message: "FAQ deleted successfully",
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

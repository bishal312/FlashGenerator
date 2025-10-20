"use server";

import { getCurrentAdmin } from "@/helpers/getCurrentAdmin";
import { db } from "@/lib/db";
import { faqs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import z from "zod";

export type UpdateFaqFormState = {
  errors?: {
    properties?: {
      title?: string[];
      description?: string[];
      faqId?: string[];
    };
  };
  message: string;
  success: boolean;
  timestamp: number;
  inputs?: {
    title?: string;
    description?: string;
  };
};

export async function updateFaq(
  prevState: UpdateFaqFormState,
  formData: FormData
): Promise<UpdateFaqFormState> {
  const result = await getCurrentAdmin();
  if (!result.success) {
    return {
      success: false,
      message: result.message,
      timestamp: Date.now(),
    };
  }
  const faqSchema = z.object({
    title: z.string().trim().min(1).nonempty(),
    description: z.string().trim().min(5).nonempty(),
    faqId: z.string().nonempty(),
  });

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const faqId = formData.get("faqId") as string;

  const validateFields = faqSchema.safeParse({
    title,
    description,
    faqId,
  });
  if (!validateFields.success) {
    const tree = z.treeifyError(validateFields.error);
    return {
      errors: {
        properties: {
          title: tree.properties?.title?.errors,
          description: tree.properties?.description?.errors,
          faqId: tree.properties?.faqId?.errors,
        },
      },
      message: "Validation failed",
      success: false,
      timestamp: Date.now(),
      inputs: Object.fromEntries(formData),
    };
  }

  try {
    await db
      .update(faqs)
      .set({
        title,
        description,
        id: faqId,
      })
      .where(eq(faqs.id, faqId));
    revalidatePath("/admin/create-faq");
    return {
      success: true,
      message: "FAQ updated successfully",
      timestamp: Date.now(),
    };
  } catch (error) {
    console.log("Error: ", error);
    return {
      success: false,
      message: "Something went wrong",
      timestamp: Date.now(),
      inputs: Object.fromEntries(formData),
    };
  }
}

"use server";

import { getCurrentAdmin } from "@/helpers/getCurrentAdmin";
import { db } from "@/lib/db";
import { faqs } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import z from "zod";

export type FaqFormState = {
  errors?: {
    properties?: {
      title?: string[];
      description?: string[];
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

export async function createFaq(
  prevstate: FaqFormState,
  formData: FormData
): Promise<FaqFormState> {
  const result = await getCurrentAdmin();
  if (!result.success) {
    return {
      success: false,
      message: "User is not a admin",
      timestamp: Date.now(),
    };
  }
  const faqSchema = z.object({
    title: z.string().trim().min(1).nonempty(),
    description: z.string().trim().min(5).nonempty(),
  });

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  const validateFields = faqSchema.safeParse({
    title,
    description,
  });
  if (!validateFields.success) {
    const tree = z.treeifyError(validateFields.error);
    return {
      errors: {
        properties: {
          title: tree.properties?.title?.errors,
          description: tree.properties?.description?.errors,
        },
      },
      message: "Validation failed",
      success: false,
      timestamp: Date.now(),
      inputs: Object.fromEntries(formData),
    };
  }

  try {
    await db.insert(faqs).values({
      title,
      description,
    });
    revalidatePath("/admin/create-faq");
    return {
      success: true,
      message: "FAQ created successfully",
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

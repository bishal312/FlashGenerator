"use server";

import { getCurrentAdmin } from "@/helpers/getCurrentAdmin";
import { db } from "@/lib/db";
import { systemSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import z from "zod";

export type UpdateContactFormstate = {
  errors?: {
    properties?: {
      supportUsername?: string[];
    };
  };
  message: string;
  success: boolean;
  timestamp: number;
  inputs?: {
    supportUsername?: string;
  };
};

export async function updateContactInfo(
  prevState: UpdateContactFormstate,
  formData: FormData
): Promise<UpdateContactFormstate> {
  const result = await getCurrentAdmin();
  if (!result.success) {
    return {
      success: false,
      message: "User is not a admin",
      timestamp: Date.now(),
    };
  }

  const contactSchema = z.object({
    supportUsername: z.string().trim().min(1).nonempty(),
  });

  const validateField = contactSchema.safeParse({
    supportUsername: formData.get("supportUsername") as string,
  });

  if (!validateField.success) {
    return {
      errors: {
        properties: {
          supportUsername: z.treeifyError(validateField.error).properties
            ?.supportUsername?.errors,
        },
      },
      success: false,
      message: "Validation Failed",
      timestamp: Date.now(),
      inputs: Object.fromEntries(formData),
    };
  }
  const { supportUsername } = validateField.data;

  try {
    await db
      .update(systemSettings)
      .set({
        supportUsername,
        updatedAt: new Date(),
      })
      .where(eq(systemSettings.id, "system"));
    revalidatePath("/admin/update-contact-info");
    return {
      success: true,
      message: "Support username updated successfully!",
      timestamp: Date.now(),
    };
  } catch (error) {
    console.log("error: ", error);

    return {
      success: false,
      message: "Something went wrong",
      timestamp: Date.now(),
      inputs: Object.fromEntries(formData),
    };
  }
}

"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";
import {
  deleteFaq,
  DeleteFaqFormState,
} from "@/lib/actions/admin/faqs/delete-faq";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

type Props = {
  faqId: string;
  onClose: () => void;
};
export default function DeleteFaq({ faqId, onClose }: Props) {
  const initialState: DeleteFaqFormState = {
    message: "",
    success: false,
    timestamp: Date.now(),
  };

  const [state, formAction, isPending] = useActionState<
    DeleteFaqFormState,
    FormData
  >(deleteFaq, initialState);

  useEffect(() => {
    if (state.success && state.message) {
      onClose?.();
      toast.success(state.message, { position: "top-right" });
    }
    if (!state.success && state.message) {
      toast.error(state.message, { position: "top-right" });
    }
  }, [state.success, state.message, state.timestamp, onClose]);
  return (
    <div className="w-full p-6 flex justify-center">
      <AlertDialog open={true} onOpenChange={onClose}>
        <AlertDialogContent>
          <form action={formAction}>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                faq and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

              <button
                type="submit"
                disabled={isPending}
                className="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
              >
                {isPending ? <Spinner /> : "Continue"}
              </button>
            </AlertDialogFooter>
            <input type="hidden" name="faqId" value={faqId} required />
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

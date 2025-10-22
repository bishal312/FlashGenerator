"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import {
  UpdateContactFormstate,
  updateContactInfo,
} from "@/lib/actions/admin/update-contact/update-contact";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  supportUsername: string | null;
};

const UpdateContact = ({ supportUsername }: Props) => {
  const [showUpdateDialog, setShowUpdateDialog] = useState<boolean>(false);
  const initialState: UpdateContactFormstate = {
    message: "",
    success: false,
    timestamp: Date.now(),
  };

  const [state, formAction, isPending] = useActionState<
    UpdateContactFormstate,
    FormData
  >(updateContactInfo, initialState);

  useEffect(() => {
    if (state.success && state.message) {
      setShowUpdateDialog(false);
      toast.success(state.message, { position: "top-right" });
    }

    if (!state.success && state.message) {
      toast.error(state.message, { position: "top-right" });
    }
  }, [state.success, state.message, state.timestamp]);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact Info</h1>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Support Username
            </label>
            <div className="bg-gray-50 rounded-md px-4 py-3 border border-gray-200">
              <p className="text-gray-900 font-medium">
                {supportUsername ?? "Support username is not set"}
              </p>
            </div>
          </div>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => setShowUpdateDialog(true)}
          >
            Update Support Username
          </button>
        </div>
      </div>

      {showUpdateDialog && (
        <Dialog open={showUpdateDialog} onOpenChange={setShowUpdateDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <form action={formAction} className="w-full flex flex-col gap-4">
              <DialogHeader>
                <DialogTitle>Edit Support Username</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="support-username">New support username</Label>
                  <Input
                    id="support-username"
                    name="supportUsername"
                    defaultValue={state.inputs?.supportUsername || ""}
                  />
                  {state.errors?.properties?.supportUsername && (
                    <FieldError>
                      {state.errors.properties.supportUsername[0]}
                    </FieldError>
                  )}
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" disabled={isPending}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">
                  {isPending ? <Spinner /> : "Save changes"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default UpdateContact;

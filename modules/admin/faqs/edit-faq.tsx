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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import {
  updateFaq,
  UpdateFaqFormState,
} from "@/lib/actions/admin/faqs/update-faq";
import { FaqsSelectType } from "@/lib/db/schema";
import React, { useActionState, useEffect } from "react";
import { toast } from "sonner";

type Props = {
  faq: FaqsSelectType;
  onClose: () => void;
};

const EditFaq = ({ faq, onClose }: Props) => {
  const initialState: UpdateFaqFormState = {
    message: "",
    success: false,
    timestamp: Date.now(),
  };

  const [state, formAction, isPending] = useActionState<
    UpdateFaqFormState,
    FormData
  >(updateFaq, initialState);

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
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form action={formAction} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Update a new FAQ</DialogTitle>
            <DialogDescription>
              Update an exisiting FAQ and help the user get their answers.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <Field className="grid gap-3">
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                id="title"
                name="title"
                defaultValue={state.inputs?.title ?? faq.title}
                required
              />
              {state.errors?.properties?.title && (
                <FieldError>{state.errors.properties.title[0]}</FieldError>
              )}
            </Field>
            <Field className="grid gap-3">
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                id="description"
                name="description"
                defaultValue={state.inputs?.description ?? faq.description}
                required
              />
              {state.errors?.properties?.description && (
                <FieldError>
                  {state.errors.properties.description[0]}
                </FieldError>
              )}
            </Field>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>
            <input type="hidden" name="faqId" value={faq.id} required />
            <Button type="submit" disabled={isPending}>
              {isPending ? <Spinner /> : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditFaq;

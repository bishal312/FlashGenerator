"use client";

import { FaqsSelectType } from "@/lib/db/schema";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { createFaq, FaqFormState } from "@/lib/actions/admin/faqs/create-faq";
import { useActionState, useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { PenIcon, Trash } from "lucide-react";
import EditFaq from "./edit-faq";
import DeleteFaq from "./delete-faq";

type Props = {
  allFaqs: FaqsSelectType[];
};

const Faq = ({ allFaqs }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedFaq, setSelectedFaq] = useState<FaqsSelectType | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const initialState: FaqFormState = {
    message: "",
    success: false,
    timestamp: Date.now(),
  };
  const [state, formAction, isPending] = useActionState<FaqFormState, FormData>(
    createFaq,
    initialState
  );
  useEffect(() => {
    if (state.success && state.message) {
      setIsOpen(false);
      toast.success(state.message, { position: "top-right" });
    }
    if (!state.success && state.message) {
      toast.error(state.message, { position: "top-right" });
    }
  }, [state.success, state.message, state.timestamp]);

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="bg-slate-50 max-w-full w-full felx flex-col py-5 px-7 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="font-black text-lg">FAQS</h1>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Create faq</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form action={formAction} className="flex flex-col gap-4">
                <DialogHeader>
                  <DialogTitle>Create a new FAQ</DialogTitle>
                  <DialogDescription>
                    Create a new FAQ and help the user get their answers.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <Field className="grid gap-3">
                    <FieldLabel htmlFor="title">Title</FieldLabel>
                    <Input
                      id="title"
                      name="title"
                      defaultValue={state.inputs?.title}
                      required
                    />
                    {state.errors?.properties?.title && (
                      <FieldError>
                        {state.errors.properties.title[0]}
                      </FieldError>
                    )}
                  </Field>
                  <Field className="grid gap-3">
                    <FieldLabel htmlFor="description">Description</FieldLabel>
                    <Textarea
                      id="description"
                      name="description"
                      defaultValue={state.inputs?.description}
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
                  <Button type="submit" disabled={isPending}>
                    {isPending ? <Spinner /> : "Create"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <Separator className="mt-4" />
        {allFaqs.length > 0 ? (
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue={allFaqs[0].id}
          >
            {allFaqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <div className="flex justify-between items-center">
                  <AccordionTrigger className="flex-1 w-full">
                    <p>{faq.title}</p>
                  </AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => {
                        setSelectedFaq(faq);
                        setIsEditing(true);
                      }}
                      variant="outline"
                      size="sm"
                    >
                      <PenIcon size={14} />
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedFaq(faq);
                        setIsDeleting(true);
                      }}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash size={14} />
                    </Button>
                  </div>
                </div>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <p>{faq.description}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="py-5">
            <h1>No faqs found, create one</h1>
          </div>
        )}

        {isEditing && selectedFaq && (
          <EditFaq faq={selectedFaq} onClose={() => setIsEditing(false)} />
        )}

        {isDeleting && selectedFaq && (
          <DeleteFaq
            faqId={selectedFaq.id}
            onClose={() => setIsDeleting(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Faq;

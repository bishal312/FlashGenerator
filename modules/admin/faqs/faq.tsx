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
import { createFaq, FaqFormState } from "@/lib/actions/admin/faqs/create-faq";
import { useActionState, useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { PenIcon, Trash, Plus, HelpCircle } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <HelpCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  FAQs
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  {allFaqs.length}{" "}
                  {allFaqs.length === 1 ? "question" : "questions"} available
                </p>
              </div>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto gap-2 shadow-sm">
                  <Plus size={18} />
                  Create FAQ
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <form action={formAction} className="flex flex-col gap-4">
                  <DialogHeader>
                    <DialogTitle>Create a new FAQ</DialogTitle>
                    <DialogDescription>
                      Create a new FAQ and help users get their answers.
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
                        placeholder="Enter FAQ question"
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
                        placeholder="Enter detailed answer"
                        className="min-h-[120px]"
                      />
                      {state.errors?.properties?.description && (
                        <FieldError>
                          {state.errors.properties.description[0]}
                        </FieldError>
                      )}
                    </Field>
                  </div>
                  <DialogFooter className="gap-2 sm:gap-0">
                    <DialogClose asChild>
                      <Button
                        variant="outline"
                        disabled={isPending}
                        className="w-full sm:w-auto"
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="w-full sm:w-auto"
                    >
                      {isPending ? <Spinner /> : "Create FAQ"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {allFaqs.length > 0 ? (
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue={allFaqs[0].id}
            >
              {allFaqs.map((faq, index) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className={`border-b border-slate-100 last:border-b-0 ${
                    index === 0 ? "border-t-0" : ""
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-2 sm:gap-4 px-4 sm:px-6 py-2 hover:bg-slate-50/50 transition-colors sm:justify-between">
                    <AccordionTrigger className="flex-1 flex items-center  text-left hover:no-underline py-4 [&[data-state=open]>div]:text-blue-600">
                      <div className="flex items-center gap-3 pr-4">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold mt-0.5 flex-shrink-0">
                          {index + 1}
                        </span>
                        <p className="font-medium text-slate-900 text-sm sm:text-base leading-relaxed">
                          {faq.title}
                        </p>
                      </div>
                    </AccordionTrigger>
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                      <Button
                        onClick={() => {
                          setSelectedFaq(faq);
                          setIsEditing(true);
                        }}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                        title="Edit FAQ"
                      >
                        <PenIcon size={16} />
                      </Button>
                      <Button
                        onClick={() => {
                          setSelectedFaq(faq);
                          setIsDeleting(true);
                        }}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                        title="Delete FAQ"
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  </div>
                  <AccordionContent className="px-4 sm:px-6 pb-6">
                    <div className="pl-0 sm:pl-9 pt-2">
                      <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                        <p className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                          {faq.description}
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="p-4 bg-slate-100 rounded-full mb-4">
                <HelpCircle className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                No FAQs yet
              </h3>
              <p className="text-slate-500 text-center mb-6 max-w-sm">
                Get started by creating your first FAQ to help users find
                answers quickly.
              </p>
              <Button onClick={() => setIsOpen(true)} className="gap-2">
                <Plus size={18} />
                Create your first FAQ
              </Button>
            </div>
          )}
        </div>
      </div>

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
  );
};

export default Faq;

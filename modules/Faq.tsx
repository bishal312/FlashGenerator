"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { FaqsSelectType } from "@/lib/db/schema";

type Props = {
  allFaqs: FaqsSelectType[];
};

export default function Faq({ allFaqs }: Props) {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggle = (index: string) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br pt-20 from-gray-900 via-gray-800 to-black text-white px-6 sm:px-8 md:px-10 lg:px-20 py-12">
      <h1 className="text-3xl font-bold text-center mb-10">
        Frequently Asked Questions
      </h1>

      <div className="max-w-3xl mx-auto space-y-4">
        {allFaqs.length > 0 ? (
          allFaqs.map((faq) => (
            <div key={faq.id}>
              <div className="border border-gray-700 rounded-xl bg-gray-800/40 hover:bg-gray-800/60 transition-all duration-200">
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full flex justify-between items-center p-4"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-blue-400" />
                    <span className="text-sm font-medium">{faq.title}</span>
                  </div>
                  {openIndex === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>

              {openIndex === faq.id && (
                <div className="px-12 pb-4 text-gray-300 text-sm animate-fadeIn">
                  {faq.description}
                </div>
              )}
            </div>
          ))
        ) : (
          <div>
            <h1>No faqs found</h1>
          </div>
        )}
      </div>
    </div>
  );
}

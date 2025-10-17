"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      title: "What is FlashGen?",
      description:
        "FlashGen is a platform that allows users to generate creative and powerful content using AI within seconds.",
    },
    {
      title: "How does FlashGen work?",
      description:
        "It uses advanced AI models integrated with our backend API to provide instant content generation for various purposes.",
    },
    {
      title: "Is FlashGen free to use?",
      description:
        "You can start with a free trial. Premium plans offer more templates, faster responses, and higher accuracy.",
    },
    {
      title: "Can I use FlashGen on mobile?",
      description:
        "Yes! FlashGen is fully responsive and works smoothly on all modern devices including smartphones and tablets.",
    },
    {
      title: "How can I contact support?",
      description:
        "You can reach out to our support team anytime through the Contact page or by emailing support@flashgen.com.",
    },
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br pt-20 from-gray-900 via-gray-800 to-black text-white px-6 sm:px-8 md:px-10 lg:px-20 py-12">
      <h1 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h1>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-700 rounded-xl bg-gray-800/40 hover:bg-gray-800/60 transition-all duration-200"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center p-4"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium">{faq.title}</span>
              </div>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {openIndex === index && (
              <div className="px-12 pb-4 text-gray-300 text-sm animate-fadeIn">
                {faq.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Search,
  MessageCircle,
} from "lucide-react";
import { FaqsSelectType } from "@/lib/db/schema";
import Link from "next/link";

type Props = {
  allFaqs: FaqsSelectType[];
};

export default function Faq({ allFaqs }: Props) {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggle = (index: string) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = allFaqs.filter(
    (faq) =>
      faq.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-12 md:py-16 lg:py-20 mt-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-2xl mb-4 md:mb-6">
            <MessageCircle className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto px-4">
            Find answers to common questions about our services
          </p>
        </div>

        {allFaqs.length > 0 && (
          <div className="mb-6 md:mb-8">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-xl pl-12 pr-4 py-3 md:py-4 text-sm md:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              />
            </div>
          </div>
        )}

        <div className="space-y-3 md:space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <div
                key={faq.id}
                className="border border-gray-700/50 rounded-xl md:rounded-2xl bg-gray-800/40 backdrop-blur-sm hover:bg-gray-800/60 hover:border-gray-600/50 transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full flex justify-between items-start gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 text-left group"
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                        <span className="text-blue-400 font-semibold text-xs sm:text-sm">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm sm:text-base md:text-lg font-medium text-gray-100 leading-relaxed pt-1 break-words">
                      {faq.title}
                    </span>
                  </div>
                  <div className="flex-shrink-0 pt-1">
                    {openIndex === faq.id ? (
                      <ChevronUp className="w-5 h-5 text-blue-400 transition-transform" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-gray-300 transition-colors" />
                    )}
                  </div>
                </button>
                {openIndex === faq.id && (
                  <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 animate-fadeIn">
                    <div className="pl-0 sm:pl-[52px] md:pl-[58px]">
                      <div className="bg-gray-900/40 rounded-lg p-4 sm:p-5 border border-gray-700/30">
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words">
                          {faq.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : searchQuery ? (
            <div className="flex flex-col items-center justify-center py-12 md:py-16 px-4">
              <div className="w-16 h-16 bg-gray-800/60 rounded-2xl flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-300 mb-2">
                No results found
              </h3>
              <p className="text-gray-500 text-sm md:text-base text-center max-w-md">
                Try adjusting your search terms or browse all questions below
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 md:py-16 px-4">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-800/60 rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                <HelpCircle className="w-8 h-8 md:w-10 md:h-10 text-gray-500" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-300 mb-2">
                No FAQs Available
              </h3>
              <p className="text-gray-500 text-sm md:text-base text-center max-w-md">
                Check back later for frequently asked questions
              </p>
            </div>
          )}
        </div>

        {filteredFaqs.length > 0 && (
          <div className="mt-8 md:mt-12 text-center">
            <p className="text-gray-500 text-xs sm:text-sm">
              Can&apos;t find what you&apos;re looking for?{" "}
              <Link
                href="/contact-us"
                className="text-blue-400 hover:text-blue-300 transition-colors underline"
              >
                Contact our support team
              </Link>
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

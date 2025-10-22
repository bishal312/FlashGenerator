"use client";

import { Globe, Code2, CheckCircle2, Wallet, AlertCircle } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      icon: <Globe className="w-6 h-6 text-teal-400" />,
      title: "Your Order Verification",
      description:
        "our system first reviews your order details to ensure accuracy and security before processing. Your transaction safety is our top priority.",
    },
    {
      id: 2,
      icon: <Code2 className="w-6 h-6 text-blue-400" />,
      title: "Flash Generator Software",
      description:
        "The Flash Generator connects through Web3-compatible software, ensuring seamless blockchain communication.",
    },
    {
      id: 3,
      icon: <CheckCircle2 className="w-6 h-6 text-green-400" />,
      title: "Payment Verification",
      description:
        "Once your payment is verified, the flash generation request is initialized automatically. If verification fails, your request will not proceed.",
    },
    {
      id: 4,
      icon: <Wallet className="w-6 h-6 text-yellow-400" />,
      title: "Wallet Address Binding",
      description:
        "You must provide a valid wallet address. The flash process will begin using this address to generate the requested transaction.",
    },
    {
      id: 5,
      icon: <AlertCircle className="w-6 h-6 text-red-400" />,
      title: "Final Status",
      description:
        "Once the process completes, you’ll see your order status marked as Submitted, Pending, Rejected, or Successful. If any issue occurs, you’ll receive recovery guidance.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6 sm:px-8 md:px-10 lg:py-20 mt-16">
      <h1 className="text-3xl md:text-4xl font-bold text-center pb-2 mt-10">
        How It Works
      </h1>
      <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
        Understand the simple and secure process behind our Web3 Flash
        Generation System.
      </p>
      <div className="max-w-3xl mx-auto space-y-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative border border-gray-700 rounded-2xl bg-gray-800 hover:bg-gray-800/70 p06 transition-all duration-200"
          >
            <div className="flex  items-start align-middle gap-4">
              <div className="flex">
                <div className="p-3 mt-2 mx-2 items-center justify-center bg-gray-900 rounded-xl shadow-inner">
                  {step.icon}
                </div>
                <h2 className="font-bold pt-5 text-white">
                  {step.id}. {step.title}
                </h2>
              </div>
            </div>
            <p className="text-gray-300 px-5 pb-5 mt-2 text-sm">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

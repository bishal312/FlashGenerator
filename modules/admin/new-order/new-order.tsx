"use client";

import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { newOrder, NewOrderFormState } from "@/lib/actions/new-order/new-order";
import Image from "next/image";
import React, { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  userId: string;
};

const NewOrder = ({ userId }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const allNetworks = [
    { networkName: "USDT", token: "usdt", imageIcon: "/images/icon2.svg" },
  ];

  const filteredNetworks = allNetworks.filter((network) =>
    network.networkName.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  const initialState: NewOrderFormState = {
    errors: { properties: {} },
    success: false,
    message: "",
    timestamp: Date.now(),
  };

  const [state, formAction, isPending] = useActionState<
    NewOrderFormState,
    FormData
  >(newOrder, initialState);

  const [selectedToken, setSelectedToken] = useState("");

  useEffect(() => {
    if (!state.success && state.message) {
      toast.message(state.message, { position: "top-center" });
    }
  }, [state.success, state.message, state.timestamp]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#04171a] to-[#0b1f21] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#0e1f22]/70 border border-gray-800 rounded-2xl shadow-2xl p-8 backdrop-blur-md">
        <h1 className="text-center text-2xl font-semibold text-white mb-8">
          Create New Order
        </h1>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Search Token
          </label>
          <InputGroup>
            <InputGroupInput
              placeholder="Search..."
              value={searchTerm ?? ""}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#1b1539] border border-gray-700 text-gray-200 placeholder:text-gray-500 rounded-xl focus:ring-2 focus:ring-indigo-500"
            />
          </InputGroup>
        </div>

        <form action={formAction} className="flex flex-col gap-5 w-full">
          <h2 className="text-white font-medium text-lg mb-2">
            Select a network
          </h2>

          {filteredNetworks.length === 0 ? (
            <p className="text-gray-500 text-sm text-center">
              No results found.
            </p>
          ) : (
            filteredNetworks.map((network) => (
              <div
                key={network.token}
                onClick={() =>
                  setSelectedToken((prev) =>
                    prev === network.token ? "" : network.token
                  )
                }
                className={`w-full cursor-pointer bg-[#1b1539]/70 hover:bg-[#241c4c] rounded-xl border transition-all duration-200 p-4 flex items-center justify-between ${selectedToken === network.token
                    ? "border-indigo-500 ring-2 ring-indigo-400/40"
                    : "border-gray-700"
                  }`}
              >
                <FieldGroup className="flex flex-row items-center gap-3">
                  <div className="h-9 w-9 relative">
                    <Image
                      src={network.imageIcon}
                      fill
                      alt={network.networkName}
                      className="object-contain"
                    />
                  </div>
                  <p
                    className={`font-medium ${selectedToken === network.token
                      ? "text-indigo-400"
                      : "text-gray-300"
                      }`}
                  >
                    {network.networkName}
                  </p>
                </FieldGroup>
                <input
                  type="radio"
                  name="token"
                  value={network.token}
                  className="hidden"
                  checked={selectedToken === network.token}
                  readOnly
                  required
                />
              </div>
            ))
          )}

          <input type="hidden" name="userId" value={userId} />

          <Button
            type="submit"
            disabled={isPending}
            className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50"
          >
            {isPending ? "Processing..." : "Continue"}
          </Button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Select your preferred network and continue to next step.
        </p>
      </div>
    </div>
  );
};

export default NewOrder;

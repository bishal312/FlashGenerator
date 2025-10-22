"use client";

import { Button } from "@/components/ui/button";
import { FieldError, FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import {
  chooseNetwork,
  ChooseNetworkFormState,
} from "@/lib/actions/choose-network/choose-network";
import { Search } from "lucide-react";
import React, { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  userId: string;
  orderId: string;
};

const ChooseNetwork = ({ userId, orderId }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState<string>("");

  const allNetworks = [
    {
      networkName: "Tron (TRC20)",
      token: "trc20",
      confirmStep: 2,
      minimumRequiredFlash: "$500",
    },
  ];

  const filteredNetworks = allNetworks.filter((network) =>
    network.networkName.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  const initialState: ChooseNetworkFormState = {
    errors: { properties: {} },
    success: false,
    message: "",
    timestamp: Date.now(),
  };

  const [state, formAction, isPending] = useActionState<
    ChooseNetworkFormState,
    FormData
  >(chooseNetwork, initialState);

  useEffect(() => {
    if (!state.success && state.message) {
      toast(state.message, { position: "top-center" });
    }
  }, [state.success, state.message, state.timestamp]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1a18] to-[#000] flex flex-col items-center justify-center px-4 mt-16">
      <div className="w-full max-w-md mb-5 bg-[#0e2321]/50 rounded-2xl p-8 border border-gray-700 shadow-lg">
        <h1 className="text-center text-2xl font-semibold text-white mb-6">
          Choose Network
        </h1>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3">
            <Search className="text-gray-400 w-6 h-5 mr-3" />
            <input
              type="text"
              placeholder="Search network"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-sm text-gray-200"
            />
          </div>
        </div>

        <form action={formAction} className="flex flex-col gap-4 w-full">
          <h1 className="text-white font-semibold">Select a network</h1>

          {filteredNetworks.length === 0 ? (
            <p className="text-gray-500 text-sm">No results found.</p>
          ) : (
            filteredNetworks.map((network) => (
              <div
                key={network.token}
                onClick={() =>
                  setSelectedNetwork((prev) =>
                    prev === network.token ? "" : network.token
                  )
                }
                className={`w-full cursor-pointer px-4 py-4 rounded-xl border-2 transition-all ${
                  selectedNetwork === network.token
                    ? "border-indigo-500 ring-2 ring-indigo-500/40 bg-gray-800/80"
                    : "border-gray-700 hover:border-gray-500 bg-gray-900/50"
                }`}
              >
                <input
                  type="radio"
                  name="network"
                  value={network.token}
                  className="hidden"
                  checked={selectedNetwork === network.token}
                  onChange={() => setSelectedNetwork(network.token)}
                  required
                />
                <FieldGroup className="flex flex-row items-center gap-2">
                  <p className="flex flex-col text-white font-medium">
                    {network.networkName}
                    <span className="text-gray-400 font-normal text-sm">
                      {network.confirmStep} Block Confirmation
                    </span>
                    <span className="text-gray-400 font-normal text-sm">
                      Minimum required flash:{network.minimumRequiredFlash}
                    </span>
                  </p>
                </FieldGroup>
              </div>
            ))
          )}
          {state.errors?.properties?.network && (
            <FieldError>{state.errors.properties.network[0]}</FieldError>
          )}

          <input type="hidden" name="userId" value={userId} />
          <input type="hidden" name="orderId" value={orderId} />

          <Button
            type="submit"
            disabled={isPending || !selectedNetwork}
            className="w-full max-w-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all"
          >
            {isPending ? <Spinner /> : "Continue"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChooseNetwork;

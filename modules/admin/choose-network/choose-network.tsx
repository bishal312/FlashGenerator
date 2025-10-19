"use client";

import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import {
  chooseNetwork,
  ChooseNetworkFormState,
} from "@/lib/actions/choose-network/choose-network";
import React, { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
type Props = {
  userId: string;
  orderId: string;
};
const ChooseNetwork = ({ userId, orderId }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const allNetworks = [
    {
      networkName: "Tron (TRC20)",
      token: "trc20",
      minimumRequiredFlash: "$122500",
    },
    {
      networkName: "BNB Smart Chain (BEP20)",
      token: "bep20",
      minimumRequiredFlash: "$99700",
    },
    {
      networkName: "Etereum (ERC20)",
      token: "erc20",
      minimumRequiredFlash: "$225000",
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
      toast.message(state.message, { position: "top-center" });
    }
  }, [state.success, state.message, state.timestamp]);

  return (
    <div className="max-w-2xl mx-auto min-h-screen flex flex-col gap-2 items-center justify-center">
      <InputGroup>
        <InputGroupInput
          placeholder="Search..."
          value={searchTerm ?? ""}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>
      <form action={formAction} className="flex flex-col gap-4 w-full">
        <h1>Select a network</h1>

        {filteredNetworks.length === 0 ? (
          <p className="text-gray-500 text-sm">No results found.</p>
        ) : (
          filteredNetworks.map((network) => (
            <label
              key={network.token}
              className="w-full cursor-pointer hover:border-2 hover:border-red-500 bg-slate-400 px-4 py-4 rounded-xl border-2 border-transparent has-[input:checked]:border-green-600"
            >
              <input
                type="radio"
                name="network"
                value={network.token}
                className="hidden"
                required
              />
              <FieldGroup className="flex flex-row items-center gap-2 ">
                <p>{network.networkName}</p>
              </FieldGroup>
            </label>
          ))
        )}

        <input type="hidden" name="userId" value={userId} />
        <input type="hidden" name="orderId" value={orderId} />

        <Button type="submit" disabled={isPending}>
          Continue
        </Button>
      </form>
    </div>
  );
};

export default ChooseNetwork;

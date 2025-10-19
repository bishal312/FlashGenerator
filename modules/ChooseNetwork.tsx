"use client"

import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ChooseNetwork() {

  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("");


  const AvailableNetworks = [
    { Name: "Tron (TRC20)", Confirm: "2 Block Confirmations", Minimum: "Minimum required flash: $122500" },
  ]

  const filteredNetworks = AvailableNetworks.filter((net) =>
    net.Name.toLowerCase().includes(search.toLowerCase())
  );

  const handleContinue = () => {
    if (!selectedNetwork) {
      alert("Please select a Network before continuing.");
      return;
    }
    router.push("/new-order/wallet-address")
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1a18] to-[#000] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md mb-5 bg-[#0e2321]/50 rounded-2xl p-8 border border-gray-700 shadow-lg">
        <h1 className="text-center text-2xl font-semibold text-white mb-6">Choose Network</h1>
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3">
            <Search className="text-gray-400 w-6 h-5 mr-3" />
            <input
              type="text"
              placeholder="Enter your TX / Transaction ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-sm text-gray-200"
            />
          </div>
        </div>
      </div>
      <div className="w-full max-w-md bg-[#0e2321]/50 rounded-2xl p-4 border border-gray-700 shadow-lg space-y-4 mb-8">
        <h1 className="text-white font-semibold mb-3">Available Networks</h1>
        {filteredNetworks.length > 0 ? (
          filteredNetworks.map((net, idx) => (
            <div
              key={idx}
              onClick={() =>
                setSelectedNetwork((prev) =>
                  prev === net.Name ? "" : net.Name
                )
              }
              className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer 
                ${selectedNetwork === net.Name
                  ? "border-indigo-500 ring-2 ring-indigo-500/40 bg-gray-800/80"
                  : "border-gray-700 hover:border-gray-500 bg-gray-900/50"
                }`}
            >
              <h2 className="text-white font-medium">{net.Name}</h2>
              <p className="text-gray-400 text-sm">{net.Confirm}</p>
              <p className="text-gray-500 text-xs mt-1">{net.Minimum}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 text-sm">
            No networks found.
          </p>
        )}
      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        className="w-full max-w-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all"
      >
        Continue
      </button>
    </div>);
}
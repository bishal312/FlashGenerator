"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Deposit() {
  const [transactionId, setTransactionId] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [fileData, setFileData] = useState<File | null>(null);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileData(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string); // base64 preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (!fileData) return alert("No image selected!");
    //fetch or axios
    console.log("Image file ready to upload:", fileData);
    router.push("/order-history/:orderid")
  };

  const handleTransactionIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTransactionId(value);
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1a18] to-[#000] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#0e2321]/60 border border-gray-700 rounded-2xl p-8  shadow-lg text-center space-y-6">
        <h1 className="text-2xl font-semibold text-white">Verify Payment</h1>
        <div className="flex flex-col gap-5">
          <div>
            <h2 className="text-white font-semibold text-left pb-2">Transaction / Order ID *</h2>
            <input
              type="number"
              value={transactionId}
              onChange={handleTransactionIdChange}
              placeholder="Enter your Transaction ID"
              className="w-full bg-gray-900 text-gray-200 placeholder-gray-500 border border-gray-700 rounded-xl px-4 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
          <div>
            <h2 className="text-white font-semibold text-left pb-2">Payment Screenshoot</h2>
            <input
              type="file"
              accept="imgae/*"
              onChange={handleImageChange}
              placeholder="Enter your Transaction ID"
              className="w-full bg-gray-900 text-gray-200 placeholder-gray-500 border border-gray-700 rounded-xl px-4 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            {preview && (
              <Image
                src={preview}
                width={160}
                height={160}
                alt="Preview"
                unoptimized
                className="mt-5 w-40 h-40 object-cover rounded-xl border border-gray-600 mb-4"
              />
            )}
            <button
              onClick={handleUpload}
              className="bg-indigo-600 text-white hover:bg-indigo-700 mt-5 w-full px-6 py-2 rounded-xl font-semibold transition-all"
            >
              Complete Deposit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
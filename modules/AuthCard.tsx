"use client";

import Image from "next/image";

interface AuthCardProps {
  title: string;
  icon: string;
  buttonText: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children?: React.ReactNode;
}

export default function AuthCard({ title, icon, buttonText, onSubmit, children }: AuthCardProps) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="w-full max-w-md bg-gray-900/60 backdrop-blur-md border border-gray-700 rounded-2xl p-8 shadow-lg">
        <Image src={icon} alt="flashGen" className="w-12 h-12 items-center m-auto mb-2" width={240} height={240} />
        <h1 className="text-2xl font-bold text-center mb-6">{title}</h1>
        <form onSubmit={onSubmit} className="space-y-5">
          {children}
          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition font-semibold"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

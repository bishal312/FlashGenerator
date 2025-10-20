"use client";
import Link from "next/link";
import { useState } from "react";
import AuthCard from "../AuthCard";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ email, password });
    // TODO: call your backend API here
  };

  return (
    <AuthCard icon="/images/icon2.svg" title="Welcome Back to FlashGen" buttonText="Sign In" onSubmit={handleLogin}>
      <div>
        <label className="block text-sm mb-1">Telegram username</label>
        <input
          type="text"
          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder="Enter your telegaram username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>


      <p className="text-sm text-gray-400 text-center">
        Don’t have an account?{" "}
        <Link href="/sign-up" className="text-indigo-400 hover:underline">
          Sign Up
        </Link>
      </p>
    </AuthCard>
  );
}

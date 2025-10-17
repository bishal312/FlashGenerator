"use client";
import Link from "next/link";
import { useState } from "react";
import AuthCard from "../AuthCard";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
    // TODO: send form data to backend API
  };

  return (
    <AuthCard icon="/images/icon2.svg" title="Create an Account" buttonText="Sign Up" onSubmit={handleSignup}>
      <div>
        <label className="block text-sm mb-1">Telegram username</label>
        <input
          type="text"
          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder="Enter your telegram username"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder="••••••••"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Confirm Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder="••••••••"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
      </div>

      <div className="text-red-700 font-semibold text-sm">
        Warning
        <p className="text-sm font-normal text-gray-100">
          This password can never be changed, so make sure to save it securely.
        </p>
      </div>

      <p className="text-sm text-gray-400 text-center">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-indigo-400 hover:underline">
          Log In
        </Link>
      </p>
    </AuthCard>
  );
}

"use client";
import Link from "next/link";
import Image from "next/image";
import { signIn, SignInFormState } from "@/lib/actions/auth/sign-in";
import { useActionState, useEffect, useState } from "react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const initialState: SignInFormState = {
    errors: { properties: {} },
    message: "",
    success: false,
    timestamp: Date.now(),
  };
  const [state, formAction, isPending] = useActionState<
    SignInFormState,
    FormData
  >(signIn, initialState);

  useEffect(() => {
    if (!state.success && state.message) {
      toast.error(state.message, { position: "top-center" });
    }
  }, [state.success, state.message, state.timestamp]);

  const [inputType, setInputType] = useState<"text" | "password">("password");
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="w-full max-w-md bg-gray-900/60 backdrop-blur-md border border-gray-700 rounded-2xl p-8 shadow-lg">
        <Image
          src="/images/icon2.svg"
          alt="flashGen"
          className="w-12 h-12 items-center m-auto mb-2"
          width={240}
          height={240}
        />
        <h1 className="text-2xl font-bold text-center mb-6">
          Welcome Back to FlashGen
        </h1>
        <form action={formAction} className="space-y-5">
          <Field>
            <FieldLabel htmlFor="username" className="block text-sm mb-1">
              Telegram username
            </FieldLabel>
            <input
              name="username"
              id="username"
              type="text"
              defaultValue={state.inputs?.username}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none text-white placeholder:text-gray-400 autofill:text-white autofill:bg-gray-800"
              style={{
                colorScheme: "dark",
                WebkitTextFillColor: "white",
              }}
              placeholder="Enter your telegram username"
              required
            />
            {state.errors?.properties?.username && (
              <FieldError>{state.errors.properties.username[0]}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="password" className="block text-sm mb-1">
              Password
            </FieldLabel>
            <InputGroup className="px-1 py-2 rounded-lg bg-gray-800 border border-gray-700 focus-within:ring-2 focus-within:ring-indigo-500">
              <InputGroupInput
                id="password"
                name="password"
                defaultValue={state.inputs?.password}
                type={inputType}
                className="text-white placeholder:text-gray-400 bg-transparent"
                style={{
                  colorScheme: "dark",
                  WebkitTextFillColor: "white",
                }}
              />
              <InputGroupAddon align="inline-end" className="cursor-pointer">
                {inputType === "password" ? (
                  <EyeOff
                    onClick={() => setInputType("text")}
                    className="text-gray-400 hover:text-white transition"
                  />
                ) : (
                  <Eye
                    onClick={() => setInputType("password")}
                    className="text-gray-400 hover:text-white transition"
                  />
                )}
              </InputGroupAddon>
            </InputGroup>
            {state.errors?.properties?.password && (
              <FieldError>{state.errors.properties.password[0]}</FieldError>
            )}
          </Field>

          <p className="text-sm text-gray-400 text-center">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-indigo-400 hover:underline">
              Sign Up
            </Link>
          </p>
          {!isPending ? (
            <button
              type="submit"
              className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition font-semibold"
            >
              Sign In
            </button>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <Button
                disabled
                className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition font-semibold"
              >
                <Spinner />
                Signing in...
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

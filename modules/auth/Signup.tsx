"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { signUp, SignUpFormstate } from "@/lib/actions/auth/sign-up";
import { useActionState, useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export default function SignupPage() {
  const [inputType, setInputType] = useState<"text" | "password">("password");
  const [password, setPassword] = useState<string>("");
  const [confrimPassword, setConfirmPassword] = useState<string>("");
  const [passwordNotEqualError, setPasswordNotEqualError] =
    useState<boolean>(false);

  const initialState: SignUpFormstate = {
    errors: { properties: {} },
    message: "",
    success: false,
    timestamp: Date.now(),
    inputs: {},
  };
  const [state, formAction, isPending] = useActionState<
    SignUpFormstate,
    FormData
  >(signUp, initialState);

  useEffect(() => {
    if (!state.success && state.message) {
      toast.error(state.message, { position: "top-center" });
    }
  }, [state.success, state.message, state.timestamp]);

  useEffect(() => {
    if (password !== confrimPassword) setPasswordNotEqualError(true);
  }, [password, confrimPassword]);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-4">
      <div className="w-full max-w-md bg-gray-900/60 backdrop-blur-md border border-gray-700 rounded-2xl p-8 shadow-lg">
        <Image
          src="/images/icon2.svg"
          alt="flashGen"
          className="w-12 h-12 items-center m-auto mb-2"
          width={240}
          height={240}
        />
        <h1 className="text-2xl font-bold text-center mb-6">
          Create an Account
        </h1>

        <form action={formAction} className="space-y-5">
          <Field>
            <FieldLabel htmlFor="username" className="block text-sm mb-1">
              Telegram username
            </FieldLabel>
            <input
              id="username"
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none"
              name="username"
              placeholder="Enter your telegram username"
              defaultValue={state.inputs?.username}
              required
              style={{
                colorScheme: "dark",
                WebkitTextFillColor: "white",
              }}
            />
            {state.errors?.properties?.username && (
              <FieldError>{state.errors.properties.username[0]}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="email" className="block text-sm mb-1">
              Email
            </FieldLabel>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none"
              name="email"
              defaultValue={state.inputs?.email}
              required
              style={{
                colorScheme: "dark",
                WebkitTextFillColor: "white",
              }}
            />
            {state.errors?.properties?.email && (
              <FieldError>{state.errors.properties.email[0]}</FieldError>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="password" className="block text-sm mb-1">
              Password
            </FieldLabel>
            <InputGroup className=" px-1 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none">
              <InputGroupInput
                required
                id="password"
                name="password"
                defaultValue={state.inputs?.password}
                type={inputType}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  colorScheme: "dark",
                  WebkitTextFillColor: "white",
                }}
              />
              <InputGroupAddon align="inline-end" className="cursor-default">
                {inputType === "password" ? (
                  <EyeOff onClick={() => setInputType("text")} />
                ) : (
                  <Eye onClick={() => setInputType("password")} />
                )}
              </InputGroupAddon>
            </InputGroup>

            {state.errors?.properties?.password && (
              <FieldError>{state.errors.properties.password[0]}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel
              htmlFor="confirmPassword"
              className="block text-sm mb-1"
            >
              Confirm Password
            </FieldLabel>
            <InputGroup className=" px-1 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none">
              <InputGroupInput
                id="confirmPassword"
                name="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={inputType}
                defaultValue={state.inputs?.confirmPassword}
                style={{
                  colorScheme: "dark",
                  WebkitTextFillColor: "white",
                }}
                required
              />
              <InputGroupAddon align="inline-end" className="cursor-default">
                {inputType === "password" ? (
                  <EyeOff onClick={() => setInputType("text")} />
                ) : (
                  <Eye onClick={() => setInputType("password")} />
                )}
              </InputGroupAddon>
            </InputGroup>
          </Field>
          {password !== confrimPassword && passwordNotEqualError && (
            <FieldError>Password didn&apos;t match</FieldError>
          )}

          <FieldContent className="text-red-700 font-semibold text-sm">
            Warning
            <FieldDescription className="text-sm font-normal text-gray-100">
              This password can never be changed, so make sure to save it
              securely.
            </FieldDescription>
          </FieldContent>

          <div className="text-sm text-gray-400 text-center">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-indigo-400 hover:underline">
              Log In
            </Link>
          </div>

          {!isPending ? (
            <button
              type="submit"
              className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition font-semibold"
              disabled={isPending}
            >
              Sign Up
            </button>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <Button
                disabled
                className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition font-semibold"
              >
                <Spinner />
                Signing up...
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

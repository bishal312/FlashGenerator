"use client";

import React, { useEffect, useState } from "react";
import { UserSelectType } from "@/lib/db/schema";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

type Props = {
  user: UserSelectType;
};

const User = ({ user }: Props) => {
  const [showUpdatePassword, setShowUpdatePassword] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(false);
  const [passwordNotEqualError, setPasswordNotEqualError] =
    useState<boolean>(false);
  const [inputType, setInputType] = useState<"text" | "password">("password");

  useEffect(() => {
    if (newPassword !== confirmNewPassword) {
      setPasswordNotEqualError(true);
    } else {
      setPasswordNotEqualError(false);
    }
  }, [newPassword, confirmNewPassword]);

  const handleUpdatePassword = async () => {
    setIsPending(true);

    if (newPassword !== confirmNewPassword) {
      toast.error("Password didn't match", { position: "top-center" });
      setIsPending(false);
      return;
    }
    try {
      await authClient.admin.setUserPassword(
        {
          newPassword,
          userId: user.id,
        },
        {
          onSuccess: () => {
            toast.success("Password updated successfully", {
              position: "top-center",
            });
          },
          onError: ({ error }) => {
            toast.error(error.message, { position: "top-center" });
          },
        }
      );
    } catch {
    } finally {
      setShowUpdatePassword(false);
      setNewPassword("");
      setConfirmNewPassword("");
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-4 sm:mb-6">
          <Link
            href="/admin/manage-users"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-2 inline-block"
          >
            ← Back to Users
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Update User
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-md">
              {user.username?.charAt(0).toUpperCase() ||
                user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 truncate">
                {user.username || "No username"}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 truncate">
                {user.email || "No email"}
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
              <span className="text-sm text-gray-600">User ID:</span>
              <span className="text-sm font-mono text-gray-900 break-all">
                {user.id}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
              <span className="text-sm text-gray-600">Created:</span>
              <span className="text-sm text-gray-900">
                {user.createdAt?.toLocaleDateString() || "N/A"}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                Password Management
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Update the user&apos;s password securely
              </p>
            </div>
            {!showUpdatePassword ? (
              <Button
                onClick={() => setShowUpdatePassword(true)}
                className="w-full sm:w-auto whitespace-nowrap"
              >
                Update Password
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setShowUpdatePassword(false);
                  setNewPassword("");
                  setConfirmNewPassword("");
                }}
                disabled={isPending}
                variant="outline"
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
            )}
          </div>

          {showUpdatePassword && (
            <>
              <Separator className="my-4" />
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label
                    htmlFor="newPassword"
                    className="text-sm font-medium text-gray-900"
                  >
                    New Password
                  </Label>
                  <InputGroup>
                    <InputGroupInput
                      id="newPassword"
                      name="newPassword"
                      type={inputType}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      required
                    />
                    <InputGroupAddon
                      align="inline-end"
                      className="cursor-pointer"
                    >
                      {inputType === "password" ? (
                        <EyeOff onClick={() => setInputType("text")} />
                      ) : (
                        <Eye onClick={() => setInputType("password")} />
                      )}
                    </InputGroupAddon>
                  </InputGroup>
                </div>

                <Field className="space-y-2">
                  <FieldLabel
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-gray-900"
                  >
                    Confirm New Password
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id="confirmPassword"
                      name="confirmPassword"
                      type={inputType}
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="Confirm new password"
                      required
                    />
                    <InputGroupAddon
                      align="inline-end"
                      className="cursor-pointer"
                    >
                      {inputType === "password" ? (
                        <EyeOff onClick={() => setInputType("text")} />
                      ) : (
                        <Eye onClick={() => setInputType("password")} />
                      )}
                    </InputGroupAddon>
                  </InputGroup>
                  {newPassword !== confirmNewPassword &&
                    passwordNotEqualError && (
                      <FieldError>Passwords don&apos;t match</FieldError>
                    )}
                </Field>

                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={handleUpdatePassword}
                  disabled={
                    isPending ||
                    !newPassword ||
                    !confirmNewPassword ||
                    passwordNotEqualError
                  }
                >
                  {isPending ? <Spinner /> : "Update Password"}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;

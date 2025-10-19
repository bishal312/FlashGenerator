"use client";

import { UserSelectType } from "@/lib/db/schema";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
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
    }
  }, [newPassword, confirmNewPassword]);
  const handleUpdatePassword = async () => {
    setIsPending(true);

    if (newPassword !== confirmNewPassword) {
      toast.error("Password didn't match", { position: "top-center" });
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
            toast.success("Password updated successfuly", {
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
      setIsPending(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{user.username}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
          <CardAction>
            {!showUpdatePassword ? (
              <Button onClick={() => setShowUpdatePassword(true)}>
                Update Password
              </Button>
            ) : (
              <Button
                onClick={() => setShowUpdatePassword(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
            )}
          </CardAction>
        </CardHeader>
      </Card>

      {showUpdatePassword && (
        <CardContent className="pt-4 sm:pt-6">
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
                  id="password"
                  name="password"
                  type={inputType}
                  onChange={(e) => setNewPassword(e.target.value)}
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
                  id="password"
                  name="password"
                  type={inputType}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
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
            {newPassword !== confirmNewPassword && passwordNotEqualError && (
              <FieldError>Password didn&apos;t match</FieldError>
            )}
            <Separator />
            <Button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={handleUpdatePassword}
              disabled={isPending}
            >
              {isPending ? <Spinner /> : "Update Password"}
            </Button>
          </div>
        </CardContent>
      )}
    </>
  );
};

export default User;

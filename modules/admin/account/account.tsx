"use client";

import { UserSelectType } from "@/lib/db/schema";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useEffect, useState } from "react";
import {
  updateNameEmail,
  UpdateNameEmailFormState,
} from "@/lib/actions/admin/update-account/update-name-email";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { FieldError } from "@/components/ui/field";
import {
  updatePassword,
  UpdatePasswordFormstate,
} from "@/lib/actions/admin/update-account/update-password";

type Props = {
  user: UserSelectType;
};

const Account = ({ user }: Props) => {
  const [showUpdateDialog, setShowUpdateDialog] = useState<boolean>(false);
  const [showUpdatePasswordDialog, setShowUpdatePasswordDialog] =
    useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [inputType, setInputType] = useState<"text" | "password">("password");

  const profileInitialState: UpdateNameEmailFormState = {
    message: "",
    success: false,
    timestamp: Date.now(),
  };

  const [profileState, profileFormAction, updatingProfile] = useActionState<
    UpdateNameEmailFormState,
    FormData
  >(updateNameEmail, profileInitialState);

  useEffect(() => {
    if (profileState.success && profileState.message) {
      setShowUpdateDialog(false);
      toast.success(profileState.message, { position: "top-right" });
    }
    if (!profileState.success && profileState.message) {
      toast.error(profileState.message, { position: "top-right" });
    }
  }, [profileState.success, profileState.message, profileState.timestamp]);

  const passwordInitialState: UpdatePasswordFormstate = {
    message: "",
    success: false,
    timestamp: Date.now(),
  };
  const [passwordState, passwordFormAction, updatingPassword] = useActionState<
    UpdatePasswordFormstate,
    FormData
  >(updatePassword, passwordInitialState);

  useEffect(() => {
    if (passwordState.success && passwordState.message) {
      setShowUpdatePasswordDialog(false);
      toast.success(passwordState.message, { position: "top-right" });
    }
    if (!passwordState.success && passwordState.message) {
      toast.error(passwordState.message, { position: "top-right" });
    }
  }, [passwordState.success, passwordState.message, passwordState.timestamp]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-blue-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-red-500",
      "bg-indigo-500",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="min-h-screen flex flex-col w-full">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div
              className={`${getAvatarColor(
                user.name
              )} w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg`}
            >
              {getInitials(user.name)}
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              {user.name}
            </h2>
            <p className="text-slate-600 mb-1">{user.email}</p>
            <div className="inline-block bg-slate-100 text-slate-700 px-4 py-1 rounded-full text-sm font-medium mt-2">
              {user.role}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-md"
              onClick={() => setShowUpdateDialog(true)}
            >
              <User size={20} />
              Update Profile
            </button>
            <button
              className="w-full bg-white hover:bg-slate-50 text-slate-800 font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 border-2 border-slate-200"
              onClick={() => setShowUpdatePasswordDialog(true)}
            >
              <Lock size={20} />
              Update Password
            </button>
          </div>
        </div>
      </div>

      {showUpdateDialog && (
        <Dialog open={showUpdateDialog} onOpenChange={setShowUpdateDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <form action={profileFormAction} className="flex flex-col gap-4">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="name-1">Name</Label>
                  <Input
                    id="name-1"
                    name="name"
                    defaultValue={profileState.inputs?.name || user.name}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    defaultValue={profileState.inputs?.email || user.email}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" disabled={updatingProfile}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={updatingProfile}>
                  {updatingProfile ? <Spinner /> : "Save changes"}
                </Button>
              </DialogFooter>
              <input type="hidden" name="userId" value={user.id} />
            </form>
          </DialogContent>
        </Dialog>
      )}

      {showUpdatePasswordDialog && (
        <Dialog
          open={showUpdatePasswordDialog}
          onOpenChange={setShowUpdatePasswordDialog}
        >
          <DialogContent className="sm:max-w-[425px]">
            <form action={passwordFormAction} className="flex flex-col gap-4">
              <DialogHeader>
                <DialogTitle>Change Password</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="current-password">Current Password</Label>
                  <InputGroup>
                    <InputGroupInput
                      type={inputType}
                      id="current-password"
                      name="currentPassword"
                      defaultValue={passwordState.inputs?.currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                    <InputGroupAddon align="inline-end">
                      {inputType === "password" ? (
                        <EyeOff
                          onClick={() => setInputType("text")}
                          className="cursor-default"
                        />
                      ) : (
                        <Eye
                          onClick={() => setInputType("password")}
                          className="cursor-default"
                        />
                      )}
                    </InputGroupAddon>
                  </InputGroup>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="newPassword">New Password</Label>
                  <InputGroup>
                    <InputGroupInput
                      type={inputType}
                      id="newPassword"
                      name="newPassword"
                      defaultValue={passwordState.inputs?.newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <InputGroupAddon align="inline-end">
                      {inputType === "password" ? (
                        <EyeOff
                          onClick={() => setInputType("text")}
                          className="cursor-default"
                        />
                      ) : (
                        <Eye
                          onClick={() => setInputType("password")}
                          className="cursor-default"
                        />
                      )}
                    </InputGroupAddon>
                  </InputGroup>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="confirmNewPassword">
                    Confirm New Password
                  </Label>
                  <InputGroup>
                    <InputGroupInput
                      type={inputType}
                      id="confirmNewPassword"
                      name="confirmNewPassword"
                      defaultValue={passwordState.inputs?.confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                    <InputGroupAddon align="inline-end">
                      {inputType === "password" ? (
                        <EyeOff
                          onClick={() => setInputType("text")}
                          className="cursor-default"
                        />
                      ) : (
                        <Eye
                          onClick={() => setInputType("password")}
                          className="cursor-default"
                        />
                      )}
                    </InputGroupAddon>
                  </InputGroup>
                </div>
              </div>
              {passwordState.errors?.properties?.newPassword && (
                <FieldError>
                  {passwordState.errors.properties.newPassword[0]}
                </FieldError>
              )}
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" disabled={updatingPassword}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  disabled={
                    !currentPassword.trim() ||
                    !newPassword.trim() ||
                    !confirmNewPassword.trim() ||
                    newPassword.trim() !== confirmNewPassword.trim() ||
                    updatingPassword
                  }
                >
                  {updatingPassword ? <Spinner /> : "Save changes"}
                </Button>
              </DialogFooter>

              <input type="hidden" name="userId" value={user.id} />
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Account;

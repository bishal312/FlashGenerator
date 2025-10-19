import { UserSelectType } from "@/lib/db/schema";
import React from "react";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  users: UserSelectType[];
};

const Users = ({ users }: Props) => {
  return (
    <div className="flex gap-2 flex-col flex-wrap w-full">
      {users.map((user) => (
        <Card key={user.id}>
          <CardHeader>
            <CardTitle>{user.username}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
            <CardAction>
              <Button asChild variant="outline">
                <Link href={`/admin/update-user/${user.id}`}>Update User</Link>
              </Button>
            </CardAction>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default Users;

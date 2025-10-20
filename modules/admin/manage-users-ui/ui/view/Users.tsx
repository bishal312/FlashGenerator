import React from "react";
import { UserSelectType } from "@/lib/db/schema";

import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  users: UserSelectType[];
};

const Users = ({ users }: Props) => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Users</h1>
          <p className="text-gray-600">
            Manage all registered users ({users.length} total)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 p-6"
            >
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
                <div className="w-14 h-14 flex-shrink-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                  {user.username?.charAt(0).toUpperCase() ||
                    user.email?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate mb-1">
                    {user.username || "No username"}
                  </h3>
                  <p className="text-sm text-gray-600 truncate">
                    {user.email || "No email"}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-1">User ID</p>
                <p className="text-sm font-mono text-gray-700 break-all">
                  {user.id}
                </p>
              </div>

              <Button asChild variant="outline" className="w-full">
                <Link href={`/admin/update-user/${user.id}`}>Update User</Link>
              </Button>
            </div>
          ))}
        </div>

        {users.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              No users found
            </h3>
            <p className="text-gray-600">
              There are no users registered in the system yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;

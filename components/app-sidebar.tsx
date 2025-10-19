"use client";

import * as React from "react";
import {
  BookAIcon,
  GalleryVerticalEnd,
  PenIcon,
  User2Icon,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { Skeleton } from "./ui/skeleton";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Manage Users",
      url: "/admin/manage-users",
      icon: User2Icon,
      isActive: true,
    },
    {
      title: "Update Deposit Info",
      url: "/admin/update-deposit-info",
      icon: PenIcon,
      isActive: true,
    },
    {
      title: " Create FAQ ",
      url: "/admin/create-faq",
      icon: BookAIcon,
      isActive: true,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, isPending } = authClient.useSession();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>
        {isPending ? (
          <div className="flex items-center space-x-4">
            <Skeleton className="w-full h-full rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ) : (
          session && (
            <NavUser
              user={{
                name: session.user.name,
                email: session.user.email,
              }}
            />
          )
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

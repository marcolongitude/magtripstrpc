"use client";

import {
  Bell,
  Bookmark,
  Home,
  List,
  LucideIcon,
  Mail,
  MoreHorizontal,
  User,
  Users,
} from "lucide-react";
import { SidebarDesktop } from "./sidebar-desktop";
import { SidebarButton } from "./sidebar-button";
import { useMediaQuery } from "usehooks-ts";
import { SidebarMobile } from "./sidebar-mobile";
import { ReactNode } from "react";

export interface SidebarItems {
  links: Array<{
    label: string;
    href: string;
    icon?: LucideIcon;
  }>;
  extras?: ReactNode;
}

const sidebarItems: SidebarItems = {
  links: [
    { label: "Home", href: "/", icon: Home },
    { label: "Notifications", href: "/item/notifications", icon: Bell },
    { label: "Messages", href: "/item/messages", icon: Mail },
    {
      href: "/dashboard/users",
      icon: Users,
      label: "Usuários",
    },
    {
      href: "/item/bookmarks",
      icon: Bookmark,
      label: "Bookmarks",
    },
    {
      href: "/dashboard/travelers",
      icon: Users,
      label: "Viajantes",
    },
    {
      href: "/item/profile",
      icon: User,
      label: "Profile",
    },
  ],
  extras: (
    <div className="flex flex-col gap-2">
      <SidebarButton icon={MoreHorizontal} className="w-full">
        More
      </SidebarButton>
      <SidebarButton
        className="w-full justify-center text-white"
        variant="default"
      >
        Tweet
      </SidebarButton>
    </div>
  ),
};

export function Sidebar() {
  const isDesktop = useMediaQuery("(min-width: 640px)", {
    initializeWithValue: false,
  });

  if (isDesktop) {
    return <SidebarDesktop sidebarItems={sidebarItems} />;
  }

  return <SidebarMobile sidebarItems={sidebarItems} />;
}

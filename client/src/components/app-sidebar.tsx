"use client";

import * as React from "react";
import {
  Archive,
  ChartPie,
  ClipboardList,
  IndianRupee,
  Settings2,
  UserRound,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: ChartPie,
      isActive: true,
    },
    {
      title: "Inventory",
      url: "#",
      icon: Archive,
    },
    {
      title: "Products",
      url: "#",
      icon: ClipboardList,
    },
    {
      title: "Users",
      url: "#",
      icon: UserRound,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
    {
      title: "Expenses",
      url: "#",
      icon: IndianRupee,
    },
    ,
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="py-4">
        <div className="flex size-12 items-center justify-center rounded-lg text-sidebar-primary-foreground">
          {/* <Fan className="size-4" /> */}
          <Image
            src="/invdash.png"
            alt="logo"
            width={80}
            height={80}
            className="rounded-sm border-2 border-primary"
          />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          {/* <span className="truncate font-semibold">InvDash</span> */}
          <h1 className="font-bold text-xl">
            <span className="text-primary">I</span>nv
            <span className="text-primary">D</span>ash
          </h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

"use client";

import * as React from "react";
import {
  Archive,
  AudioWaveform,
  BookOpen,
  Bot,
  ChartPie,
  ClipboardList,
  Command,
  Fan,
  GalleryVerticalEnd,
  Grid2x2,
  IndianRupee,
  Settings2,
  ShoppingBag,
  SquareTerminal,
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
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <Fan className="size-4" />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          {/* <span className="truncate font-semibold">InvDash</span> */}
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

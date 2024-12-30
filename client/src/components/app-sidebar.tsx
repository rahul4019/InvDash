"use client";

import * as React from "react";
import {
  Archive,
  PieChartIcon as ChartPie,
  ClipboardList,
  IndianRupee,
  Settings2,
  UserRound,
} from "lucide-react";
import Image from "next/image";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

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
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="py-4">
        <div className="flex items-center gap-4">
          <div className="flex size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground shrink-0">
            <Image
              src="/invdash.png"
              alt="logo"
              width={80}
              height={80}
              className="rounded-sm border-2 border-primary"
            />
          </div>
          {state === "expanded" && (
            <div className="grid flex-1 text-left text-sm leading-tight overflow-hidden">
              <h1 className="font-bold text-xl whitespace-nowrap">
                <span className="text-primary">I</span>nv
                <span className="text-primary">D</span>ash
              </h1>
            </div>
          )}
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

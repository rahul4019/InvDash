import React from "react";
import { ModeToggle } from "./theme-toggle";
import { Bell, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavSearch from "./NavSearch";

function Navbar() {
  return (
    <div className="flex items-center flex-1 justify-between px-4">
      <NavSearch />
      <div className="flex gap-4 items-center">
        <ModeToggle />
        <Bell size={20} />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Settings size={20} />
      </div>
    </div>
  );
}

export default Navbar;

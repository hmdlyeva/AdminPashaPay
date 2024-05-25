"use client";
import React, { useState } from "react";
import { Nav } from "./ui/nav";
import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  MessagesSquare,
  Search,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
  SquareActivity,
  Settings2,
  LucidePhoneCall,
  LucideMoreVertical,
  MapPin,
  LogOut,
  UsersRound,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Button } from "./ui/button";
import { useWindowWidth } from "@react-hook/window-size";
type Props = {};

export default function SideNavbar({}: Props) {
  const [isCollapsed, setisCollapsed] = useState(false);
  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 1100;
  function toggleSidebar() {
    setisCollapsed(!isCollapsed);
  }

  return (
    <div className="relative min-w-[80px] border-r px-3 pb-10 pt-24">
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className="rounded-full p-2"
          >
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Dashboard",
            label: "",
            icon: SquareActivity,
            variant: "default",
            href: "/",
          },
          {
            title: "Location",
            label: "",
            icon: MapPin,
            variant: "ghost",
            href: "/location",
          },
          {
            title: "Volunteer",
            label: "",
            icon: UsersRound,
            variant: "ghost",
            href: "/volunteer",
          },
          {
            title: "Settings",
            label: "",
            icon: Settings2,
            variant: "ghost",
            href: "/settings",
          },
          {
            title: "Log Out",
            label: "",
            icon: LogOut,
            variant: "ghost",
            href: "/login",
          },
        ]}
      />
    </div>
  );
}

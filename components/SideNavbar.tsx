"use client";
import React, { useState } from "react";
import { Nav } from "./ui/nav";
import {
  SquareActivity,
  Settings2,
  MapPin,
  LogOut,
  UsersRound,
  ChevronRight,
  ChevronLeft,
  LogIn,
  UserRound,
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
    <div
      className="relative min-w-[80px] border-r px-3 pb-10 pt-24">
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
            title: "TeamLeaders",
            label: "",
            icon: UserRound,
            variant: "ghost",
            href: "/teamleader",
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

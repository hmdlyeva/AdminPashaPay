"use client";
import React, { useState } from "react";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import PageTitle from "@/components/PageTitle";
import { SunMoon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

type Props = {};

export default function SettingsPage({}: Props) {
  const { theme, setTheme } = useTheme();
  const [ThemeMode, setThemeMode] = useState(theme);

  function toggleThemeMode() {
    const newTheme = ThemeMode === "light" ? "dark" : "light";
    setThemeMode(newTheme);
    setTheme(newTheme);
  }

  const [allData, setAllData] = useState<Setting[]>(data);

  const columns: ColumnDef<Setting>[] = [
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "value",
      header: "Value",
    },
    {
      accessorKey: "icon",
      header: "Icon",
      cell: ({ row }) => {
        const icon = row.getValue("icon");
        if (typeof icon === "string") {
          return (
            <Button className="p-2 size-9 rounded-xl bg-opacity-40 hover:bg-gray-300 hover:text-[#14234B]">
              {icon}
            </Button>
          );
        } else if (React.isValidElement(icon)) {
          return (
            <Button onClick={toggleThemeMode} className="p-2 size-9 rounded-xl bg-opacity-40 hover:bg-gray-300 hover:text-[#14234B]">
              {icon}
            </Button>
          );
        } else {
          return null;
        }
      },
    },
  ];

  return (
    <div className="flex flex-col gap-5 w-full ">
      <PageTitle title="Settings" />
      <DataTable columns={columns} data={allData} pageName="settings" />
    </div>
  );
}

export interface Setting {
  category: string;
  value: string | number | boolean;
  icon?: string | React.ReactNode;
}

const data: Setting[] = [
  {
    category: "Account",
    value: true,
  },
  {
    category: "Notification",
    value: false,
  },
  {
    category: "Language",
    value: "English",
  },
  {
    category: "Theme",
    value: "Dark",
    icon: <SunMoon />,
  },
];

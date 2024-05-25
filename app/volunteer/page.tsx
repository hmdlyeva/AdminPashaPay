"use client";
import React, { useState } from "react";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import PageTitle from "@/components/PageTitle";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Button } from "@/components/ui/button";
import { LucideIcon, UserRoundMinus } from "lucide-react";

type Props = {};

export default function VolunteerPage({}: Props) {

    
  const [allData, setAllData] = useState<Payment[]>(data);

  const handleDelete = (id: string) => {
    setAllData((prevData) => prevData.filter((row) => row.id !== id));
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Volunteers" />
      <DataTable columns={columns(handleDelete)} data={allData} />
    </div>
  );
}

export const columns = (
  handleDelete: (id: string) => void
): ColumnDef<Payment>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        {...{
          checked: table.getIsAllPageRowsSelected(),
          indeterminate: table.getIsSomePageRowsSelected(),
          onChange: table.getToggleAllPageRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        {...{
          checked: row.getIsSelected(),
          disabled: !row.getCanSelect(),
          onChange: row.getToggleSelectedHandler(),
        }}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "User",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <img
            className="h-10 w-10"
            src={`https://api.dicebear.com/8.x/lorelei/svg?seed=${row.getValue(
              "name"
            )}`}
            alt="user-image"
          />
          <p className="text-ellipsis overflow-hidden">{row.getValue("name")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      const colorClass =
        status === "pending"
          ? "text-blue-500 hover:bg-blue-100 bg-blue-100"
          : status === "processing"
          ? "text-yellow-500 hover:bg-yellow-100 bg-yellow-100"
          : status === "success"
          ? "text-green-600 hover:bg-green-100 bg-green-100"
          : "text-red-600 hover:bg-red-100 bg-red-100";

      return (
        <Button
          className={`w-20 px-14 rounded-full bg-opacity-5 ${colorClass}`}
        >
          {row.getValue("status")}
        </Button>
      );
    },
  },
  {
    accessorKey: "delete",
    header: "Remove",
    cell: ({ row }) => (
      <Button
        className="p-2 size-9 rounded-xl bg-opacity-40 bg-gray-100  hover:bg-red-100"
        onClick={() => handleDelete(row.original.id)}
      >
        <UserRoundMinus color={"#FF8F8F"} />
      </Button>
    ),
  },
];

export type Payment = {
  id: string;
  name: string;
  createdAt: string;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

const data: Payment[] = [
  {
    id: "m5gr84i9",
    name: "John Doe",
    createdAt: "2024-01-01",
    status: "pending",
    email: "john@yahoo.com",
  },
  {
    id: "3u1reuv4",
    name: "Alice Smith",
    createdAt: "2024-02-15",
    status: "success",
    email: "alice@gmail.com",
  },
  {
    id: "derv1ws0",
    name: "Bob Johnson",
    createdAt: "2024-03-20",
    status: "processing",
    email: "bob@gmail.com",
  },
  {
    id: "5kma53ae",
    name: "Emma Brown",
    createdAt: "2024-05-09",
    status: "success",
    email: "emma@gmail.com",
  },
  {
    id: "bhqecj4p",
    name: "Michael Davis",
    createdAt: "2024-05-23",
    status: "failed",
    email: "michael@hotmail.com",
  },

  {
    id: "n4hr37b6",
    name: "Hensy Rock",
    createdAt: "2024-05-24",
    status: "success",
    email: "hensy@gmail.com",
  },
];

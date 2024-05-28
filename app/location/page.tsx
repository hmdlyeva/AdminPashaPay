"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import PageTitle from "@/components/PageTitle";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Button } from "@/components/ui/button";
import { UserRoundMinus, X } from "lucide-react";
import type { RootState } from "../../redux/store/store";
import { useSelector, useDispatch } from "react-redux";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import {
  Location,
  delLocData,
  getLocData,
} from "@/redux/slice/locations/locations";
import { AppDispatch } from "../../redux/store/store";
import PutDataSheet from "@/components/PutDataSheet";
type Props = {};

export default function LocationPage({}: Props) {
  const { toast } = useToast();
  const locationsData = useSelector(
    (state: RootState) => state.locations.locations
  );
  const dispatch: AppDispatch = useDispatch();
  const [selectedId, setSelectedId] = useState<number>(0);
  const [allData, setAllData] = useState<Location[]>(locationsData);

  useEffect(() => {
    dispatch(getLocData());
  }, [dispatch]);

  useEffect(() => {
    setAllData(locationsData);
  }, [locationsData]);

  const handleDelete = (id: number) => {
    dispatch(delLocData(id)).then(() => {
      setAllData(locationsData.filter((row) => row.id !== id));
    });
  };

  const handleEditClick = (id: number) => {
    setSelectedId(id);
  };

  const columns: ColumnDef<Location>[] = [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <Checkbox
    //       {...{
    //         checked: table.getIsAllPageRowsSelected(),
    //         indeterminate: table.getIsSomePageRowsSelected(),
    //         onChange: table.getToggleAllPageRowsSelectedHandler(),
    //       }}
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       {...{
    //         checked: row.getIsSelected(),
    //         disabled: !row.getCanSelect(),
    //         onChange: row.getToggleSelectedHandler(),
    //       }}
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      accessorKey: "district",
      header: "District",
      cell: ({ row }) => {
        return (
          <div className="flex gap-2 items-center">
            <img
              className="h-10 w-10"
              src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${row.getValue(
                "district"
              )}`}
              alt="location-image"
            />
            <p className="text-ellipsis overflow-hidden">
              {row.getValue("district")}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "subway",
      header: "Subway",
    },
    {
      accessorKey: "target",
      header: "Target",
    },
    {
      accessorKey: "market",
      header: "Market",
    },
    {
      accessorKey: "desc",
      header: "Description",
    },
    {
      accessorKey: "capacity",
      header: "Capacity",
      cell: ({ row }) => {
        const Text = ({ children, className }: any) => {
          return <span className={className}>{children}</span>;
        };
        const capacity: number = row.getValue("capacity");
        const colorClass =
          capacity < 25
            ? "text-green-600"
            : capacity < 50
            ? "text-yellow-600"
            : "text-red-600";

        return (
          <Text
            className={`w-20 px-14 rounded-full bg-opacity-5 ${colorClass}`}
          >
            {capacity}
          </Text>
        );
      },
    },
    {
      accessorKey: "edit",
      header: "Edit",
      cell: ({ row }) => (
        <Button
          className="bg-transparent hover:bg-transparent"
          onClick={() => handleEditClick(row.original.id)}
        >
          <PutDataSheet pageName="location" id={selectedId} />
        </Button>
      ),
    },
    {
      accessorKey: "delete",
      header: "Remove",
      cell: ({ row }) => (
        <Button
          className="p-2 size-9 rounded-xl bg-opacity-40 bg-gray-100  hover:bg-red-100"
          onClick={() => {
            toast({
              variant: "destructive",
              title: "The Location deleting!",
              description: "Say goodbaye this data.",
              action: <ToastAction altText="Deleting">Deleting</ToastAction>,
            });
            handleDelete(row.original.id);
          }}
        >
          <X color={"#FF8F8F"} />
        </Button>
      ),
    },
  ];
  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Locations" />
      <DataTable columns={columns} data={allData} pageName="location" />
    </div>
  );
}

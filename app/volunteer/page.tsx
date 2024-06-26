"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import PageTitle from "@/components/PageTitle";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Button } from "@/components/ui/button";
import { UserRoundMinus } from "lucide-react";
import type { RootState } from "../../redux/store/store";
import { useSelector, useDispatch } from "react-redux";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Volunteer,
  delData,
  getData,
} from "@/redux/slice/volunteers/volunteers";
import { AppDispatch } from "../../redux/store/store";
import PutDataSheet from "@/components/PutDataSheet";
import VolunteerImageDialog from "@/components/VolunteerImageDialog";
type Props = {};

export default function VolunteerPage({}: Props) {
  
  const { toast } = useToast();
  const [selectedId, setSelectedId] = useState<number>(0);
  const [selectedIdForImage, setSelectedIdForImage] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const volunteersData = useSelector(
    (state: RootState) => state.volunteers.volunteers
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const handleEditClick = (id: number) => {
    setSelectedId(id);
  };
  const imageDialogClick = (id: number) => {
    setSelectedIdForImage(id);
    setIsDialogOpen(true);
  };

  const [updatedData, setVolunteersData] = useState<Volunteer[]>({
    ...volunteersData,
  });

  useEffect(() => {
    setVolunteersData(volunteersData);
  }, [volunteersData]);

  const handleDelete = (id: number) => {
    dispatch(delData(id)).then(() => {
      const updatednewData = updatedData.filter((row) => row.id !== id);
      setVolunteersData(updatednewData);
    });

    toast({
      variant: "destructive",
      title: "The Volunteer deleting!",
      description: "Say goodbye to this data.",
      action: <ToastAction altText="Deleting">Deleting</ToastAction>,
    });
  };

  const columns: ColumnDef<Volunteer>[] = [
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
      accessorKey: "name",
      header: "User",
      cell: ({ row }) => {
        return (
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage
                src={`https://api.dicebear.com/8.x/lorelei/svg?seed=${row.getValue(
                  "name"
                )}`}
                alt="user-image"
                onClick={() => {
                  imageDialogClick(row.original.id);
                }}
              />
            </Avatar>
            <p className="text-ellipsis overflow-hidden">
              {row.getValue("name")}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "surname",
      header: "Surname",
    },
    // createdAt lazimdi
    // {
    //   accessorKey: "createdAt",
    //   header: "Created",
    // },
    {
      accessorKey: "finCode",
      header: "Fin Code",
    },

    {
      accessorKey: "formStatus",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("formStatus");
        const colorClass = status
          ? "text-green-600 hover:bg-green-100 bg-green-100"
          : "text-red-600 hover:bg-red-100 bg-red-100";

        return (
          <Button
            className={`w-20 px-14 rounded-full bg-opacity-5 ${colorClass}`}
          >
            {status ? "Active" : "Inactive"}
          </Button>
        );
      },
    },
    {
      accessorKey: "edit",
      header: "Edit",
      cell: ({ row }) => (
        // <Button
        //   className="bg-transparent hover:bg-transparent"
        //   onClick={() => handleEditClick(row.original.id)}
        // >
          <PutDataSheet allData={updatedData} setAllData={setVolunteersData} pageName="volunteer" id={row.original.id} />
        // </Button>
      ),
    },
    {
      accessorKey: "delete",
      header: "Remove",
      cell: ({ row }) => (
        <Button
          className="p-2 size-9 rounded-xl bg-opacity-40 bg-gray-100  hover:bg-red-100"
          onClick={() => {
            handleDelete(row.original.id);
          }}
        >
          <UserRoundMinus color={"#FF8F8F"} />
        </Button>
      ),
    },
  ];
  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Volunteers" />
      <DataTable columns={columns} data={updatedData} pageName="volunteer" />
      {selectedIdForImage && <VolunteerImageDialog id={selectedIdForImage}  isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}/>}
    </div>
  );
}

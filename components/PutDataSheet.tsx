"use client";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LocationForm } from "./LocationForm";
import { AppDispatch, RootState } from "@/redux/store/store";
import { getLocDataById, putLocData } from "@/redux/slice/locations/locations";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "./ui/use-toast";
import { PutLocationForm } from "./PutLocationForm";
import { PutVolunteerForm } from "./PutVolunteerForm";
import { getDataById } from "@/redux/slice/volunteers/volunteers";
type Props = {
  id: number;
  pageName: string;
};

export default function PutDataSheet({ id, pageName }: Props) {
  const [titlePageName, setTitlePageName] = useState("");
  useEffect(() => {
    if (pageName) {
      const formattedTitle = pageName[0].toUpperCase() + pageName.slice(1);
      setTitlePageName(formattedTitle);
    }
  }, [pageName]);

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (pageName === "location" && id) {
      dispatch(getLocDataById(id));
    } else if (id) {
      dispatch(getDataById(id));
    }
  }, [dispatch, id, pageName]);

  const location = useSelector((state: RootState) =>
    state.locations.locations.find((loc) => loc.id === id)
  );

  const volunteer = useSelector((state: RootState) =>
    state.volunteers.volunteers.find((vol) => vol.id === id)
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="px-3 hover:text-white text-[#00C49F] bg-opacity-40 bg-gray-100  hover:bg-[#00C49F]"
          variant="outline"
        >
          Edit
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit {titlePageName}</SheetTitle>
          <SheetDescription>
            Make changes to {pageName}&apos;s data here.{" "}
          </SheetDescription>
        </SheetHeader>

        {pageName === "location" ? (
          <PutLocationForm datam={location} idim={id} />
        ) : (
          <PutVolunteerForm datam={volunteer} idim={id} />
        )}
      </SheetContent>
    </Sheet>
  );
}

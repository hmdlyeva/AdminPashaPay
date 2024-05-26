import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { VolunteerForm } from "./VolunteerForm";
import { LocationForm } from "./LocationForm";

type Props = {
  pageName?: string;
  title?: string;
};

export function DrawerNewData({ pageName, title }: Props) {
  console.log("DrawerNewData received pageName:", pageName);
  console.log("DrawerNewData received title:", title);
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          style={{
            boxShadow: "2px 2px 1px rgba(20, 35, 75, 0.5)",
            display: pageName === "settings" ? "none" : "",
          }}
          variant="outline"
          className="ml-auto"
        >
          {" "}
          <Plus className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Create New {title}</DrawerTitle>
            <DrawerDescription>
              post a new {title} to the data.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            {pageName === "volunteer" ? (
              <VolunteerForm />
            ) : pageName === "location" ? (
              <LocationForm />
            ) : (
              ""
            )}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

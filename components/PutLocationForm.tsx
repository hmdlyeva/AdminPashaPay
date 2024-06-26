"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { Location, putLocData } from "@/redux/slice/locations/locations";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  desc: z.string().min(2, {
    message: "desc must be at least 3 characters.",
  }),
  target: z.string().min(2, {
    message: "target must be at least 2 characters.",
  }),
  district: z.string().min(2, {
    message: "district must be at least 2 characters.",
  }),
  market: z.string().min(2, {
    message: "market Number must be 10 numbers.",
  }),
  subway: z.string().min(2, {
    message: "subway  must be 7 characters.",
  }),
  capacity: z.number().min(0, {
    message: "Capacity must be at least 0.",
  }),
});

type Props = {
  datam: Location | any;
  idim?: number | any;
  setAllData: React.Dispatch<React.SetStateAction<Location[]>>;
  allData: Location[];
};

export function PutLocationForm({ datam, idim, setAllData, allData }: Props) {
  const { toast } = useToast();

  const [capacityMount, setCapacityMount] = useState(datam?.capacity || 0);
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...datam,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const formattedData = {
      ...data,
      capacity: capacityMount,
    };

    dispatch(
      putLocData({
        id: idim,
        newp: formattedData,
      })
    ).then(() => {
      const updatedAllData = allData.map((row) =>
        row.id === idim ? { ...row, ...formattedData } : row
      );
      setAllData(updatedAllData);
    });
    // toast({
    //   title: "Success",
    //   description: "Location data updated successfully",
    // });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-3 transition-all">
          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem>
                <FormLabel>District</FormLabel>
                <FormControl>
                  <Input
                    placeholder={datam ? `${datam.district}` : "district"}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subway"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subway</FormLabel>
                <FormControl>
                  <Input
                    placeholder={datam ? `${datam.subway}` : "subway"}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-3 transition-all">
          <FormField
            control={form.control}
            name="target"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target</FormLabel>
                <FormControl>
                  <Input
                    placeholder={datam ? `${datam.target}` : "target"}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="market"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Market</FormLabel>
                <FormControl>
                  <Input
                    placeholder={datam ? `${datam.market}` : "market"}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-3 transition-all">
          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder={datam ? `${datam.desc}` : "description"}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capacity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder={datam ? `${datam.capacity}` : "capacity"}
                    {...field}
                    value={capacityMount}
                    onChange={(e) => {
                      setCapacityMount(parseInt(e.target.value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className="bg-[#00C49F] hover:bg-[#FF8042] w-full"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}

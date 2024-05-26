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
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import {
  Location,
  postLocData,
  putLocData,
} from "@/redux/slice/locations/locations";

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

export function LocationForm() {
  const { toast } = useToast();

  const [capacityMount, setCapacityMount] = useState(0);
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      desc: "",
      target: "",
      district: "",
      market: "",
      subway: "",
      capacity: 0,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const formattedData = {
      ...data,
      capacity: capacityMount,
    };

    dispatch(postLocData({ ...formattedData }));
    toast({
      variant: "default",
      title: "New Location's data created successfully.",
      description: "This location will be better then others huh.",
      action: <ToastAction altText="Creating">Creating</ToastAction>,
    });
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
                  <Input placeholder="district" {...field} />
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
                  <Input placeholder="subway" {...field} />
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
                  <Input placeholder="target" {...field} />
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
                  <Input placeholder="market" {...field} />
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
                  <Input placeholder="description" {...field} />
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
                    placeholder="capacity"
                    {...field}
                    value={capacityMount}
                    onChange={(e) => {
                      console.log(e.target.value);
                      console.log(typeof e.target.value);
                      setCapacityMount(parseInt(e.target.value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}

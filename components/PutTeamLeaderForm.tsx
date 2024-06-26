"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Calendar } from "@/components/ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";

import { Input } from "@/components/ui/input";
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import {
  Teamleader,
  putTeamleader,
} from "@/redux/slice/teamleader/teamleaders";
type Props = {
  datam: Teamleader | any;
  idim?: number | any;
  setAllData: React.Dispatch<React.SetStateAction<Teamleader[]>>;
  allData: Teamleader[];
};
const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 3 characters.",
  }),
  surname: z.string().min(2, {
    message: "surname must be at least 2 characters.",
  }),
  username: z.string().min(2, {
    message: "username must be at least 2 characters.",
  }),
  phoneNumber: z.string().min(10, {
    message: "phone Number must be 10 numbers.",
  }),
});

export function PutTeamLeaderForm({ datam, idim, setAllData, allData }: Props) {
  const { toast } = useToast();
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
      password: datam.password,
    };
    dispatch(
      putTeamleader({
        id: idim,
        newp: formattedData,
      })
    ).then(() => {
      const updatedAllData = allData.map((row) =>
        row.id === idim ? { ...row, ...formattedData } : row
      );
      setAllData(updatedAllData);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-3 transition-all">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder={datam ? `${datam.name}` : "name"}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Surname</FormLabel>
                <FormControl>
                  <Input
                    placeholder={datam ? `${datam.surname}` : "surname"}
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder={datam ? `${datam.username}` : "username"}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder={
                      datam ? `${datam.phoneNumber}` : "phone number"
                    }
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        /> */}
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

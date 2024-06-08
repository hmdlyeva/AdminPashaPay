"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  FormDescription,
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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { postData } from "@/redux/slice/volunteers/volunteers";
import {
  Teamleader,
  getTeamLeader,
  postTeamleader,
} from "@/redux/slice/teamleader/teamleaders";

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
  password: z.string().min(2, {
    message: "username must be at least 2 characters.",
  }),
});

export function TeamLeaderForm() {
  const { toast } = useToast();

  const dispatch = useDispatch<AppDispatch>();

  const teamLeadersData = useSelector(
    (state: RootState) => state.teamleaders.teamleaders
  );

  console.log(teamLeadersData);

  useEffect(() => {
    dispatch(getTeamLeader());
  }, [dispatch]);

  const [updatedTeamData, setTeamleadersData] = useState<Teamleader[]>({
    ...teamLeadersData,
  });

  useEffect(() => {
    if (Array.isArray(teamLeadersData)) {
      setTeamleadersData(teamLeadersData);
    } else {
      setTeamleadersData([]);
    }
  }, [teamLeadersData]);

  console.log(updatedTeamData);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      username: "",
      phoneNumber: "",
      password: "",
     
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    const formattedData = {
      ...data,
    };

    console.log(formattedData);
    dispatch(
      postTeamleader({
        ...formattedData,
        // createdAt: new Date().toISOString(),
      })
    );

    toast({
      variant: "default",
      title: "New TeamLeader's data created successfully.",
      description: "This teamleader will be better then others huh.",
      action: <ToastAction altText="Creating">Creating</ToastAction>,
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
                  <Input placeholder="name" {...field} />
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
                  <Input placeholder="surname" {...field} />
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
                  <Input placeholder="username" {...field} />
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
                  <Input placeholder="phone Number" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
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
        />
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

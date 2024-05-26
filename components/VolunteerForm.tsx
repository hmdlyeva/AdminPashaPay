"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
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
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { postData } from "@/redux/slice/volunteers/volunteers";

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
  finCode: z.string().min(7, {
    message: "finCode  must be 7 characters.",
  }),
  university: z.string().min(2, {
    message: "university must be at least 3 characters.",
  }),
  address: z.string().min(2, {
    message: "address must be at least 3 characters.",
  }),
  password: z.string().min(2, {
    message: "username must be at least 2 characters.",
  }),

  dateOfBirth: z.date({
    required_error: "A date of birth is required.",
  }),
  dateOfEmployment: z.date({
    required_error: "A date of birth is required.",
  }),
  dateOfResignation: z.date({
    required_error: "A date of birth is required.",
  }),
});

export function VolunteerForm() {
  const { toast } = useToast();

  const dispatch = useDispatch<AppDispatch>();
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      username: "",
      phoneNumber: "",
      finCode: "",
      university: "",
      address: "",
      password: "",
      dateOfBirth: new Date(),
      dateOfEmployment: new Date(),
      dateOfResignation: new Date(),
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    const formattedData = {
      ...data,
      dateOfBirth: format(data.dateOfBirth, "yyyy-MM-dd"),
      dateOfEmployment: format(data.dateOfEmployment, "yyyy-MM-dd"),
      dateOfResignation: format(data.dateOfResignation, "yyyy-MM-dd"),
    };

    console.log(formattedData);
    dispatch(
      postData({
        ...formattedData,
        createdAt: new Date().toISOString(),
        formStatus: true,
        userId: 0,
      })
    );

    toast({
      variant: "default",
      title: "New Volunteer's data created successfully.",
      description: "This volunteer will be better then others huh.",
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
          name="finCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>FinCode</FormLabel>
              <InputOTP
                value={field.value}
                onChange={(newValue) => field.onChange(newValue)}
                maxLength={7}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                  <InputOTPSlot index={6} />
                </InputOTPGroup>
              </InputOTP>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-3 transition-all">
          <FormField
            control={form.control}
            name="university"
            render={({ field }) => (
              <FormItem>
                <FormLabel>University</FormLabel>
                <FormControl>
                  <Input placeholder="university" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="address" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

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
        <Button className="w-full" type="submit" 
>
          Submit
        </Button>
      </form>
    </Form>
  );
}
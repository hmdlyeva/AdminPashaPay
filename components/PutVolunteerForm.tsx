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
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import {
  Volunteer,
  postData,
  putData,
} from "@/redux/slice/volunteers/volunteers";
type Props = {
  datam: Volunteer | any;
  idim?: number | any;
  setAllData: React.Dispatch<React.SetStateAction<Volunteer[]>>;
  allData: Volunteer[];
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
  finCode: z.string().min(7, {
    message: "finCode  must be 7 characters.",
  }),
  university: z.string().min(2, {
    message: "university must be at least 3 characters.",
  }),
  address: z.string().min(2, {
    message: "address must be at least 3 characters.",
  }),
  teamLeaderId: z.number({
    message: "A teamLeaderId is required.",
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

export function PutVolunteerForm({ datam, idim, setAllData, allData }: Props) {
  const { toast } = useToast();
  const [imageSrc, setImageSrc] = useState<string | any>(null);

  const dispatch = useDispatch<AppDispatch>();
console.log("datam put volunter:", datam)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...datam,
      // password: "password yoxdu",
      // dateOfResignation: "yyyy-MM-dd",
      // dateOfResignation: datam.dateOfResignation
      //   ? new Date(datam.dateOfResignation)
      //   : "",

      dateOfBirth: datam ? new Date(datam.dateOfBirth) : new Date(),
      dateOfEmployment: datam ? new Date(datam.dateOfEmployment) : new Date(),
      dateOfResignation: datam ? new Date(datam.dateOfResignation) : new Date(),
    },
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    const formattedData = {
      ...data,
      teamLeaderId: datam.teamLeaderId,
      password: datam.password,
      dateOfBirth: format(data.dateOfBirth, "yyyy-MM-dd"),
      dateOfEmployment: format(data.dateOfEmployment, "yyyy-MM-dd"),
      dateOfResignation: format(data.dateOfResignation, "yyyy-MM-dd"),
      formStatus: datam.formStatus,
      profileImage: imageSrc,
    };
    dispatch(
      putData({
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-3 transition-all">
          <FormField
            name="profileImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </FormControl>
                {imageSrc && (
                  <img
                    src={imageSrc}
                    alt="Preview"
                    className="mt-2 h-20 rounded-md shadow-sm"
                  />
                )}
                <FormMessage />
              </FormItem>
            )}
          />
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

        <FormField
          control={form.control}
          name="finCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>FinCode</FormLabel>
              <InputOTP
                placeholder={datam ? `${datam.finCode}` : ""}
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
                  <Input
                    placeholder={datam ? `${datam.university}` : "university"}
                    {...field}
                  />
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
                  <Input
                    placeholder={datam ? `${datam.address}` : "address"}
                    {...field}
                  />
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
                    // defaultMonth={ datam ? `${datam.dateOfBirth}` : ""}
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

"use client";

import { CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import useSupabaseBrowser from "@/utils/client";
import { useState } from "react";
import { getSectionsByGrade } from "@/queries/getSectionsByGrade";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const formSchema = z
  .object({
    lrn: z
      .string()
      .min(12)
      .max(12)
      .refine(
        (v) => {
          let n = Number(v);
          return !isNaN(n) && v?.length > 0;
        },
        { message: "Must be a number" }
      ),
    firstname: z.string().trim().min(1).max(50),
    middlename: z.string().trim().max(50).optional(),
    lastname: z.string().min(1).max(50),
    email: z.string().trim().email(),
    password: z
      .string()
      .trim()
      .min(8)
      .regex(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
    confirmp: z
      .string()
      .trim()
      .min(8)
      .regex(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
    grade: z.number().min(7).max(12),
    section: z.string(),
    pwd: z.boolean(),
    idpic: z.array(z.string()).min(1),
    birthday: z.date().min(new Date("2000-01-01")).max(new Date("2015-12-31")),
    address: z.string().trim().min(1).max(100),
    e1Name: z.string().trim().min(1).max(50),
    e1FB: z.string().trim().min(1).max(50),
    e1Res: z.string().trim().min(1).max(50),
    e1Num: z.string().trim().min(1).max(50),
    e2Name: z.string().trim().min(1).max(50),
    e2FB: z.string().trim().min(1).max(50),
    e2Res: z.string().trim().min(1).max(50),
    e2Num: z.string().trim().min(1).max(50),
    e3Name: z.string().trim().min(1).max(50),
    e3FB: z.string().trim().min(1).max(50),
    e3Res: z.string().trim().min(1).max(50),
    e3Num: z.string().trim().min(1).max(50),
  })
  .refine((data) => data.confirmp === data.password, {
    message: "Passwords don't match",
    path: ["confirmp"],
  });

const grades = [
  { label: "7", value: 7 },
  { label: "8", value: 8 },
  { label: "9", value: 9 },
  { label: "10", value: 10 },
  { label: "11", value: 11 },
  { label: "12", value: 12 },
] as const;

const RegisterForm = ({
  sections,
}: {
  sections: { label: string; value: string }[];
}) => {
  const supabase = useSupabaseBrowser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lrn: "",
      firstname: "",
      middlename: "",
      lastname: "",
      email: "",
      password: "",
      confirmp: "",
      grade: 7,
      section: "",
      pwd: false,
      idpic: [],
      birthday: new Date("2015-12-31"),
      address: "",
      e1Name: "",
      e1FB: "",
      e1Res: "",
      e1Num: "",
      e2Name: "",
      e2FB: "",
      e2Res: "",
      e2Num: "",
      e3Name: "",
      e3FB: "",
      e3Res: "",
      e3Num: "",
    },
  });

  const onGradeChange = async (value: number) => {
    const sectionList = await getSectionsByGrade(supabase, value);
    if (sectionList) {
      const sections = sectionList.data?.map((e) => {
        return { label: e.sectionName!, value: e.sectionName! };
      });
      if (sections) {
        setSectionList(sections);
      }
    }
  };

  const [sectionList, setSectionList] =
    useState<{ label: string; value: string }[]>(sections);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <>
      <Form {...form} control={form.control}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="lrn"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>LRN</FormLabel>
                    <FormDescription>
                      Your LRN is a 12 digit number given by your previous
                      school.
                    </FormDescription>
                    <FormControl className="w-full">
                      <InputOTP
                        maxLength={12}
                        className="flex flex-col"
                        {...field}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={6} />
                          <InputOTPSlot index={7} />
                          <InputOTPSlot index={8} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={9} />
                          <InputOTPSlot index={10} />
                          <InputOTPSlot index={11} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormDescription>
                      This email will be used for authenticating in the
                      dashboard.
                    </FormDescription>
                    <FormControl>
                      <Input
                        type="string"
                        placeholder="Email"
                        required
                        {...field}
                      />
                    </FormControl>
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
                    <FormDescription>
                      Your password must be at least 8 characters long and
                      include at least one uppercase letter, one lowercase
                      letter, one number, and one special character.
                    </FormDescription>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm Password"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator />
              <div className="flex flex-1 flex-col gap-2 align-bottom md:flex-row">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          type="string"
                          placeholder="First Name"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="middlename"
                  render={({ field }) => (
                    <FormItem className="mt-auto w-full">
                      <FormControl>
                        <Input
                          type="string"
                          placeholder="Middle Name"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem className="mt-auto w-full">
                      <FormControl>
                        <Input
                          type="string"
                          placeholder="Last Name"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Separator />
              <div className="flex flex-1 flex-col gap-2 align-bottom md:flex-row">
                <FormField
                  control={form.control}
                  name="grade"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                      <FormLabel>Grade</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? grades.find(
                                    (grade) => grade.value === field.value
                                  )?.label
                                : "Grade"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command shouldFilter={false}>
                            <CommandList>
                              <CommandEmpty>No grade level found.</CommandEmpty>
                              <CommandGroup>
                                {grades.map((grade) => (
                                  <CommandItem
                                    value={grade.label}
                                    key={grade.value}
                                    onSelect={() => {
                                      form.setValue("grade", grade.value);
                                      onGradeChange(grade.value);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        grade.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {grade.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="section"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                      <FormLabel>Section</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? sectionList.find(
                                    (section) => section.value === field.value
                                  )?.label
                                : "Section"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandList>
                              <CommandEmpty>No sections found.</CommandEmpty>
                              <CommandGroup>
                                {sectionList.map((section) => (
                                  <CommandItem
                                    value={section.label}
                                    key={section.value}
                                    onSelect={() => {
                                      form.setValue("section", section.value);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        section.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {section.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Separator />
              <div className="flex flex-1 flex-col gap-2 align-bottom md:flex-row">
                <FormField
                  control={form.control}
                  name="birthday"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Date of Birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
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
                              date > new Date("2015-12-31") ||
                              date < new Date("2000-01-01")
                            }
                            initialFocus
                            defaultMonth={field.value}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        type="string"
                        placeholder="Home Address"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-1 flex-col gap-2 align-bottom md:flex-row">
                <FormField
                  control={form.control}
                  name="pwd"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-secondary">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none cursor-pointer">
                        <FormLabel className="cursor-pointer">
                          Are you a person with disability?
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </form>
      </Form>
    </>
  );
};

export default RegisterForm;

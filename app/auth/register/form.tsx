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
import { CalendarIcon, Check, ChevronsUpDown, Loader2 } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
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
import { Label } from "@/components/ui/label";
import { isValidPhoneNumber } from "react-phone-number-input";
import { PhoneInput } from "@/components/ui/input-phone";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 1; // 1MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png"];

const formSchema = z
  .object({
    lrn: z
      .string()
      .length(12, "Must be 12 characters.")
      .refine(
        (v) => {
          let n = Number(v);
          console.log(v.length, v);
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
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    confirmp: z
      .string()
      .trim()
      .min(8)
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    grade: z.number().min(7).max(12),
    section: z.string(),
    pwd: z.boolean(),
    idpic: typeof window === "undefined" ? z.any() : z.instanceof(FileList),
    birthday: z.date().min(new Date("2000-01-01")).max(new Date("2015-12-31")),
    address: z.string().trim().min(1).max(100),
    e1Name: z.string().trim().min(1).max(50),
    e1FB: z.string().trim().min(1).max(50).url(),
    e1Res: z.string().trim().min(1, "Must select an option.").max(50),
    e1Num: z
      .string()
      .trim()
      .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
    e2Name: z.string().trim().min(1).max(50),
    e2FB: z.string().trim().min(1).max(50).url(),
    e2Res: z.string().trim().min(1, "Must select an option.").max(50),
    e2Num: z
      .string()
      .trim()
      .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
    e3Name: z.string().trim().min(1).max(50),
    e3FB: z.string().trim().min(1).max(50).url(),
    e3Res: z.string().trim().min(1, "Must select an option.").max(50),
    e3Num: z
      .string()
      .trim()
      .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
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

const relationships = [
  { label: "Parent", value: "Parent" },
  { label: "Guardian", value: "Guardian" },
  { label: "Sibling", value: "Sibling" },
  { label: "Other", value: "Other" },
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
  const [isLoading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading");
  const fileRef = form.register("idpic");

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
    setLoading(true);
    console.log(data);
  };

  return (
    <>
      <Form {...form} control={form.control}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="lrn"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>LRN</FormLabel>
                    <FormDescription>
                      Your LRN is a 12 digit number assigned to you by your
                      school.
                    </FormDescription>
                    <FormControl className="w-full">
                      <Input
                        type="string"
                        inputMode="numeric"
                        placeholder="LRN"
                        required
                        {...field}
                      />
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
                    <FormItem className="flex w-full flex-col">
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
                              <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
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
                    <FormItem className="flex w-full flex-col">
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
                              <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
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
                              <CalendarIcon className="ml-auto size-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            fromYear={2000}
                            toYear={2015}
                            captionLayout="dropdown"
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
                      <div className="cursor-pointer space-y-1 leading-none">
                        <FormLabel className="cursor-pointer">
                          Are you a person with disability?
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <Separator />
              <FormField
                control={form.control}
                name="idpic"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>ID Picture</FormLabel>
                    <FormDescription>
                      Please upload a valid ID picture.
                    </FormDescription>
                    <FormControl>
                      <Input type="file" required {...fileRef} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator />
            </div>
            <div className="space-y-4">
              <div className="flex flex-1 flex-col gap-2">
                <Label>Emergency Contact 1</Label>
                <FormField
                  control={form.control}
                  name="e1Name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Full Name</FormLabel>
                      <FormDescription>
                        The full name of your emergency contact.
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="string"
                          placeholder="Full Name"
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
                  name="e1Num"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Phone Number</FormLabel>
                      <FormDescription>
                        The phone number of your emergency contact.
                      </FormDescription>
                      <FormControl>
                        <PhoneInput defaultCountry="PH" required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="e1FB"
                  render={({ field }) => (
                    <FormItem className="mt-auto w-full">
                      <FormLabel>Facebook Profile</FormLabel>
                      <FormDescription>
                        The link to the facebook profile of your emergency
                        contact.
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="URL"
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
                  name="e1Res"
                  render={({ field }) => (
                    <FormItem className="mt-auto">
                      <FormLabel>Relationship</FormLabel>
                      <FormDescription>
                        How are you related to your emergency contact?
                      </FormDescription>
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
                                ? relationships.find(
                                    (relationship) =>
                                      relationship.value === field.value
                                  )?.label
                                : "Select relationship"}
                              <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search relationship..." />
                            <CommandList>
                              <CommandEmpty>No language found.</CommandEmpty>
                              <CommandGroup>
                                {relationships.map((relationship) => (
                                  <CommandItem
                                    value={relationship.label}
                                    key={relationship.value}
                                    onSelect={() => {
                                      form.setValue(
                                        "e1Res",
                                        relationship.value
                                      );
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        relationship.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {relationship.label}
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
              <div className="flex flex-1 flex-col gap-2">
                <Label>Emergency Contact 2</Label>
                <FormField
                  control={form.control}
                  name="e2Name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Full Name</FormLabel>
                      <FormDescription>
                        The full name of your emergency contact.
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="string"
                          placeholder="Full Name"
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
                  name="e2Num"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Phone Number</FormLabel>
                      <FormDescription>
                        The phone number of your emergency contact.
                      </FormDescription>
                      <FormControl>
                        <PhoneInput defaultCountry="PH" required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="e2FB"
                  render={({ field }) => (
                    <FormItem className="mt-auto w-full">
                      <FormLabel>Facebook Profile</FormLabel>
                      <FormDescription>
                        The link to the facebook profile of your emergency
                        contact.
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="URL"
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
                  name="e2Res"
                  render={({ field }) => (
                    <FormItem className="mt-auto">
                      <FormLabel>Relationship</FormLabel>
                      <FormDescription>
                        How are you related to your emergency contact?
                      </FormDescription>
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
                                ? relationships.find(
                                    (relationship) =>
                                      relationship.value === field.value
                                  )?.label
                                : "Select relationship"}
                              <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search relationship..." />
                            <CommandList>
                              <CommandEmpty>No language found.</CommandEmpty>
                              <CommandGroup>
                                {relationships.map((relationship) => (
                                  <CommandItem
                                    value={relationship.label}
                                    key={relationship.value}
                                    onSelect={() => {
                                      form.setValue(
                                        "e2Res",
                                        relationship.value
                                      );
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        relationship.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {relationship.label}
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
              <div className="flex flex-1 flex-col gap-2">
                <Label>Emergency Contact 3</Label>
                <FormField
                  control={form.control}
                  name="e3Name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Full Name</FormLabel>
                      <FormDescription>
                        The full name of your emergency contact.
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="string"
                          placeholder="Full Name"
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
                  name="e3Num"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Phone Number</FormLabel>
                      <FormDescription>
                        The phone number of your emergency contact.
                      </FormDescription>
                      <FormControl>
                        <PhoneInput defaultCountry="PH" required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="e3FB"
                  render={({ field }) => (
                    <FormItem className="mt-auto w-full">
                      <FormLabel>Facebook Profile</FormLabel>
                      <FormDescription>
                        The link to the facebook profile of your emergency
                        contact.
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="URL"
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
                  name="e3Res"
                  render={({ field }) => (
                    <FormItem className="mt-auto">
                      <FormLabel>Relationship</FormLabel>
                      <FormDescription>
                        How are you related to your emergency contact?
                      </FormDescription>
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
                                ? relationships.find(
                                    (relationship) =>
                                      relationship.value === field.value
                                  )?.label
                                : "Select relationship"}
                              <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search relationship..." />
                            <CommandList>
                              <CommandEmpty>No language found.</CommandEmpty>
                              <CommandGroup>
                                {relationships.map((relationship) => (
                                  <CommandItem
                                    value={relationship.label}
                                    key={relationship.value}
                                    onSelect={() => {
                                      form.setValue(
                                        "e3Res",
                                        relationship.value
                                      );
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        relationship.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {relationship.label}
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
            </div>
            <Button
              type="submit"
              className="xl:col-span-2"
              disabled={isLoading}
            >
              {isLoading ? loadingText : "Submit"}
            </Button>
          </CardContent>
        </form>
      </Form>
    </>
  );
};

export default RegisterForm;

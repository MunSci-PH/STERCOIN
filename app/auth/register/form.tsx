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
    grade: z.number().min(1).max(12),
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

const RegisterForm = () => {
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
      grade: 1,
      section: "",
      pwd: false,
      idpic: [],
      birthday: new Date(),
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

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <>
      <Form {...form} control={form.control}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid grid-cols-1 md:grid-cols-2">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="lrn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LRN</FormLabel>
                    <FormDescription>
                      Your LRN is a 12 digit number given by your previous
                      school.
                    </FormDescription>
                    <FormControl>
                      <Input
                        type="string"
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
                    <FormItem>
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
                    <FormItem className="mt-auto">
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
                    <FormItem className="mt-auto">
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
              <div className="flex flex-1">
                <div className="flex flex-1"></div>
              </div>
            </div>
          </CardContent>
        </form>
      </Form>
    </>
  );
};

export default RegisterForm;

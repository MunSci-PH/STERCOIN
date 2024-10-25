"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useSupabaseBrowser from "@/utils/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    password: z.string().trim().min(8),
    confirm: z.string().trim().min(8),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

const ResetPasswordForm = ({
  searchParams,
}: {
  searchParams: { code: string };
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirm: "",
    },
  });
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const supabase = useSupabaseBrowser();

  const tryLogin = async (e: z.infer<typeof formSchema>) => {
    setLoading(true);

    if (searchParams.code) {
      const { error } = await supabase.auth.exchangeCodeForSession(
        searchParams.code
      );

      if (error) {
        window.location.href = `/auth/error?message=${error.message}`;
      }
    }

    const { data, error } = await supabase.auth.updateUser({
      password: e.password,
    });

    if (error) setError(error.message);
    if (data) {
      window.location.href = "/auth/login";
    }
  };

  return (
    <Form {...form} control={form.control}>
      <form onSubmit={form.handleSubmit(tryLogin)}>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="New Password"
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
            name="confirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Re-enter Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Re-enter Password"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? <Loader2 className="animate-spin" /> : "Save"}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};
export default ResetPasswordForm;

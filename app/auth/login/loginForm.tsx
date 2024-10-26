"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useSupabaseBrowser from "@/utils/client";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import Link from "next/link";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { redirect } from "next/navigation";

export type loginData = {
  email: string;
  password: string;
  captchaToken: string;
};

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [captchaToken, setCaptchaToken] = useState<string>();
  const [isLoading, setLoading] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(true);
  const [error, setError] = useState<string>();
  const turnstileRef = useRef<TurnstileInstance>(undefined);
  const supabase = useSupabaseBrowser();

  const tryLogin = async (e: z.infer<typeof formSchema>) => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: e.email,
      password: e.password,
      options: { captchaToken: captchaToken },
    });

    if (error) {
      if (error.message == "Email not confirmed") {
        redirect(`/auth/login/confirm?email=${e.email}`);
      }
      setError(error.message);
      turnstileRef.current?.reset();
      setCaptchaLoading(true);
      setLoading(false);

      return;
    }

    return (window.location.href = "/dashboard");
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" required {...field} />
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
          <div>
            <Link
              href="/auth/password/reset"
              className="text-sm hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
        </CardContent>
        <CardFooter className="flex flex-1 flex-col gap-4">
          <Button
            type="submit"
            disabled={isLoading || captchaLoading}
            className="w-full"
          >
            {isLoading || captchaLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Sign In"
            )}
          </Button>
          <Turnstile
            ref={turnstileRef}
            siteKey={process.env.NEXT_PUBLIC_CF_SITEKEY!}
            onSuccess={(token) => {
              setCaptchaLoading(false);
              setCaptchaToken(token);
            }}
            onExpire={() => {
              setCaptchaLoading(true);
              setCaptchaToken("");
              turnstileRef.current?.reset();
            }}
            onError={(e) => {
              setError(e);
              console.error(e);
            }}
          />
        </CardFooter>
      </form>
    </Form>
  );
};
export default LoginForm;

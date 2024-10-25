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
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
});

const ForgotPasswordForm = ({}: {
  searchParams: { token_hash: string; type: string };
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const [isLoading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string>();
  const [captchaLoading, setCaptchaLoading] = useState(true);
  const [error, setError] = useState<string>();
  const turnstileRef = useRef<TurnstileInstance>(undefined);
  const supabase = useSupabaseBrowser();

  const tryLogin = async (e: z.infer<typeof formSchema>) => {
    setLoading(true);

    const { data, error } = await supabase.auth.resetPasswordForEmail(e.email, {
      redirectTo: `${window.location.origin}/auth/password/choose`,
      captchaToken: captchaToken,
    });

    if (error) {
      setError(error.message);
      turnstileRef.current?.reset();
      setCaptchaLoading(true);
      setLoading(false);
    }
    if (data) {
      window.location.href =
        "/auth/success?message=Password reset link has been sent to your email address";
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Link href="/auth/login" className="text-sm hover:underline">
              Remember your password?
            </Link>
          </div>
        </CardContent>
        <CardFooter className="flex flex-1 flex-col gap-4">
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || captchaLoading}
          >
            {isLoading || captchaLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Confirm"
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
export default ForgotPasswordForm;

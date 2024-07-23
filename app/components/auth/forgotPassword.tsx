"use client";
import useTheme from "@/hooks/useTheme";
import useSupabaseBrowser from "@/utils/client";
import { ErrorMessage } from "@hookform/error-message";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import Link from "next/link";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export type loginData = {
  email: string;
};

interface IContainerProps {
  searchParams: { token_hash: string; type: string };
}

const ForgotPasswordForm: React.FC<IContainerProps> = (props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<loginData>();
  const [isLoading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string>();
  const [captchaLoading, setCaptchaLoading] = useState(true);
  const turnstileRef = useRef<TurnstileInstance>();
  const isDarkTheme = useTheme();
  const supabase = useSupabaseBrowser();

  const tryLogin: SubmitHandler<loginData> = async (e: loginData) => {
    setLoading(true);

    const { data, error } = await supabase.auth.resetPasswordForEmail(e.email, {
      redirectTo: `${window.location.origin}/auth/password/choose`,
      captchaToken: captchaToken,
    });

    if (error) {
      toast(error.message, {
        theme: isDarkTheme ? "dark" : "light",
        autoClose: 2000,
        type: "error",
      });
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
    <form
      onSubmit={handleSubmit(tryLogin)}
      className="form-control w-full max-w-xs space-y-4"
    >
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Email</span>
        </div>
        <input
          type="input"
          className="input input-bordered w-full max-w-xs"
          {...register("email", {
            required: true,
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Please input a valid email.",
            },
          })}
        />
        <div className="label">
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => {
              return (
                <span className="label-text-alt text-left text-error">
                  {message}
                </span>
              );
            }}
          />
        </div>
      </label>
      <button
        type="submit"
        className="btn btn-info"
        disabled={isLoading || captchaLoading}
      >
        {isLoading || captchaLoading ? (
          <span className="loading loading-dots"></span>
        ) : (
          "Confirm"
        )}
      </button>
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
          toast(e, {
            theme: isDarkTheme ? "dark" : "light",
            autoClose: 2000,
            type: "error",
          });
          console.error(e);
        }}
      />
      <Link href="/auth/login" className="link link-info text-left">
        Remember your password?
      </Link>
    </form>
  );
};
export default ForgotPasswordForm;

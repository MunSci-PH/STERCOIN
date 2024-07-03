"use client";
import useSupabaseBrowser from "@/utils/client";
import { ErrorMessage } from "@hookform/error-message";
import { Turnstile } from "@marsidev/react-turnstile";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

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
  const [captchaToken, setCaptchaToken] = useState<string>();
  const supabase = useSupabaseBrowser();

  const tryLogin: SubmitHandler<loginData> = async (e: loginData) => {
    const origin = window.location.origin;

    const { data, error } = await supabase.auth.resetPasswordForEmail(e.email, {
      redirectTo: `${origin}/account/password/choose`,
      captchaToken: captchaToken,
    });

    if (error) window.location.href = `/account/error?message=${error.message}`;
    if (data) {
      window.location.href =
        "/account/confirm?message=Password Reset link has been sent to your email address";
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
      <button type="submit" className="btn btn-info">
        Confirm
      </button>
      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_CF_SITEKEY!}
        onSuccess={(token) => {
          setCaptchaToken(token);
        }}
      />
      <Link href="/dashboard/login" className="link link-info text-left">
        Remember your password?
      </Link>
    </form>
  );
};
export default ForgotPasswordForm;

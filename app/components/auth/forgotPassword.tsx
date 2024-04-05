"use client";
import { createClient } from "@/utils/client";
import { ErrorMessage } from "@hookform/error-message";
import { Turnstile } from "@marsidev/react-turnstile";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export type loginData = {
  email: string;
};

interface IContainerProps {
  searchParams: { token_hash: string; type: string };
}

export const supabase = createClient();

const ForgotPasswordForm: React.FC<IContainerProps> = (props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<loginData>();
  const [captchaToken, setCaptchaToken] = useState<string>();

  const tryLogin: SubmitHandler<loginData> = async (e: loginData) => {
    const origin = window.location.origin;

    const { data, error } = await supabase.auth.resetPasswordForEmail(e.email, {
      redirectTo: `${origin}/account/password/choose`,
      captchaToken: captchaToken,
    });

    if (error) throw error;
    if (data) {
      window.location.href =
        "/account/confirm?message=Password Reset link has been sent to your email address";
    }
  };

  return (
    <form
      onSubmit={handleSubmit(tryLogin)}
      className="form-control space-y-4 w-full min-w-xs max-w-xs"
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
                <span className="label-text-alt text-error text-left">
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
        siteKey="0x4AAAAAAAOMOy_l-B3ae-Jg"
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

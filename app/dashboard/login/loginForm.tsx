"use client";
import useTheme from "@/hooks/useTheme";
import useSupabaseBrowser from "@/utils/client";
import { ErrorMessage } from "@hookform/error-message";
import { Turnstile } from "@marsidev/react-turnstile";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export type loginData = {
  email: string;
  password: string;
  captchaToken: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginData>();
  const [captchaToken, setCaptchaToken] = useState<string>();
  const isDarkTheme = useTheme();
  const supabase = useSupabaseBrowser();

  const tryLogin = async (e: loginData) => {
    e.captchaToken = captchaToken!;

    const { data, error } = await supabase.auth.signInWithPassword({
      email: e.email,
      password: e.password,
      options: { captchaToken: captchaToken },
    });

    if (error) {
      if (error.message == "Email not confirmed") {
        window.location.href = `/dashboard/login/confirm?email=${e.email}`;
      }
      toast(error.message, {
        theme: isDarkTheme ? "dark" : "light",
        autoClose: 2000,
        type: "error",
      });
      console.error(error);

      return;
    }

    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit(tryLogin)} className="form-control space-y-4">
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
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Password</span>
        </div>
        <input
          type="password"
          className="input input-bordered w-full max-w-xs"
          {...register("password", {
            required: true,
            pattern: {
              value:
                /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message: "Please enter a valid password.",
            },
          })}
        />
        <div className="label">
          <ErrorMessage
            errors={errors}
            name="password"
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
      <Link href="/account/password/reset" className="link link-info text-left">
        Forgot your password?
      </Link>
      <button className="btn btn-info">Sign In</button>
      <Turnstile
        siteKey={process.env.CF_SITEKEY!}
        onSuccess={(token) => {
          setCaptchaToken(token);
        }}
      />
    </form>
  );
};
export default LoginForm;

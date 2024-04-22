"use client";
import { createClient } from "@/utils/client";
import { ErrorMessage } from "@hookform/error-message";
import { Turnstile } from "@marsidev/react-turnstile";
import { QueryData } from "@supabase/supabase-js";
import Link from "next/link";
import { useState } from "react";
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

  const tryLogin = (e: loginData) => {
    e.captchaToken = captchaToken!;

    fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(e),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error === null) {
          window.location.reload();
        } else if (response.error.status == "400") {
          toast("Wrong email or password. Please try again", {
            theme: "dark",
            autoClose: 2000,
            type: "error",
            closeOnClick: true,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
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
                <span className="label-text-alt text-error text-left">
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
                <span className="label-text-alt text-error text-left">
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
        siteKey="0x4AAAAAAAOMOy_l-B3ae-Jg"
        onSuccess={(token) => {
          setCaptchaToken(token);
        }}
      />
    </form>
  );
};
export default LoginForm;

"use client";
import { createClient } from "@/utils/client";
import { Turnstile } from "@marsidev/react-turnstile";
import { QueryData } from "@supabase/supabase-js";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export type loginData = {
  email: string;
  password: string;
  captchaToken: string;
};

const supabase = createClient();

const LoginForm = () => {
  const { register, handleSubmit } = useForm<loginData>();
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
      <label htmlFor="email" className="label label-text text-base">
        Email
      </label>
      <input
        type="input"
        className="input input-bordered w-full max-w-xs"
        {...register("email", { required: true })}
      />
      <label htmlFor="password" className="label label-text text-base">
        Password
      </label>
      <input
        type="password"
        className="input input-bordered w-full max-w-xs"
        {...register("password", { required: true })}
      />
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

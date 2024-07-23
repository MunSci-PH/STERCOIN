"use client";
import useTheme from "@/hooks/useTheme";
import useSupabaseBrowser from "@/utils/client";
import { ErrorMessage } from "@hookform/error-message";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export type confirmData = {
  email: string;
  captchaToken: string;
};

interface IContainerProps {
  email: string;
}

const ConfirmForm: React.FC<IContainerProps> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<confirmData>({ defaultValues: { email: props.email } });
  const [isLoading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string>();
  const [captchaLoading, setCaptchaLoading] = useState(true);
  const turnstileRef = useRef<TurnstileInstance>();
  const isDarkTheme = useTheme();
  const supabase = useSupabaseBrowser();

  const tryLogin = async (e: confirmData) => {
    setLoading(true);
    if (!e.email) e.email = props.email;
    e.captchaToken = captchaToken!;

    const { error } = await supabase.auth.resend({
      type: "signup",
      email: e.email,
      options: {
        captchaToken: e.captchaToken,
      },
    });

    if (error) {
      toast(error.message, {
        theme: isDarkTheme ? "dark" : "light",
        autoClose: 2000,
        type: "error",
      });
      console.error(error);
      setCaptchaLoading(true);
      turnstileRef.current?.reset();
      setLoading(false);

      return;
    }

    window.location.href = "/auth/login";
  };

  return (
    <form onSubmit={handleSubmit(tryLogin)} className="form-control space-y-4">
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Email</span>
        </div>
        <input
          type="input"
          disabled={props.email ? true : false}
          className="input input-bordered w-full max-w-xs"
          {...register("email", {
            required: true,
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Please input a valid email.",
            },
            disabled: props.email ? true : false,
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
          "Confirm Email"
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
    </form>
  );
};
export default ConfirmForm;

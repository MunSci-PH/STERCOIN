"use client";
import { createClient } from "@/utils/client";
import { ErrorMessage } from "@hookform/error-message";
import { redirect } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

export type loginData = {
  password: string;
  confirm: string;
};

interface IContainerProps {
  searchParams: { code: string };
}

export const supabase = createClient();

const ResetPasswordForm: React.FC<IContainerProps> = (props) => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<loginData>();

  const tryLogin: SubmitHandler<loginData> = async (e: loginData) => {
    if (props.searchParams.code) {
      const supabase = createClient();

      const { error } = await supabase.auth.exchangeCodeForSession(
        props.searchParams.code
      );

      if (error) {
        window.location.href = `/account/error?message=Unable to reset Password. Link expired!`;
      }
    }

    const { data, error } = await supabase.auth.updateUser({
      password: e.password,
    });

    if (error) window.location.href = `/account/error?message=${error.message}`;
    if (data) {
      window.location.href = "/dashboard/login";
    }
  };

  return (
    <form
      onSubmit={handleSubmit(tryLogin)}
      className="form-control w-full max-w-xs space-y-4"
    >
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">New Password</span>
        </div>
        <input
          type="password"
          className="input input-bordered w-full max-w-xs"
          {...register("password", {
            required: true,
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "Must be atleast eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
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

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Confirm Password</span>
        </div>
        <input
          type="password"
          className="input input-bordered w-full max-w-xs"
          {...register("confirm", {
            required: true,
            validate: (e) => e === watch("password") || "Passwords don't match",
          })}
        />
        <div className="label">
          <ErrorMessage
            errors={errors}
            name="confirm"
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
      <button className="btn btn-info">Save</button>
    </form>
  );
};
export default ResetPasswordForm;

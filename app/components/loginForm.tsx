"use client";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export type loginData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const { register, handleSubmit } = useForm<loginData>();

  const tryLogin = (e: loginData) => {
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
    </form>
  );
};
export default LoginForm;

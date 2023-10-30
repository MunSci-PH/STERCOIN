"use client";
import { createClient } from "@/utils/client";
import { toast } from "react-toastify";

const supabase = createClient();

export type loginData = {
  authType: boolean;
  username: string;
  password: string;
};

const LoginForm = () => {
  function tryLogin(data: loginData) {
    const apiEndpoint = "/api/auth/login";
    fetch(apiEndpoint, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response.message);
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
        toast("Login Failed", {
          theme: "dark",
          autoClose: 2000,
          type: "error",
        });
      });
  }

  return (
    <button
      onClick={() =>
        tryLogin({ authType: true, username: "admin", password: "hi" })
      }
      className="btn btn-primary"
    >
      Log In
    </button>
  );
};
export default LoginForm;

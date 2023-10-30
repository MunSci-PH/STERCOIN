"use client";
import { createClient } from "@/utils/client";
import { redirect } from "next/navigation";
import { use } from "react";
import { toast } from "react-toastify";

const supabase = createClient();

export type logoutData = {
  authType: boolean;
};

const LogoutForm = () => {
  function tryLogin(data: logoutData) {
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
        toast("Failed to log out.", {
          theme: "dark",
          autoClose: 2000,
          type: "error",
        });
      });
  }

  return (
    <button
      onClick={() => tryLogin({ authType: false })}
      className="btn btn-primary"
    >
      Log Out
    </button>
  );
};
export default LogoutForm;

"use client";
import { createClient } from "@/utils/client";
import { AiOutlineLogout } from "react-icons/ai";

export const SignOutButton = () => {
  const supabase = createClient();

  return (
    <button
      onClick={async () => {
        const { error } = await supabase.auth.signOut({ scope: "local" });
        if (error) throw error;
        return window.location.reload();
      }}
      className="btn btn-primary"
    >
      <AiOutlineLogout />
    </button>
  );
};

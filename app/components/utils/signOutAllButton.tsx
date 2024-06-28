"use client";
import { createClient } from "@/utils/client";
import { AiOutlineLogout } from "react-icons/ai";

export const SignOutAllButton = () => {
  const supabase = createClient();

  return (
    <button
      onClick={async () => {
        const { error } = await supabase.auth.signOut({ scope: "global" });
        if (error) throw error;
        return window.location.reload();
      }}
      className="btn btn-error rounded-full"
    >
      <AiOutlineLogout size={32} color="#fff" />
    </button>
  );
};

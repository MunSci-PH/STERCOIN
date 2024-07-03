"use client";
import useSupabaseBrowser from "@/utils/client";
import { AiOutlineLogout } from "react-icons/ai";

export const SignOutButton = () => {
  const supabase = useSupabaseBrowser();

  return (
    <button
      onClick={async () => {
        const { error } = await supabase.auth.signOut({ scope: "local" });
        if (error) throw error;
        return window.location.reload();
      }}
      type="button"
      title="Logout"
      className="btn btn-primary"
    >
      <AiOutlineLogout />
    </button>
  );
};

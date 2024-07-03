"use client";
import useSupabaseBrowser from "@/utils/client";
import { AiOutlineLogout } from "react-icons/ai";

export const SignOutAllButton = () => {
  const supabase = useSupabaseBrowser();

  return (
    <button
      onClick={async () => {
        const { error } = await supabase.auth.signOut({ scope: "global" });
        if (error) throw error;
        return window.location.reload();
      }}
      type="button"
      title="Logout Globally"
      className="btn btn-error rounded-full"
    >
      <AiOutlineLogout size={32} color="#fff" />
    </button>
  );
};

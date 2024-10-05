"use client";
import useSupabaseBrowser from "@/utils/client";
import { AiOutlineLogout } from "react-icons/ai";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

export const SignOutButton = () => {
  const supabase = useSupabaseBrowser();

  return (
    <Button
      onClick={async () => {
        const { error } = await supabase.auth.signOut({ scope: "local" });
        if (error) throw error;
        return window.location.reload();
      }}
      type="button"
      title="Logout"
    >
      <LogOut />
    </Button>
  );
};

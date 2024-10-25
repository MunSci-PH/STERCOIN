"use client";
import useSupabaseBrowser from "@/utils/client";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

export const SignOutAllButton = () => {
  const supabase = useSupabaseBrowser();

  return (
    <Button
      onClick={async () => {
        const { error } = await supabase.auth.signOut({ scope: "global" });
        if (error) throw error;
        return window.location.reload();
      }}
      type="button"
      variant={"destructive"}
      title="Sign Out Globally"
      className="rounded-full"
    >
      <LogOut />
    </Button>
  );
};

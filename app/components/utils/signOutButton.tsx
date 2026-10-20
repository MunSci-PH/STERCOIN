"use client";
import useSupabaseBrowser from "@/utils/client";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export const SignOutButton = () => {
  const supabase = useSupabaseBrowser();
  const router = useRouter();
  const queryClient = useQueryClient();

  return (
    <Button
      onClick={async () => {
        const { error } = await supabase.auth.signOut({ scope: "local" });
        if (error) throw error;

        await queryClient.invalidateQueries({ queryKey: ["userInfo"] });
        return router.refresh();
      }}
      type="button"
      title="Logout"
    >
      <LogOut />
    </Button>
  );
};

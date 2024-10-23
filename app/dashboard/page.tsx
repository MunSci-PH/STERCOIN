import { Metadata } from "next";
import Link from "next/link";
import { AiOutlineSearch, AiOutlineSetting } from "react-icons/ai";
import createSupabaseServer from "@/utils/server";
import { SignOutButton } from "@/components/utils/signOutButton";

import checkRoleServer from "@/hooks/checkRoleServer";
import AdminView from "./AdminView";
import { UserInfo } from "./types";
import UserView from "./UserView";

export const metadata: Metadata = {
  title: "Dashboard | STERCOIN",
  description: "Student Emergency Release Contact Information",
};

export default async function Dashboard() {
  const supabase = await createSupabaseServer();

  const user: UserInfo = (await checkRoleServer(supabase)) as UserInfo;

  return (
    <main className="container mx-auto flex flex-1 flex-col items-center px-4 text-center">
      <div className="mt-12 flex w-4/5 flex-nowrap justify-between">
        <p className="my-auto inline w-fit text-left font-sans text-4xl font-bold">
          Dashboard
        </p>
      </div>
      <div className="m-auto w-full md:w-4/5">
        <div className="flex h-full flex-col items-center">
          {user?.isAdmin ? (
            <AdminView user={user}></AdminView>
          ) : (
            <UserView user={user}></UserView>
          )}
        </div>
      </div>
    </main>
  );
}

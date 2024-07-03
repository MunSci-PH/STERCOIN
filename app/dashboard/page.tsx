import { Metadata } from "next";
import Link from "next/link";
import { AiOutlineSearch, AiOutlineSetting } from "react-icons/ai";
import useSupabaseServer from "@/utils/server";
import { SignOutButton } from "@/components/utils/signOutButton";
import { cookies } from "next/headers";
import useCheckRoleServer from "@/hooks/useCheckRoleServer";
import AdminView from "./AdminView";
import { UserInfo } from "./types";
import UserView from "./UserView";

export const metadata: Metadata = {
  title: "Dashboard | STERCOIN",
  description: "Student Emergency Release Contact Information",
};

export default async function Dashboard() {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  const user: UserInfo = (await useCheckRoleServer(supabase)) as UserInfo;

  return (
    <main className="container mx-auto flex flex-1 px-4 text-center">
      <div className="mx-auto w-full md:w-4/5">
        <div className="my-12 flex flex-col items-center">
          <div className="flex w-full flex-nowrap justify-between">
            <p className="my-auto inline w-fit text-left font-sans text-4xl font-bold">
              Home
            </p>
            <div className="my-auto grid grid-cols-3 gap-2">
              <Link href="/dashboard/settings" className="btn mx-auto">
                <AiOutlineSetting />
              </Link>
              {user.isAdmin ? (
                <Link href="/dashboard/search" className="btn mx-auto">
                  <AiOutlineSearch />
                </Link>
              ) : (
                <></>
              )}
              <SignOutButton />
            </div>
          </div>
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

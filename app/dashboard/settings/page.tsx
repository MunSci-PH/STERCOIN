import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import BackButton from "@/components/utils/backButton";
import { SignOutAllButton } from "@/components/utils/signOutAllButton";
import Loading from "@/loading";
import { getUserById } from "@/queries/getUserById";
import createSupabaseServer from "@/utils/server";
import { Edit } from "lucide-react";
import { Metadata } from "next";

import Link from "next/link";
import { Suspense } from "react";
import { FaEdit } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Settings | STERCOIN",
  description: "Student Emergency Release Contact Information",
};

export default async function Dashboard() {
  const supabase = await createSupabaseServer();

  const getUserInfo = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user;
  };

  const userInfo = await getUserInfo();

  const checkRole = async () => {
    const { data, error } = await getUserById(supabase, userInfo!.id);

    if (error) console.error(error);

    const userRole: string | undefined = data?.map((e) => e.group).toString();

    return userRole;
  };

  const userRole = await checkRole();

  return (
    <Suspense fallback={<Loading></Loading>}>
      <main className="container mx-auto flex flex-1 px-4 text-center">
        <div className="mx-auto w-full md:w-4/5">
          <div className="my-12 flex flex-col items-center">
            <div className="flex w-full flex-nowrap justify-between">
              <p className="my-auto inline w-fit text-left font-sans text-4xl font-bold">
                Settings
              </p>
              <BackButton></BackButton>
            </div>
            <div className="my-1 w-full">
              <div className="my-2 flex flex-1 flex-col gap-4 rounded p-5 align-middle">
                <Separator />
                <div>
                  <p className="text-left text-xl">{userInfo?.email}</p>
                  <p className="text-left font-bold">Email</p>
                </div>
                <Separator />
                <div className="grid grid-cols-2">
                  <div>
                    <p className="text-left text-xl">••••••••••</p>
                    <p className="text-left font-bold">Password</p>
                  </div>
                  <div className="my-auto justify-self-end rounded-xl">
                    <Button className="rounded-full text-xl" asChild>
                      <Link href="settings/password/change">
                        <Edit />
                      </Link>
                    </Button>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-left text-xl">{userRole}</p>
                  <p className="text-left font-bold">Authentication Level</p>
                </div>
                <Separator />
                <div className="flex justify-between align-middle">
                  <p className="my-auto text-2xl font-bold">
                    Sign Out Globally
                  </p>
                  <SignOutAllButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Suspense>
  );
}

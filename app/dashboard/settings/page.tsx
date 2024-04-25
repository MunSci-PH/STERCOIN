import BackButton from "@/components/utils/backButton";
import Loading from "@/loading";
import { createSSRClient } from "@/utils/server";
import { QueryData } from "@supabase/supabase-js";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { FaEdit } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Settings | STERCOIN",
  description: "Student Emergency Release Contact Information",
};

export default async function Dashboard() {
  const supabase = await createSSRClient();

  const getUserInfo = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user;
  };

  const userInfo = await getUserInfo();

  const checkRole = async () => {
    const userQuery = supabase.from("users").select().eq("id", userInfo!.id);
    type userDB = QueryData<typeof userQuery>;
    const { data, error } = await userQuery;
    if (error) console.error(error);

    const userObj: userDB = data!;
    const userRole: string = userObj.map((e) => e.group).toString();

    return userRole;
  };

  const userRole = await checkRole();

  return (
    <Suspense fallback={<Loading></Loading>}>
      <main className="flex-1 flex container mx-auto text-center px-4">
        <div className="w-full md:w-4/5 mx-auto">
          <div className="flex flex-col items-center my-12">
            <div className="w-full flex flex-nowrap justify-between">
              <p className="text-left text-4xl font-sans font-bold inline w-fit my-auto">
                Settings
              </p>
              <BackButton></BackButton>
            </div>
            <div className="w-full my-1">
              <div className="align-middle p-5 rounded my-2">
                <div className="divider"></div>
                <p className="text-xl text-left">{userInfo?.email}</p>
                <p className="text-left font-bold">Email</p>
                <div className="divider"></div>
                <div className="grid grid-cols-2">
                  <div>
                    <p className="text-xl text-left">••••••••••</p>
                    <p className="text-left font-bold">Password</p>
                  </div>
                  <div className="justify-self-end">
                    <Link
                      href="settings/password/change"
                      className="btn btn-circle text-xl"
                    >
                      <FaEdit />
                    </Link>
                  </div>
                </div>
                <div className="divider"></div>
                <p className="text-xl text-left">{userRole}</p>
                <p className="text-left font-bold">Authentication Level</p>
                <div className="divider"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Suspense>
  );
}

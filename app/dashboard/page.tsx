import { Metadata } from "next";
import Link from "next/link";
import {
  AiOutlineLogout,
  AiOutlineSearch,
  AiOutlineSetting,
} from "react-icons/ai";
import { createSSRClient } from "@/utils/server";
import { QueryData } from "@supabase/supabase-js";

export const metadata: Metadata = {
  title: "Dashboard | STERCOIN",
  description: "Student Emergency Release Contact Information",
};

export default async function Dashboard() {
  const supabase = await createSSRClient();

  const checkRole = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log(user);

    const userQuery = supabase.from("users").select().eq("id", user!.id);
    type userDB = QueryData<typeof userQuery>;
    const { data, error } = await userQuery;
    if (error) console.error(error);

    const userObj: userDB = data!;
    const userRole: string = userObj.map((e) => e.group).toString();

    return userRole;
  };

  const userRole = await checkRole();

  return (
    <main className="flex-1 flex container mx-auto text-center px-4">
      <div className="w-full md:w-4/5 mx-auto">
        <div className="flex flex-col items-center my-12">
          <div className="w-full flex flex-nowrap justify-between">
            <p className="text-left text-4xl font-sans font-bold inline w-fit my-auto">
              Home
            </p>
            <div className="grid grid-cols-3 my-auto gap-2">
              <Link href="/dashboard/settings" className="btn mx-auto">
                <AiOutlineSetting />
              </Link>
              <Link href="/dashboard/search" className="btn mx-auto">
                <AiOutlineSearch />
              </Link>
              <form
                action="/api/auth/logout"
                method="post"
                className="form-control flex flex-nowrap justify-between"
              >
                <button className="btn btn-primary">
                  <AiOutlineLogout />
                </button>
              </form>
            </div>
          </div>
          <div className=" my-36 grid grid-cols-3 md:grid-cols-6 gap-4 text-white">
            {userRole == "full" || userRole == "7" || userRole == "jhs" ? (
              <Link
                href="/dashboard/view/grade/7"
                className="p-12 text-2xl md:p-10 bg-green-600 rounded-xl"
              >
                <span>7</span>
              </Link>
            ) : (
              <Link
                href="#"
                className="p-12 text-2xl md:p-10 bg-green-600 rounded-xl opacity-50 pointer-events-none cursor-default"
                aria-disabled={true}
              >
                <span>7</span>
              </Link>
            )}
            {userRole == "full" || userRole == "8" || userRole == "jhs" ? (
              <Link
                href="/dashboard/view/grade/8"
                className="p-12 text-2xl md:p-10 bg-yellow-600 rounded-xl"
              >
                <span>8</span>
              </Link>
            ) : (
              <Link
                href="#"
                className="p-12 text-2xl md:p-10 bg-yellow-600 rounded-xl opacity-50 pointer-events-none cursor-default"
                aria-disabled={true}
              >
                <span>8</span>
              </Link>
            )}
            {userRole == "full" || userRole == "9" || userRole == "jhs" ? (
              <Link
                href="/dashboard/view/grade/9"
                className="p-12 text-2xl md:p-10 bg-red-600 rounded-xl"
              >
                <span>9</span>
              </Link>
            ) : (
              <Link
                href="#"
                className="p-12 text-2xl md:p-10 bg-red-600 rounded-xl opacity-50 pointer-events-none cursor-default"
              >
                <span>9</span>
              </Link>
            )}
            {userRole == "full" || userRole == "10" || userRole == "jhs" ? (
              <Link
                href="/dashboard/view/grade/10"
                className="p-12 text-2xl md:p-10 bg-cyan-600 rounded-xl"
              >
                <span>10</span>
              </Link>
            ) : (
              <Link
                href="#"
                className="p-12 text-2xl md:p-10 bg-cyan-600 rounded-xl opacity-50 pointer-events-none cursor-default"
              >
                <span>10</span>
              </Link>
            )}
            {userRole == "full" || userRole == "11" || userRole == "shs" ? (
              <Link
                href="/dashboard/view/grade/11"
                className="p-12 text-2xl md:p-10 bg-blue-600 rounded-xl"
              >
                <span>11</span>
              </Link>
            ) : (
              <Link
                href="#"
                className="p-12 text-2xl md:p-10 bg-blue-600 rounded-xl opacity-50 pointer-events-none cursor-default"
              >
                <span>11</span>
              </Link>
            )}
            {userRole == "full" || userRole == "12" || userRole == "shs" ? (
              <Link
                href="/dashboard/view/grade/12"
                className="p-12 text-2xl md:p-10 bg-orange-600 rounded-xl"
              >
                <span>12</span>
              </Link>
            ) : (
              <Link
                href="#"
                className="p-12 text-2xl md:p-10 bg-orange-600 rounded-xl opacity-50 pointer-events-none cursor-default"
              >
                <span>12</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

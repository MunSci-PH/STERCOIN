import { Metadata } from "next";
import Link from "next/link";
import { AiOutlineSearch, AiOutlineSetting } from "react-icons/ai";
import useSupabaseServer from "@/utils/server";
import { SignOutButton } from "@/components/utils/signOutButton";
import { cookies } from "next/headers";
import { getUserById } from "@/queries/getUserById";

export const metadata: Metadata = {
  title: "Dashboard | STERCOIN",
  description: "Student Emergency Release Contact Information",
};

export default async function Dashboard() {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  const checkRole = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    console.log(user);

    if (user && !error) {
      const { data, error } = await getUserById(supabase, user.id);
      if (error) {
        console.error(error);
        return;
      }

      if (data) {
        const userObj = data;
        const userRole: string | undefined = userObj
          ?.map((e) => e.group)
          .toString();
        return userRole;
      }
    } else {
      throw error;
    }
  };

  const userRole = await checkRole();

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
              <Link href="/dashboard/search" className="btn mx-auto">
                <AiOutlineSearch />
              </Link>
              <SignOutButton />
            </div>
          </div>
          <div className=" my-36 grid grid-cols-2 gap-4 text-white md:grid-cols-6">
            {userRole == "full" || userRole == "7" || userRole == "jhs" ? (
              <Link
                href="/dashboard/view/grade/7"
                className="flex flex-col rounded-xl bg-green-600 p-12 text-2xl md:p-10"
              >
                <span>Grade</span>
                <span>7</span>
              </Link>
            ) : (
              <Link
                href="#"
                className="pointer-events-none flex cursor-default flex-col rounded-xl bg-green-600 p-12 text-2xl opacity-50 md:p-10"
                aria-disabled={true}
              >
                <span>Grade</span>
                <span>7</span>
              </Link>
            )}
            {userRole == "full" || userRole == "8" || userRole == "jhs" ? (
              <Link
                href="/dashboard/view/grade/8"
                className="flex flex-col rounded-xl bg-yellow-600 p-12 text-2xl md:p-10"
              >
                <span>Grade</span>
                <span>8</span>
              </Link>
            ) : (
              <Link
                href="#"
                className="pointer-events-none flex cursor-default flex-col rounded-xl bg-yellow-600 p-12 text-2xl opacity-50 md:p-10"
                aria-disabled={true}
              >
                <span>Grade</span>
                <span>8</span>
              </Link>
            )}
            {userRole == "full" || userRole == "9" || userRole == "jhs" ? (
              <Link
                href="/dashboard/view/grade/9"
                className="flex flex-col rounded-xl bg-red-600 p-12 text-2xl md:p-10"
              >
                <span>Grade</span>
                <span>9</span>
              </Link>
            ) : (
              <Link
                href="#"
                className="pointer-events-none flex cursor-default flex-col rounded-xl bg-red-600 p-12 text-2xl opacity-50 md:p-10"
              >
                <span>Grade</span>
                <span>9</span>
              </Link>
            )}
            {userRole == "full" || userRole == "10" || userRole == "jhs" ? (
              <Link
                href="/dashboard/view/grade/10"
                className="flex flex-col rounded-xl bg-cyan-600 p-12 text-2xl md:p-10"
              >
                <span>Grade</span>
                <span>10</span>
              </Link>
            ) : (
              <Link
                href="#"
                className="pointer-events-none flex cursor-default flex-col rounded-xl bg-cyan-600 p-12 text-2xl opacity-50 md:p-10"
              >
                <span>Grade</span>
                <span>10</span>
              </Link>
            )}
            {userRole == "full" || userRole == "11" || userRole == "shs" ? (
              <Link
                href="/dashboard/view/grade/11"
                className="flex flex-col rounded-xl bg-blue-600 p-12 text-2xl md:p-10"
              >
                <span>Grade</span>
                <span>11</span>
              </Link>
            ) : (
              <Link
                href="#"
                className="pointer-events-none flex cursor-default flex-col rounded-xl bg-blue-600 p-12 text-2xl opacity-50 md:p-10"
              >
                <span>Grade</span>
                <span>11</span>
              </Link>
            )}
            {userRole == "full" || userRole == "12" || userRole == "shs" ? (
              <Link
                href="/dashboard/view/grade/12"
                className="flex flex-col rounded-xl bg-orange-600 p-12 text-2xl md:p-10"
              >
                <span>Grade</span>
                <span>12</span>
              </Link>
            ) : (
              <Link
                href="#"
                className="pointer-events-none flex cursor-default flex-col rounded-xl bg-orange-600 p-12 text-2xl opacity-50 md:p-10"
              >
                <span>Grade</span>
                <span>12</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

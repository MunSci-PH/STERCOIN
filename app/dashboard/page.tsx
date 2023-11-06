import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Link from "next/link";
import {
  AiOutlineLogout,
  AiOutlineSearch,
  AiOutlineSetting,
} from "react-icons/ai";

export const metadata: Metadata = {
  title: "Dashboard | STERCOIN",
  description: "Student Emergency Release Contact Information",
};

export default async function Dashboard() {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data, error } = await supabase.auth.getSession();

  if (!data.session) {
    redirect("/dashboard/login");
  }

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
          <div className="my-10 grid grid-cols-2 md:grid-cols-3 gap-4 text-white">
            <Link
              href="/dashboard/view/grade/7"
              className="p-12 text-2xl md:p-20 bg-green-600 rounded-xl"
            >
              <span>Grade 7</span>
            </Link>
            <Link
              href="/dashboard/view/grade/8"
              className="p-12 text-2xl md:p-20 bg-yellow-600 rounded-xl"
            >
              <span>Grade 8</span>
            </Link>
            <Link
              href="/dashboard/view/grade/9"
              className="p-12 text-2xl md:p-20 bg-red-600 rounded-xl"
            >
              <span>Grade 9</span>
            </Link>
            <Link
              href="/dashboard/view/grade/10"
              className="p-12 text-2xl md:p-20 bg-cyan-600 rounded-xl"
            >
              <span>Grade 10</span>
            </Link>
            <Link
              href="/dashboard/view/grade/11"
              className="p-12 text-2xl md:p-20 bg-blue-600 rounded-xl"
            >
              <span>Grade 11</span>
            </Link>
            <Link
              href="/dashboard/view/grade/12"
              className="p-12 text-2xl md:p-20 bg-orange-600 rounded-xl"
            >
              <span>Grade 12</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

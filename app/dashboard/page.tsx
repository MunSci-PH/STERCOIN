import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

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
    <>
      <main className="flex-1 flex container mx-auto text-center px-4">
        <div className="m-auto">
          <div className="flex flex-col items-center my-12 bg-base-100 p-10 rounded">
            <p className="text-center text-4xl font-sans font-bold mb-8">
              Home
            </p>
            <form
              action="/api/auth/logout"
              method="post"
              className="form-control space-y-4"
            >
              <button className="btn">Log out</button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

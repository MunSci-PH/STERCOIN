import ResetPasswordForm from "@/components/auth/passwordReset";
import useSupabaseServer from "@/utils/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  const { data } = await supabase.auth.getUser();

  if (data.user) {
    return redirect("/");
  }

  return (
    <>
      <main className="container mx-auto flex flex-1 px-4 text-center">
        <div className="m-auto">
          <div className="my-12 flex w-96 flex-col items-center rounded-xl bg-base-100 p-10">
            <p className="mb-8 text-center font-sans text-4xl font-bold">
              Choose Your Password
            </p>
            <ResetPasswordForm searchParams={searchParams} />
          </div>
        </div>
      </main>
    </>
  );
}

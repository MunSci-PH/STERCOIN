import ResetPasswordForm from "@/components/auth/passwordReset";
import { createSSRClient } from "@/utils/server";
import { redirect } from "next/navigation";

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  const supabase = await createSSRClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return redirect("/");
  }

  return (
    <>
      <main className="flex-1 flex container mx-auto text-center px-4">
        <div className="m-auto">
          <div className="flex flex-col items-center my-12 bg-base-100 p-10 rounded-xl w-96">
            <p className="text-center text-4xl font-sans font-bold mb-8">
              Choose Your Password
            </p>
            <ResetPasswordForm searchParams={searchParams} />
          </div>
        </div>
      </main>
    </>
  );
}

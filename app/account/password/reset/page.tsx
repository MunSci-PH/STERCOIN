import ForgotPasswordForm from "@/components/auth/forgotPassword";
import { createSSRClient } from "@/utils/server";
import { redirect } from "next/navigation";

export default async function ForgotPassword({
  searchParams,
}: {
  searchParams: { token_hash: string; type: string };
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
      <main className="container mx-auto flex flex-1 px-4 text-center">
        <div className="m-auto">
          <div className="my-12 flex w-96 flex-col items-center rounded-xl bg-base-100 p-10">
            <p className="mb-8 text-center font-sans text-4xl font-bold">
              Forgot Password
            </p>
            <ForgotPasswordForm searchParams={searchParams} />
          </div>
        </div>
      </main>
    </>
  );
}

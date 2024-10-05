import ForgotPasswordForm from "@/auth/password/reset/forgotPassword";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useSupabaseServer from "@/utils/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ForgotPassword({
  searchParams,
}: {
  searchParams: { token_hash: string; type: string };
}) {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return redirect("/");
  }

  return (
    <>
      <main className="container mx-auto flex flex-1 px-4">
        <div className="m-auto">
          <Card className="w-[325px] md:w-[350px]">
            <CardHeader>
              <CardTitle>Forgot Password</CardTitle>
              <CardDescription>
                Enter your email to reset your password.
              </CardDescription>
            </CardHeader>
            <ForgotPasswordForm searchParams={searchParams} />
          </Card>
        </div>
      </main>
    </>
  );
}

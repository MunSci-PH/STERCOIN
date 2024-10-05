import ResetPasswordForm from "@/auth/password/choose/passwordReset";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
      <main className="container mx-auto flex flex-1 px-4">
        <div className="m-auto">
          <Card className="w-[325px] md:w-[350px]">
            <CardHeader>
              <CardTitle>Choose Your Password</CardTitle>
              <CardDescription>
                Enter your new password to change your password.
              </CardDescription>
            </CardHeader>
            <ResetPasswordForm searchParams={searchParams} />
          </Card>
        </div>
      </main>
    </>
  );
}

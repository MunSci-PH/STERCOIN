import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ConfirmForm from "./confirmForm";
import useSupabaseServer from "@/utils/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Dashboard({
  searchParams,
}: {
  searchParams: { email: string };
}) {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  const { data } = await supabase.auth.getUser();

  if (data.user) {
    redirect("/dashboard");
  }

  return (
    <>
      <main className="container mx-auto flex flex-1 px-4">
        <div className="m-auto">
          <Card className="w-[325px] md:w-[350px]">
            <CardHeader>
              <CardTitle>Confirm Your Email</CardTitle>
              <CardDescription>
                Enter your email to confirm your account.{" "}
              </CardDescription>
            </CardHeader>
            <ConfirmForm email={searchParams.email} />
          </Card>
        </div>
      </main>
    </>
  );
}

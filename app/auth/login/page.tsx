import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./loginForm";
import useSupabaseServer from "@/utils/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Dashboard() {
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
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Enter your credentials to access your account.
              </CardDescription>
            </CardHeader>
            <LoginForm />
          </Card>
        </div>
      </main>
    </>
  );
}

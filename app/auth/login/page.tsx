import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./loginForm";
import createSupabaseServer from "@/utils/server";

import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Dashboard() {
  const supabase = await createSupabaseServer();

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
                Enter your credentials to access your account.{" "}
                <Link
                  href="/auth/register"
                  className="text-sm text-foreground hover:underline"
                >
                  Don&apos;t have an account yet?
                </Link>
              </CardDescription>
            </CardHeader>
            <LoginForm />
          </Card>
        </div>
      </main>
    </>
  );
}

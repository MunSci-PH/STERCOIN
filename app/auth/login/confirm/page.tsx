import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ConfirmForm from "./confirmForm";
import createSupabaseServer from "@/utils/server";

import { redirect } from "next/navigation";

export default async function Dashboard(props: {
  searchParams: Promise<{ email: string }>;
}) {
  const searchParams = await props.searchParams;

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

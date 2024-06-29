import ConfirmForm from "./confirmForm";
import { createSSRClient } from "@/utils/server";
import { redirect } from "next/navigation";

export default async function Dashboard({
  searchParams,
}: {
  searchParams: { email: string };
}) {
  const supabase = createSSRClient();

  const { data } = await supabase.auth.getUser();

  if (data.user) {
    redirect("/dashboard");
  }

  return (
    <>
      <main className="container mx-auto flex flex-1 px-4 text-center">
        <div className="m-auto">
          <div className="my-12 flex w-96 flex-col items-center rounded-xl bg-base-100 p-10">
            <p className="mb-8 text-center font-sans text-4xl font-bold">
              Confirm Your Email
            </p>
            <ConfirmForm email={searchParams.email} />
          </div>
        </div>
      </main>
    </>
  );
}

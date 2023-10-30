import { isAuthenticated } from "@/utils/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import LoginForm from "@/components/login";
import { useRouter } from "next/router";

export default function Dashboard() {
  console.log(isAuthenticated);
  if (isAuthenticated) {
    redirect("/dashboard/home");
  }

  return (
    <>
      <main className="flex-1 flex container mx-auto text-center px-4">
        <div className="m-auto">
          <div className="flex flex-col items-center my-12 bg-base-100 p-10 rounded">
            <p className="text-center text-4xl font-sans font-bold mb-8">
              Login
            </p>
            <LoginForm />
          </div>
        </div>
      </main>
    </>
  );
}

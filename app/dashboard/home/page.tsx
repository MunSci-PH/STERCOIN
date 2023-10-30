import { isAuthenticated } from "@/utils/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import LogoutForm from "@/components/logout";

export const metadata: Metadata = {
  title: "Dashboard | STERCOIN",
  description: "Student Emergency Release Contact Information",
};
export default function Dashboard() {
  console.log(isAuthenticated);
  if (!isAuthenticated) {
    redirect("/dashboard");
  }

  return (
    <>
      <main className="flex-1 flex container mx-auto text-center px-4">
        <div className="m-auto">
          <div className="flex flex-col items-center my-12 bg-base-100 p-10 rounded">
            <p className="text-center text-4xl font-sans font-bold mb-8">
              Home
            </p>
            <LogoutForm />
          </div>
        </div>
      </main>
    </>
  );
}

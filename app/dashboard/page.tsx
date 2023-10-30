import { isAuthenticated } from "@/utils/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "STERCOIN",
  description: "Student Emergency Release Contact Information",
};
export default function Dashboard() {
  console.log(isAuthenticated);
  if (isAuthenticated) {
    redirect("dashboard/home");
  } else {
    redirect("dashboard/login");
  }

  return (
    <main className="flex-1 flex container mx-auto text-center px-4">
      <div className="m-auto">
        <p>
          <span className="loading loading-spinner"></span>
        </p>
      </div>
    </main>
  );
}

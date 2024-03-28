import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Settings | STERCOIN",
  description: "Student Emergency Release Contact Information",
};

export default async function Dashboard() {
  return (
    <main className="flex-1 flex container mx-auto text-center px-4">
      <div className="w-full md:w-4/5 mx-auto">
        <div className="flex flex-col items-center my-12">
          <div className="w-full flex flex-nowrap justify-between">
            <p className="text-left text-4xl font-sans font-bold inline w-fit my-auto">
              Settings
            </p>
          </div>
          <div className="my-10 grid grid-cols-2 md:grid-cols-3 gap-4 text-white"></div>
        </div>
      </div>
    </main>
  );
}

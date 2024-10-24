import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Success | STERCOIN",
  description: "Student Emergency Release Contact Information",
};

export default function InfoReg() {
  return (
    <main className="container mx-auto flex flex-1 px-4 text-center">
      <div className="m-auto">
        <div className="flex flex-col items-center">
          <p className="mt-12 text-center font-sans text-4xl font-bold">
            Successfully registered.{" "}
            <Link href="/auth/login">Login to continue.</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

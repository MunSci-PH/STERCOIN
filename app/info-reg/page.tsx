import { Metadata } from "next";
import Form from "@/info-reg/form";

export const metadata: Metadata = {
  title: "Information Registration | STERCOIN",
  description: "Student Emergency Release Contact Information",
};

export default function InfoReg() {
  return (
    <main className="container mx-auto flex flex-1 px-4 text-center">
      <div className="m-auto">
        <div className="flex flex-col items-center">
          <p className="mt-12 text-center font-sans text-4xl font-bold">
            Information Registration
          </p>
          <Form />
        </div>
      </div>
    </main>
  );
}

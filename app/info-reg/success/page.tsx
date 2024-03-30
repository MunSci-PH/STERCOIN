import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Success | STERCOIN",
  description: "Student Emergency Release Contact Information",
};

export default function InfoReg() {
  return (
    <main className="flex-1 flex container mx-auto text-center px-4">
      <div className="m-auto">
        <div className="flex flex-col items-center">
          <p className="text-center text-4xl font-sans font-bold mt-12">
            Successfully submitted. Thank you!
          </p>
        </div>
      </div>
    </main>
  );
}

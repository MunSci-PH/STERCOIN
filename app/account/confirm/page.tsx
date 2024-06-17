import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Successful | STERCOIN",
  description: "Student Emergency Release Contact Information",
};

export default function Confirm({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="container mx-auto flex flex-1 px-4 text-center">
      <div className="m-auto">
        <p className="ml-2 text-3xl font-bold text-error">
          Operation Successful!
        </p>
        <p className="mt-3 text-left text-2xl font-medium">
          {searchParams.message}
        </p>
      </div>
    </div>
  );
}

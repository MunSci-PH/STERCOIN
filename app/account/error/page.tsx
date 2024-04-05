import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Error | STERCOIN",
  description: "Student Emergency Release Contact Information",
};

export default function Error({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="flex-1 flex container mx-auto text-center px-4">
      <div className="m-auto">
        <p className="ml-2 text-3xl text-error font-bold">Error</p>
        <p className="mt-3 text-2xl text-left font-medium">
          {searchParams.message}
        </p>
      </div>
    </div>
  );
}

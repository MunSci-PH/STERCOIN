import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 | STERCOIN",
  description: "Student Emergency Release Contact Information",
};

export default function NotFound() {
  return (
    <div className="flex-1 flex container mx-auto text-center px-4">
      <div className="m-auto">
        <p className="ml-2 text-3xl text-red-600 font-bold">404</p>
        <p className="mt-3 text-2xl text-left font-medium">
          This page could not be found.
        </p>
      </div>
    </div>
  );
}

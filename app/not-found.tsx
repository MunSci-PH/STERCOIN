import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 | STERCOIN",
  description: "Student Emergency Release Contact Information",
};

export default function NotFound() {
  return (
    <div className="container mx-auto flex flex-1 px-4 text-center">
      <div className="m-auto">
        <p className="ml-2 text-3xl font-bold text-red-600">404</p>
        <p className="mt-3 text-left text-2xl font-medium">
          This page could not be found.
        </p>
      </div>
    </div>
  );
}

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "./components/nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "STERCOIN",
  description: "Student Emergency Release Contact Information",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-white dark:bg-gray-800 text-black dark:text-white min-h-screen flex flex-col">
          <Nav />
          {children}
        </div>
      </body>
    </html>
  );
}

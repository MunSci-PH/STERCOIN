import "@/globals.css";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import Nav from "@/components/nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

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
      <body className={lato.className}>
        <div className="bg-white dark:bg-gray-800 text-black dark:text-white min-h-screen flex flex-col">
          <Nav />
          {children}
          <Footer />
        </div>
        <ToastContainer />
      </body>
    </html>
  );
}

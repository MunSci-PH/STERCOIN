import "@/globals.css";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import Nav from "@/components/layout/nav/nav";
import Footer from "./components/layout/footer";
import { Analytics } from "@vercel/analytics/next";
import Disclaimer from "./components/layout/disclaimer";
import { ReactQueryClientProvider } from "./components/layout/QueryProvider";
import { ThemeProvider } from "./components/layout/theme-provider";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "STERCOIN",
  description:
    "A web application that stores every student's information that serves as an easy access to the student's emergency contacts information in case of disaster/emergency that may happen to the MunScian at school.",
  metadataBase: new URL("https://stercoin.vercel.app"),
  openGraph: {
    title: "STERCOIN",
    description:
      "A web application that stores every student's information that serves as an easy access to the student's emergency contacts information in case of disaster/emergency that may happen to the MunScian at school.",
    url: "https://stercoin.vercel.app",
    siteName: "STERCOIN",
    images: [
      {
        url: "/logo.png",
        width: 477,
        height: 446,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "STERCOIN",
    description:
      "A web application that stores every student's information that serves as an easy access to the student's emergency contacts information in case of disaster/emergency that may happen to the MunScian at school.",
    creator: "@sappy_why",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`min-h-screen ${lato.className}`}>
        <ReactQueryClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Disclaimer />
            <div className="flex min-h-screen flex-col">
              <Nav />
              {children}
              <Footer />
            </div>
          </ThemeProvider>
          <Analytics />
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/redux/Provider";
import { Analytics } from "@vercel/analytics/react";

import "@/app/globals.css";

import { Sora } from "next/font/google";

const sora = Sora({ subsets: ["latin"] });

export const metadata = {
  title: "eStore - Hackathon One",
  description: "Full stack eCommerce Website using NextJS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={sora.className}>
        <Providers>
          <header>
            <Header />
          </header>
          <main className=" pt-24 lg:pt-32 ">{children}</main>
          <Analytics />

          <footer>
            <Footer />
          </footer>
        </Providers>
      </body>
    </html>
  );
}

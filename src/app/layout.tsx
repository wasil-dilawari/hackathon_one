import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
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
        <header>
          <Header />
        </header>
        <main className=" mx-10">{children}</main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}

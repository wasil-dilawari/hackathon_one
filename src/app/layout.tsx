import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}

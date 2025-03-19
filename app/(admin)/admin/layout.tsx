import type { Metadata } from "next";
import "../../../app/globals.css";

export const metadata: Metadata = {
  title: "Microlights",
  description: "Microlights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased overflow-x-hidden`}>{children}</body>
    </html>
  );
}

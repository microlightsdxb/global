import type { Metadata } from "next";
import { Parkinsans } from "next/font/google"; // Import ParkinSans
import "../globals.css";
import SmoothScroll from "../components/common/SmoothScroll";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
/* import Header from "./componennts/common/Header"; */
import { Toaster } from "@/components/ui/sonner"

const parkinSans = Parkinsans({
  variable: "--font-parkin-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Your Project Title",
  description: "Your project description",
};

export const dynamic = 'force';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${parkinSans.variable} antialiased`}>
        <SmoothScroll />
        <Header />
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}

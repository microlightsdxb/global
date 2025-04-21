import type { Metadata } from "next";
import { Parkinsans } from "next/font/google"; // Import ParkinSans
import "../globals.css";
import SmoothScroll from "../components/common/SmoothScroll";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
/* import Header from "./componennts/common/Header"; */
import { Toaster } from "@/components/ui/sonner"
import parse from 'html-react-parser'

const parkinSans = Parkinsans({
  variable: "--font-parkin-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Your Project Title",
  description: "Your project description",
};

export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tagResponse = await fetch(`${process.env.BASE_URL}/api/admin/tags`);
  const tagData = await tagResponse.json();
  return (
    <html lang="en">
      <head>{parse(tagData.tag.headerScript)}</head>
      <body className={`${parkinSans.variable} antialiased`}>
        {parse(tagData.tag.bodyScript)}
        <SmoothScroll />
        <Header />
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}

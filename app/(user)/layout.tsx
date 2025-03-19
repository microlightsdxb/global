import type { Metadata } from "next";
import { Parkinsans } from "next/font/google"; // Import ParkinSans
import "./globals.css";
/* import Header from "./componennts/common/Header"; */


import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import SmoothScroll from "../components/common/SmoothScroll";

const parkinSans = Parkinsans({
  variable: "--font-parkin-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Your Project Title",
  description: "Your project description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${parkinSans.variable} antialiased`}>
        <SmoothScroll/>
      <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}


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
  icons: {
    icon: "/favicon.ico",  
  },
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
      <head>{
      parse(tagData.tag.headerScript)}
      <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-KS6RFWNV');
            `,
          }}
        />
      </head>
      <body className={`${parkinSans.variable} antialiased`}>
      <noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KS6RFWNV"
                height="0" 
                width="0" 
                style={{ display: "none", visibility: "hidden" }}></iframe>
        </noscript>

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

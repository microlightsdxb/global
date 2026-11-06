// Layout for the v2 redesign. Mirrors app/(user)/layout.tsx so the live site
// is untouched, but swaps in the v2 header.
import type { Metadata } from "next";
import { Parkinsans } from "next/font/google";
import "../globals.css";
import SmoothScroll from "../components/common/SmoothScroll";
import Footer from "../components/common/Footer";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";
import HeadInjector from "../components/common/HeadInjector";
import Header from "../components/v2/common/Header";

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

export const dynamic = "force-dynamic";

export default async function V2GroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tagResponse = await fetch(`${process.env.BASE_URL}/api/admin/tags`);
  const tagData = await tagResponse.json();

  return (
    <>
      <Script
        id="data-layer-init"
        dangerouslySetInnerHTML={{
          __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-KS6RFWNV');
            `,
        }}
        strategy="afterInteractive"
      />
      <body className={`${parkinSans.variable} antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KS6RFWNV"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <HeadInjector html={tagData.tag.headerScript} />
        <SmoothScroll />
        <Header />
        {children}
        <Toaster />
        <Footer />
      </body>
    </>
  );
}

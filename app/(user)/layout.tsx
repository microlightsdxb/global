import type { Metadata } from "next";
import { Parkinsans } from "next/font/google";
import Script from "next/script";
import { parse } from "node-html-parser";

import "../globals.css";
import SmoothScroll from "../components/common/SmoothScroll";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { Toaster } from "@/components/ui/sonner";

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
export const fetchCache = 'force-no-store';

type ScriptItem = {
  type: "external" | "inline";
  src?: string;
  content?: string;
};

// ✅ Basic sanitizer (prevents obvious XSS injections)
const isSafeScript = (content: string) => {
  const unsafePatterns = [
    /document\.write/gi,
    /eval\(/gi,
    /innerHTML\s*=/gi,
    /<iframe/gi,
  ];
  return !unsafePatterns.some((pattern) => pattern.test(content));
};

// ✅ Safer HTML parsing using node-html-parser
const extractScripts = (html: string): ScriptItem[] => {
  if (!html) return [];

  const root = parse(html);
  const scriptTags = root.querySelectorAll("script");

  return scriptTags
    .map((script) => {
      const src = script.getAttribute("src");

      if (src) {
        return {
          type: "external" as const,
          src,
        };
      }

      const content = script.innerHTML?.trim();

      if (content && isSafeScript(content)) {
        return {
          type: "inline" as const,
          content,
        };
      }

      return null;
    })
    .filter(Boolean) as ScriptItem[];
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let headerScripts: ScriptItem[] = [];
  let bodyScripts: ScriptItem[] = [];

  if (process.env.BASE_URL) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    try {
      const tagResponse = await fetch(
        `${process.env.BASE_URL}/api/admin/tags`,
        {
          signal: controller.signal,
          next: { revalidate: 3600 }, // ✅ caching enabled
        }
      );

      if (tagResponse.ok) {
        const tagData = await tagResponse.json();

        headerScripts = extractScripts(tagData?.tag?.headerScript || "");
        bodyScripts = extractScripts(tagData?.tag?.bodyScript || "");
      } else {
        console.warn("⚠️ Failed to fetch tag API:", tagResponse.status);
      }
    } catch (error) {
      console.warn("⚠️ Skipping tag fetch due to network issue:", error);
    } finally {
      clearTimeout(timeout); // ✅ always clears
    }
  } else {
    console.warn("⚠️ BASE_URL is not defined. Skipping tag fetch.");
  }

  return (
    <html lang="en">
      <head>
        {/* Header scripts */}
        {headerScripts.map((script, index) =>
          script.type === "external" ? (
            <Script
              key={`header-external-${index}`}
              src={script.src}
              strategy="beforeInteractive" // keep as-is (you may change later)
            />
          ) : (
            <Script
              key={`header-inline-${index}`}
              id={`header-inline-script-${index}`}
              dangerouslySetInnerHTML={{ __html: script.content || "" }}
              strategy="beforeInteractive"
            />
          )
        )}
      </head>

      <body className={`${parkinSans.variable} antialiased`}>
        {/* Body scripts */}
        {bodyScripts.map((script, index) =>
          script.type === "external" ? (
            <Script
              key={`body-external-${index}`}
              src={script.src}
              strategy="afterInteractive"
            />
          ) : (
            <Script
              key={`body-inline-${index}`}
              id={`body-inline-script-${index}`}
              dangerouslySetInnerHTML={{ __html: script.content || "" }}
              strategy="afterInteractive"
            />
          )
        )}

        <SmoothScroll />
        <Header />
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
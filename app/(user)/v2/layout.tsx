import type { Metadata } from "next";

// Applies to every page under /v2 — keeps the whole v2 section out of search results.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function V2Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="v2-layout">{children}</div>;
}

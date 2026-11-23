import type { Metadata } from "next";
import "./v2.css";

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

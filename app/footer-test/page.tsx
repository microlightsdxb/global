import type { Metadata } from "next";
import Footer from "@/app/components/v2/common/Footer";

export const metadata: Metadata = {
  title: "Footer Test - Microlights",
  description: "Preview of the Microlights footer.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function FooterTestPage() {
  return <Footer />;
}

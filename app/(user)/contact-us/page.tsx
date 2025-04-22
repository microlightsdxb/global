import Index from "../../components/ContactUs/Index";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/contact/meta`, { next: { revalidate: 60 } });
  const data = await response.json();

  const metadataTitle = data?.data?.metaTitle || "Microlights";
  const metadataDescription =
    data?.data?.metaDescription || "Microlights";

  return {
    title: metadataTitle,
    description: metadataDescription,
  };
}

export default function Home() {
  return (
    <>
    <Index/>
    </>
  );
}

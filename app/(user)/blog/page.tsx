import Index from "../../components/Blogs/Index";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/blog/meta`, { next: { revalidate: 60 } });
  const data = await response.json();

  const metadataTitle = data?.metaTitle || "Microlights";
  const metadataDescription =
    data?.metaDescription || "Microlights";

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

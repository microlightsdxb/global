import Index from "../../../components/BlogDetails/Index";
import type { Metadata } from "next";

export async function generateMetadata({params}:{params:Promise<{slug:string}>}): Promise<Metadata> {
  const {slug} = await params;
  const response = await fetch(`${process.env.BASE_URL}/api/admin/blog?slug=${slug}`, { next: { revalidate: 60 } });
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


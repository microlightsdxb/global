import Index from "../../../components/ProductDetails/Index";
import type { Metadata } from "next";

export async function generateMetadata({params}:{params:Promise<{slug:string}>}): Promise<Metadata> {
  const {slug} = await params;
  const response = await fetch(`${process.env.BASE_URL}/api/admin/product?slug=${slug}`, { next: { revalidate: 60 } });
  const data = await response.json();

  const metadataTitle = data?.data?.metaTitle || "Microlights";
  const metadataDescription =
    data?.data?.metaDescription || "Microlights";

  return {
    title: metadataTitle,
    description: metadataDescription,
  };
}

export default async function Home({params}:{params:Promise<{slug:string}>}) {
  const {slug} = await params;
  const response = await fetch(`${process.env.BASE_URL}/api/admin/product?slug=${slug}`, { next: { revalidate: 60 } });
  const data = await response.json();
  return (
    <Index data={data}/>
  );
}

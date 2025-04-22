import Index from "../../../components/ProductDetails/Index";
import type { Metadata } from "next";

export async function generateMetadata({params}:{params:Promise<{id:string}>}): Promise<Metadata> {
  const {id} = await params;
  const response = await fetch(`${process.env.BASE_URL}/api/admin/product?id=${id}`, { next: { revalidate: 60 } });
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
    <Index/>
  );
}

import Index from "../../components/AboutUs/Index";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/about`, { next: { revalidate: 60 } });
  const data = await response.json();

  const metadataTitle = data?.data?.metaTitle || "Microlights";
  const metadataDescription =
    data?.data?.metaDescription || "Microlights";

  return {
    title: metadataTitle,
    description: metadataDescription,
  };
}


export default async function Home() {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/admin/about`, { next: { revalidate: 60 } });
    const data = await response.json();
    return (
      <>
      <Index data={data?.data} />
      </>
    );
  } catch (error) {
    console.log(error)
  }
}

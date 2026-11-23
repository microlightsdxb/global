import Index from "@/app/components/v2/home/Index";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/home`, { next: { revalidate: 60 } });
  const data = await response.json();
  const metadataTitle = data?.data?.metaTitle || "Microlights";
  const metadataDescription = data?.data?.metaDescription || "Microlights";

  return {
    title: metadataTitle,
    description: metadataDescription,
    alternates: {
      canonical: `/`,
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function HomeV2() {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/admin/home`, { next: { revalidate: 60 } });
    const data = await response.json();
    const typeResponse = await fetch(`${process.env.BASE_URL}/api/admin/product/type`, { next: { revalidate: 60 } });
    const typeData = await typeResponse.json();
    const projectResponse = await fetch(`${process.env.BASE_URL}/api/admin/project`, { next: { revalidate: 60 } });
    const projectData = await projectResponse.json();

    return (
      <Index homeData={data.data} typeData={typeData} projectData={projectData} />
    );
  } catch (error) {
    console.log(error);
  }
}

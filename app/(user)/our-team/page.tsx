import Index from "../../components/Team/Index";
import type { Metadata } from "next";


export async function generateMetadata(): Promise<Metadata> {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/team/meta`, { next: { revalidate: 60 } });
  const data = await response.json();

  const metadataTitle = data?.teamMeta?.metaTitle || "Microlights";
  const metadataDescription =
    data?.teamMeta?.metaDescription || "Microlights";

  return {
    title: metadataTitle,
    description: metadataDescription,
  };
}


export default async function Home() {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/admin/team`,{next:{revalidate:60}})
    const data = await response.json()
    return (
      <>
      <Index data={data.data}/>
      </>
    );
  } catch (error) {
    console.log(error)
  }
}





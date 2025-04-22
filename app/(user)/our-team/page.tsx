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
    const teamData = await fetch(`${process.env.BASE_URL}/api/admin/team/member`,{next:{revalidate:60}})
    const mdData = await fetch(`${process.env.BASE_URL}/api/admin/team/md`,{next:{revalidate:60}})
    const teamRes = await teamData.json()
    const mdRes = await mdData.json()
    return (
      <>
      <Index teamData={teamRes.data} mdData={mdRes.data}/>
      </>
    );
  } catch (error) {
    console.log(error)
  }
}





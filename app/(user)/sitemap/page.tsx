import Index from "../../components/SiteMap/Index";
import type { Metadata } from "next";


export async function generateMetadata(): Promise<Metadata> {
  

  const metadataTitle = "Sitemap - Microlights";
  const metadataDescription =
    "Welcome to Microlights. Click here to visit our website's sitemap! Learn more about our Lighting Solutions  in Dubai.";

  return {
    title: metadataTitle,
    description: metadataDescription,
     alternates: {
      canonical: `/sitemap`,  
    },
  };
}



export default async function Home() {
  try {
    // const res = await fetch(`${process.env.BASE_URL}/api/admin/sustainability`,{next:{revalidate:60}});
    // const data = await res.json();
    return (
      <>
      <Index />
      </>
    );
  } catch (error) {
    console.log(error)
  }

}

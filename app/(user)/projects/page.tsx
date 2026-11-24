import Index from "../../components/Projects/Index";
import type { Metadata } from "next";
import {
  getProjectListingData,
  getProjectMetadata,
} from "@/app/lib/services/service.projects";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getProjectMetadata();

  const metadataTitle = data?.projectMeta?.metaTitle || "Microlights";
  const metadataDescription =
    data?.projectMeta?.metaDescription || "Microlights";

  return {
    title: metadataTitle,
    description: metadataDescription,
    alternates: {
      canonical: `/projects`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Home() {
  const { projects, industries, locations } = await getProjectListingData();

  return (
    <Index
      projectData={projects}
      industryData={{ data: industries }}
      locationData={{ data: locations }}
    />
  );
}

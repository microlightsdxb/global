import "server-only";

import { unstable_cache } from "next/cache";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import ProjectMeta from "@/models/ProjectMeta";
import Industry from "@/models/Industry";
import Location from "@/models/Location";

export interface Project {
  _id: string;
  name: string;
  slug: string;
  location: string;
  thumbnail: string;
  thumbnailAlt: string;
  industry: string;
  scope: string;
}

export interface ProjectMetadata {
  projectMeta?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

interface ProjectMetadataRecord {
  metaTitle?: string;
  metaDescription?: string;
}

export const getProjectListingData = unstable_cache(
  async () => {
    await connectDB();

    const [projectRecords, industryRecords, locationRecords] =
      await Promise.all([
        Project.find()
          .select("name slug location thumbnail thumbnailAlt industry client scope")
          .lean(),
        Industry.find().select("name -_id").lean(),
        Location.find().select("name -_id").lean(),
      ]);
 
    const projects: Project[] = projectRecords.map((project) => ({
      _id: String(project._id),
      name: project.client?.split(",")[0].trim(),
      slug: project.slug,
      location: project.location,
      thumbnail: project.thumbnail,
      thumbnailAlt: project.thumbnailAlt,
      industry: project.industry,
      scope: project.scope,
      href: `/projects/${project.slug}`,
    }));
 
    return {
      projects,
      industries: industryRecords.map(({ name }) => ({ name })),
      locations: locationRecords.map(({ name }) => ({ name })),
    };
  },
  ["project-listing-data"],
  { revalidate: 60 },
);

export const getProjectMetadata = unstable_cache(
  async (): Promise<ProjectMetadata> => {
    await connectDB();
    const projectMeta = await ProjectMeta.findOne({})
      .select("metaTitle metaDescription -_id")
      .lean<ProjectMetadataRecord>();

    const projectMetaRecord = Array.isArray(projectMeta)
      ? projectMeta[0]
      : projectMeta;

    if (!projectMetaRecord) return {};

    return {
      projectMeta: {
        metaTitle: projectMetaRecord.metaTitle,
        metaDescription: projectMetaRecord.metaDescription,
      },
    };
  },
  ["project-listing-metadata"],
  { revalidate: 60 },
);

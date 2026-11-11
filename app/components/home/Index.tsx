"use client";

import React from "react";

import HeroSection from "./sections/HeroSection";
import RecentProjects from "./sections/Project";
import Testimonials from "./sections/Testimonials";
import ProdSec from "./sections/ProdSec";

import AboutSec from "./sections/AboutSec";
import IndustriesServed from "./sections/IndustriesServed";
import { Home } from "@/types/Home";
import ProjectsSec from "../v2/home/sections/ProjectsSec";
import { ProjectsData } from "@/app/(v2)/v2/home/data";

type typeData = {
  data: {
    _id: string;
    type: string;
    image: string;
    hoverImage: string;
  }[];
};

export type projectData = {
  _id: string;
  name: string;
  client: string;
  location: string;
  thumbnail: string;
  slug: string;
  industry?: string;
  scope?: string;
  images?: string[];
  thumbnailAlt?: string;
};

const Index = ({
  homeData,
  typeData,
  projectData,
}: {
  homeData: Home;
  typeData: typeData;
  projectData: projectData[];
}) => {
 

  const projectsData: ProjectsData = {
    title: "Our Projects",
    description:
      "With completed projects across the Middle East, Europe and Asia our portfolio reflects a trusted regional presence spanning retail, hospitality, F&B, and commercial sectors.",
    projects: projectData.map((item: projectData) => ({
      title: item.client?.split(",")[0].trim(),
      industry: item.industry as string,
      scope: item.scope as string,
      image: item.thumbnail || item.images?.[0] || "",
      alt: item.thumbnailAlt || item.name,
      href: `/projects/${item.slug}`,
    })),
    cta: {
      label: "View All Projects",
      href: "/projects",
    },
  };
  return (
    <div>
      <HeroSection data={homeData} />
      <ProdSec data={typeData} />
      <IndustriesServed data={homeData} />
      <AboutSec data={homeData} />
      {/* <ProcessTimeline data={homeData} /> */}
      {/* <RecentProjects data={projectData} /> */}
      <ProjectsSec data={projectsData} />
      <Testimonials data={homeData} />
    </div>
  );
};

export default Index;

"use client";

import React, { useMemo, useState } from "react";
import Filter from "./sections/Filter";
import ProjectList from "./sections/ProjectList";
import type { Project } from "@/app/lib/services/service.projects";

interface IndexProps {
  projectData: Project[];
  industryData: { data: { name: string }[] };
  locationData: { data: { name: string }[] };
}

const Index = ({ projectData, industryData, locationData }: IndexProps) => {
  const [industrySelected, setIndustrySelected] = useState<string>("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const limit = 8;

  const filteredProjects = useMemo(() => {
    return projectData.filter((project) => {
      const matchesIndustry =
        !industrySelected ||
        industrySelected === "Industry" ||
        project.industry === industrySelected;
      const matchesLocation =
        selectedLocations.length === 0 ||
        selectedLocations.includes(project.location);

      return matchesIndustry && matchesLocation;
    });
  }, [industrySelected, projectData, selectedLocations]);

  return (
    <>
      <div className="headerpadding"> </div>
      <Filter
        industryData={industryData}
        locationData={locationData}
        setIndustrySelected={(industry) => {
          setIndustrySelected(industry);
          setVisibleCount(limit);
        }}
        setLocationSelected={() => {
          setVisibleCount(limit);
        }}
        selectedLocations={selectedLocations}
        setSelectedLocations={(update) => {
          setSelectedLocations(update);
          setVisibleCount(limit);
        }}
      />
      <ProjectList
        data={filteredProjects.slice(0, visibleCount)}
        hasMore={visibleCount < filteredProjects.length}
        onLoadMore={() => setVisibleCount((count) => count + limit)}
      />
    </>
  );
};

export default Index;

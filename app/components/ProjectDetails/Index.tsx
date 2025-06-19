"use client"

import React from "react";

// import { projects,projectDetails,content } from "./data/dataBox"
import MoreProjects from "./sections/MoreProjects";
import Details from "./sections/Details";
import Contents from "./sections/Contents";
import Pjctslider from "./sections/Pjctslider";
import useSWR from "swr";
import { Project } from "@/types/Project";



const Index = ({data}:{data:Project}) => {
  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())
  const {data:allProjects} = useSWR(`/api/admin/project`, fetcher)

  
  return (
    <>
      <div className="headerpadding"> </div>
      <Details data={data} />   
      <Pjctslider data={data} />
      <Contents data={data} />
      <MoreProjects data={allProjects} industry={data?.data?.industry} projectName={data?.data?.name}/>

    </>
  );
};

export default Index;

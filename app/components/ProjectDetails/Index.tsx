"use client"

import React, { useEffect } from "react";

// import { projects,projectDetails,content } from "./data/dataBox"
import MoreProjects from "./sections/MoreProjects";
import Details from "./sections/Details";
import Contents from "./sections/Contents";
import Pjctslider from "./sections/Pjctslider";
import { useParams } from "next/navigation";
import useSWR from "swr";



const Index = () => {
  const {slug} = useParams()
  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())
  const { data } = useSWR(`/api/admin/project?slug=${slug}`, fetcher)
  const {data:allProjects} = useSWR(`/api/admin/project`, fetcher)

  useEffect(() => {
    if(data?.data){
      console.log(data?.data)
    }
  }, [data])
  
  return (
    <>
      <div className="headerpadding"> </div>
      <Details data={data} />   
      <Pjctslider data={data} />
      <Contents data={data} />
      <MoreProjects data={allProjects} industry={data?.data?.industry}/>

    </>
  );
};

export default Index;

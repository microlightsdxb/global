"use client"

import React, { useEffect } from "react";
import Banner from "./sections/Banner";
import TeamList from "./sections/TeamList";
import useSWR from "swr";

interface MdData {
  data:{
    mdName: string;
    mdDescription: string;
    mdImage: string;
    mdDesignation:string;
  }

}

interface TeamData {
  data:{
    name: string;
    designation: string;
    image: string;
  }[]
}


const Index = () => {
  
  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())
  const { data:mdData }:{data:MdData} = useSWR(`/api/admin/team/md`, fetcher)
  const { data:teamData }:{data:TeamData} = useSWR(`/api/admin/team/member`, fetcher)

  useEffect(()=>{
    console.log(mdData,teamData)
  },[mdData,teamData])

  return (
    <>
      <div className="headerpadding"> </div>

      <Banner data={mdData}/>
      <TeamList data={teamData} />

    </>
  );
};

export default Index;

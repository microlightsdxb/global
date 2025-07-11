"use client"

import React from "react";
import Banner from "./sections/Banner"; 
import TeamListing from "./sections/TeamListing";
// import useSWR from "swr";

interface Props {
  mdData:{
    mdName: string;
    mdDescription: string;
    mdImage: string;
    mdDesignation:string;
    mdImageAlt: string;
  }
  teamData:{
    name: string;
    designation: string;
    image: string;
    imageAlt: string;
  }[]
}


const Index = ({teamData,mdData}: Props) => {
  return (
    <>
      <div className="headerpadding"> </div>

      <Banner data={mdData}/>
      <TeamListing data={teamData}/>
     

    </>
  );
};

export default Index;

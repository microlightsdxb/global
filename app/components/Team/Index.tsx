"use client"

import React from "react";
import Banner from "./sections/Banner"; 
import TeamListing from "./sections/TeamListing";
// import useSWR from "swr";

interface Props {
  mdName:string;
  mdDesignation:string;
  mdImage:string;
  mdDescription:string;
  mdImageAlt:string;
  departments:[{
    title: string,
    members:[{
        name: string,
        image: string,
        designation: string,
        imageAlt: string
    }]
}
]
}


const Index = ({data}: {data:Props}) => {
  return (
    <>
      <div className="headerpadding"> </div>

      <Banner data={data}/>
      <TeamListing data={data.departments}/>
     

    </>
  );
};

export default Index;

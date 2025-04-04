"use client"

import React, { useEffect } from "react";


import Imgbanner from "../common/Imgbanner";
import Introducing from "./sections/Introducing";
import Mission from "./sections/Mission";
import WhyMicolights from "./sections/WhyMicolights";

import {banner} from "./data/dataBox"
import useSWR from "swr";

interface AboutData {
  data:{
    _id: string;
    introTitle: string;
    introDescription: string;
    introImage: string;
    sectionTwoImage: string;
    mission:{description:string,icon:string};
    vision:{description:string,icon:string};
    values:{description:string,icon:string};
    whyItems: {
      _id: string;
      icon: string;
      title: string;
      description: string;
      bottomIcon: string;
    }[];
  }
}

const Index = () => {
  
  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())
  const { data }:{data:AboutData} = useSWR(`/api/admin/about`, fetcher)

  useEffect(()=>{
    console.log(data)
  },[data])

  return (
    <div>
      <div className="headerpadding"> </div>
        <Imgbanner data={banner.data} />
      <Introducing data={data} />
      <Mission data={data} />
      <WhyMicolights data={data} />
    </div>
  );
};

export default Index;

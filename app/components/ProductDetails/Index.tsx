"use client"

import React, { useEffect } from "react";
import Pdtdetails from "./sections/Pdtdetails";
import PdtSpec from "./sections/PdtSpec";
import { useParams } from "next/navigation";
import useSWR from "swr";

interface FrameworkItem {
  _id: string;
  name: string;
  items:{
    title: string;
    value: string;
  }[]
}

interface Product {
  data:{
    name: string;
    thumbnail: string;
    wattage: string;
    lumen: string;
    images: string[];
    type: string;
    file: string;
    specifications: FrameworkItem[];
  }
}

const Index = () => {
  const {slug} = useParams()
  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())
  const { data }: { data: Product } = useSWR(`/api/admin/product?slug=${slug}`, fetcher)

  useEffect(() => {
    if(data?.data){
      console.log(data?.data)
    }
  }, [data])

  return (
    <div>
      <div className="headerpadding"> </div>
      <Pdtdetails data={data}/>
      <PdtSpec data={data}/>
    </div>
  );
};

export default Index;

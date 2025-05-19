"use client"

import React from "react";
import Pdtdetails from "./sections/Pdtdetails";
import PdtSpec from "./sections/PdtSpec";

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

const Index = ({data}:{data:Product}) => {


  return (
    <div>
      <div className="headerpadding"> </div>
      <Pdtdetails data={data}/>
      <PdtSpec data={data}/>
    </div>
  );
};

export default Index;

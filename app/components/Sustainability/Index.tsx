import React from "react";
import Banner from "./sections/Banner";
import Longimg from "./sections/Longimg";
import Commitments from "./sections/Commitments";
import Certifications from "./sections/Certifications";
import Joinus from "./sections/Joinus";
import OurFuture from "./sections/OurFuture";
import { Sustainability } from "@/types/Sustainability";


const Index = ({data}: {data: Sustainability}) => {
  return (
    <>
      <div className="headerpadding"> </div>

      <Banner data={data}/>
      <Longimg data={data}/>
      <Commitments data={data}  />
      <Certifications data={data} />
      <OurFuture data={data}  />
      <Joinus data={data} />
    </>
  );
};

export default Index;

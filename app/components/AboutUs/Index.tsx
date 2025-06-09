
import React from "react";


import Introducing from "./sections/Introducing";
import Mission from "./sections/Mission";
import WhyMicolights from "./sections/WhyMicolights";

import Banner from "./Banner";
import { About } from "@/types/About";


const Index = ({ data }: { data: About }) => {

  return (
    <div>
      <div className="headerpadding"> </div>
      {/* <Imgbanner data={data} /> */}
      <Banner data={data} />
      <Introducing data={data} />
      <Mission data={data} />
      <WhyMicolights data={data} />
    </div>
  );
};

export default Index;

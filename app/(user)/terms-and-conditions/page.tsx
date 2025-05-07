

import React from "react";


import Banner from "@/app/components/AboutUs/Banner";
import { About } from "@/types/About";

const Index = ({data}:{data:About}) => {
  
  return (
    <div>
      <div className="headerpadding"> </div>
        {/* <Imgbanner data={data} /> */}
        <Banner/>
    </div>
  );
};

export default Index;
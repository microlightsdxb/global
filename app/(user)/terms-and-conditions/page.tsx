"use client"

import React from "react";


// import Introducing from "./sections/Introducing";
// import Mission from "./sections/Mission";
// import WhyMicolights from "./sections/WhyMicolights";

import Banner from "./Banner";
import Content from "./Content";


const Index = () => {
  
  return (
    <div>
      <div className="headerpadding"> </div>
        {/* <Imgbanner data={data} /> */}
        <Banner/>
        <Content/>
      {/* <Introducing data={data} /> */}
      {/* <Mission data={data} />
      <WhyMicolights data={data} /> */}
    </div>
  );
};

export default Index;

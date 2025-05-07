<<<<<<< HEAD

=======
"use client"
>>>>>>> 588d45f52f5ce941f8670bf8ea03552ad281c102

import React from "react";


<<<<<<< HEAD
import Banner from "@/app/components/AboutUs/Banner";
import { About } from "@/types/About";

const Index = ({data}:{data:About}) => {
=======
// import Introducing from "./sections/Introducing";
// import Mission from "./sections/Mission";
// import WhyMicolights from "./sections/WhyMicolights";

import Banner from "./Banner";
import Content from "./Content";


const Index = () => {
>>>>>>> 588d45f52f5ce941f8670bf8ea03552ad281c102
  
  return (
    <div>
      <div className="headerpadding"> </div>
        {/* <Imgbanner data={data} /> */}
        <Banner/>
<<<<<<< HEAD
=======
        <Content/>
      {/* <Introducing data={data} /> */}
      {/* <Mission data={data} />
      <WhyMicolights data={data} /> */}
>>>>>>> 588d45f52f5ce941f8670bf8ea03552ad281c102
    </div>
  );
};

<<<<<<< HEAD
export default Index;
=======
export default Index;
>>>>>>> 588d45f52f5ce941f8670bf8ea03552ad281c102

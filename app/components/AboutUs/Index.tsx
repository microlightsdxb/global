import React from "react";


import Imgbanner from "../common/Imgbanner";
import Introducing from "./sections/Introducing";
import Mission from "./sections/Mission";
import WhyMicolights from "./sections/WhyMicolights";

import { vision } from "./data/vision"
import { whymicolights } from "./data/whymicolights"
import { intro } from "./data/intro"



const Index = () => {
  return (
    <>
      <div className="headerpadding"> </div>
        <Imgbanner />
      <Introducing data={intro.data} />
      <Mission data={vision.data} />
      <WhyMicolights title={whymicolights.title}  data={whymicolights.data} />
    </>
  );
};

export default Index;

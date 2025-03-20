import React from "react";


import Imgbanner from "../common/Imgbanner";
import Introducing from "./sections/Introducing";
import Mission from "./sections/Mission";
import WhyMicolights from "./sections/WhyMicolights";

import {banner,intro,whymicolights,vision} from "./data/dataBox"



const Index = () => {
  return (
    <>
      <div className="headerpadding"> </div>
        <Imgbanner data={banner.data} />
      <Introducing data={intro.data} />
      <Mission data={vision.data} />
      <WhyMicolights title={whymicolights.title}  data={whymicolights.data} />
    </>
  );
};

export default Index;

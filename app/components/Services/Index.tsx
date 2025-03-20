import React from "react";


import Imgbanner from "../common/Imgbanner";
import Introducing from "./sections/Introducing";
import Conceptual from "./sections/Conceptual";

import { banner,design } from "./data/dataBox"
import ImageSec from "./sections/ImageSec";



const Index = () => {
  return (
    <>
      <div className="headerpadding"> </div>
        <Imgbanner data={banner.data}/>
      <Introducing data={design.data} />
      <ImageSec />
      <Conceptual  />
    </>
  );
};

export default Index;

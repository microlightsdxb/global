import React from "react";


import Imgbanner from "../common/Imgbanner";
import Conceptual from "./sections/Conceptual";

import { banner,design } from "./data/dataBox"
import ImageSec from "./sections/ImageSec";
import Introducing from "../common/Introducing";



const Index = () => {
  return (
    <div>
      <div className="headerpadding"> </div>
        <Imgbanner data={banner.data}/>
      <Introducing data={design.data} />
      <ImageSec />
      <Conceptual  />
    </div>
  );
};

export default Index;

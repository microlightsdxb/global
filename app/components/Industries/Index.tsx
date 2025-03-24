import React from "react";


import Imgbanner from "../common/Imgbanner";

import { banner,design,consultationData } from "./data/dataBox"
import Strength from "./sections/Strength";
import Introducing from "../common/Introducing";



const Index = () => {
  return (
    <>
      <div className="headerpadding"> </div>
        <Imgbanner data={banner.data}/>
      <Introducing data={design.data} />
      <Strength data={consultationData} />

    </>
  );
};

export default Index;

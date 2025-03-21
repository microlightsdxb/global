import React from "react";
import Banner from "./sections/Banner";
import Longimg from "./sections/Longimg";
import Commitments from "./sections/Commitments";
import {sustainabilityData,items} from "./data/dataBox"
import Certifications from "./sections/Certifications";
import Joinus from "./sections/Joinus";
import OurFuture from "./sections/OurFuture";
const Index = () => {
  return (
    <>
      <div className="headerpadding"> </div>

      <Banner />
      <Longimg />
      <Commitments data={sustainabilityData.data} title={sustainabilityData.title} description={sustainabilityData.description}  />
      <Certifications />
      <OurFuture data={items}  />
      <Joinus />



    </>
  );
};

export default Index;

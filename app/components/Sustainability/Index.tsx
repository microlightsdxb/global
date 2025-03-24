import React from "react";
import Banner from "./sections/Banner";
import Longimg from "./sections/Longimg";
import Commitments from "./sections/Commitments";
import {sustainabilityData,items,joinus,certifications,banner} from "./data/dataBox"
import Certifications from "./sections/Certifications";
import Joinus from "./sections/Joinus";
import OurFuture from "./sections/OurFuture";
const Index = () => {
  return (
    <>
      <div className="headerpadding"> </div>

      <Banner data={banner.data}/>
      <Longimg />
      <Commitments data={sustainabilityData.data} title={sustainabilityData.title} description={sustainabilityData.description}  />
      <Certifications data={certifications.data} />
      <OurFuture data={items}  />
      <Joinus data={joinus.data} />



    </>
  );
};

export default Index;

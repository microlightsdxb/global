import React from "react";
import Banner from "./sections/Banner";
import Blogdetails from "./sections/Blogdetails";
import {Blogcontent} from "./data/dataBox"
const Index = () => {
  return (
    <>
      <div className="headerpadding"> </div>

      <Banner />
      <Blogdetails  data={Blogcontent.data}  />




    </>
  );
};

export default Index;

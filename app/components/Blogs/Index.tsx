import React from "react";
import Banner from "./sections/Banner";
import Bloglist from "./sections/Bloglist";
import { blogdetails ,categories} from "./data/dataBox"
const Index = () => {
  return (
    <>
      <div className="headerpadding"> </div>

      <Banner />
      <Bloglist data={blogdetails} categories={categories} />




    </>
  );
};

export default Index;

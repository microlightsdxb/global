import React from "react";



import { projects,projectDetails,content } from "./data/dataBox"
import MoreProjects from "./sections/MoreProjects";
import Details from "./sections/Details";
import Contents from "./sections/Contents";
import Pjctslider from "./sections/Pjctslider";



const Index = () => {
  return (
    <>
      <div className="headerpadding"> </div>
      <Details data={projectDetails} />
      <Pjctslider />
      <Contents data={content.data} />
      <MoreProjects data={projects} />



    </>
  );
};

export default Index;

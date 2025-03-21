import React from "react";


import Filter from "./sections/Filter";

import { projects } from "./data/dataBox"
import ProjectList from "./sections/ProjectList";



const Index = () => {
  return (
    <>
      <div className="headerpadding"> </div>
      <Filter   />
      <ProjectList data={projects} />



    </>
  );
};

export default Index;

import React from "react";
import Banner from "./sections/Banner";
import TeamList from "./sections/TeamList";
import { teamMembers } from "./data/dataBox"
const Index = () => {
  return (
    <>
      <div className="headerpadding"> </div>

      <Banner />
      <TeamList data={teamMembers} />




    </>
  );
};

export default Index;

"use client";
import React from "react";
import Specs from "./Specs";
import {Physical,general,Lighting,Electrical} from "../data/dataBox"

const PdtSpec = () => {
  return (
    <section className="bg-[#f2f2f2]">
      <div className="container ">
        <div className="py-100  ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap:[30px] lg:gap-[90px]">
            <div className=" ">
            <Specs data={general.data} />
            <Specs data={Physical.data}/>

            </div>
            <div className=" ">
            <Specs data={Lighting.data}/>
            <Specs data={Electrical.data}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PdtSpec;

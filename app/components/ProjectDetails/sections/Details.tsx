"use client";
import React from "react";


interface FrameworkItem {
  data:{
    _id: string;
    name: string;
    client: string;
    location: string;
    industry: string;
    scope: string;
    description: string;
    images: string[];
  }

}

interface FrameworkSectionProps {
  data: FrameworkItem;
}

const Details: React.FC<FrameworkSectionProps> = ({
  data,

}) => {

  return (
    <section className="pt-100 ">
      <div className="container">
        <div className="pb-5 md:pb-8 lg:pb-[77px] border-b border-[#000000]">
          <h2 className="text-2xl text-black  leading-[1.3]">
          {data?.data?.name}
          </h2>
        </div>
        <div className="flex items-center pt-8 pb-9">
      
        <div className="w-1/4">
          <div className="pmargin0">
            <p className="text-sm leading-[2.4]">Client</p>
          </div>
          <h3 className="text-25 font-[500] text-black leading-[1.7]">{data?.data?.client}</h3>
        </div>

        <div className="w-1/4">
          <div className="pmargin0">
            <p className="text-sm leading-[2.4]">Industry</p>
          </div>
          <h3 className="text-25 font-[500] text-black leading-[1.7]">{data?.data?.industry}</h3>
        </div>

        <div className="w-1/4">
          <div className="pmargin0">
            <p className="text-sm leading-[2.4]">Scope</p>
          </div>
          <h3 className="text-25 font-[500] text-black leading-[1.7]">{data?.data?.scope}</h3>
        </div>

        <div className="w-1/4">
          <div className="pmargin0">
            <p className="text-sm leading-[2.4]">Location</p>
          </div>
          <h3 className="text-25 font-[500] text-black leading-[1.7]">{data?.data?.location}</h3>
        </div>
      
    </div>
      </div>
    </section>
  );
};

export default Details;

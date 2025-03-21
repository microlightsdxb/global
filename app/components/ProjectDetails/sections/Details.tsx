"use client";
import React from "react";


interface FrameworkItem {
  id: number;
  label: string;
  value: string;
}

interface FrameworkSectionProps {
  data: FrameworkItem[];
}

const Details: React.FC<FrameworkSectionProps> = ({
  data,

}) => {

  return (
    <section className="pt-100 ">
      <div className="container">
        <div className="pb-5 md:pb-8 lg:pb-[77px] border-b border-[#000000]">
          <h2 className="text-2xl text-black  leading-[1.3]">
          Checkout
          </h2>
        </div>
        <div className="flex items-center pt-8 pb-9">
      {data.map((detail, index) => (
        <div key={index} className="w-1/4">
          <div className="pmargin0">
            <p className="text-sm leading-[2.4]">{detail.label}</p>
          </div>
          <h3 className="text-25 font-[500] text-black leading-[1.7]">{detail.value}</h3>
        </div>
      ))}
    </div>
      </div>
    </section>
  );
};

export default Details;

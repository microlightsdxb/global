"use client";
import React from "react";
import Specs from "./Specs";

interface FrameworkItem {
  _id: string;
  name: string;
  items:{
    title: string;
    value: string;
  }[]
}

interface ProductProps {
  data:{
    name: string;
    thumbnail: string;
    wattage: string;
    lumen: string;
    specifications: FrameworkItem[];
    images: string[];
    type: string;
    file: string;
  }
}

const PdtSpec = ({ data }: { data: ProductProps }) => {
  const divRequired = Math.ceil(data?.data?.specifications.length / 2)
  return (
    <section className="bg-[#f2f2f2]">
      <div className="container ">
        <div className="py-100  ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap:[30px] lg:gap-[90px]">

            {Array.from({ length: divRequired }).map((_, index) => {
              if (divRequired === 1) {
                return data?.data?.specifications.map((item: FrameworkItem, i: number) => (
                  <Specs key={i} data={item} />
                ));
              } else {
                const items = data?.data?.specifications.slice(index * 2, index * 2 + 2);
                return (
                  <div key={index}>
                    {items.map((item:FrameworkItem, i:number) => <Specs key={i} data={item} />)}
                  </div>
                );
              }
            })}

          </div>
        </div>
      </div>
    </section>
  );
};

export default PdtSpec;

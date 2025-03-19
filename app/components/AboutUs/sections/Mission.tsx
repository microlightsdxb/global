"use client";
import React from "react";
import Image from "next/image";

import { assets } from "@/public/assets/assets";

interface FrameworkItem {
  id: number;
  title: string;
  dec: string;
  icon: string;
}

interface FrameworkSectionProps {
  data: FrameworkItem[];
}



const Mission: React.FC<FrameworkSectionProps> = ({
  data,

}) => {

  return (
    <>
    <Image src={assets.bnsc} alt=""></Image>
    <section style={{background: `url(${assets.bgstabt.src})`, backgroundPositionY: '-6px'}}>
      <div className="container">
        <div className=" py-[60px] lg:py-[90px] xl:py-[120px] 2xl:py-[151px]  ">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-[40px]">

              {data.map((framework) => (
                <div key={framework.id}>
                  <Image src={framework.icon} alt=""   className="h-[45px] md:h-[45px] lg:h-[45px] xl:h-[75px] w-auto"></Image>
                  <div className="border-b-1 border-[#fff]  mt-[20px] md:mt-[40px] mb-[20px] md:mb-[44px] "></div>
                  <h3 className="text-xl text-white mb-[11px]">{framework.title}</h3>
                  <p className="text-white text-sm font-light">{framework.dec}</p>
                </div>
              ))}
        </div>
       </div>
      </div>
      </section>
    </>
  );
};

export default Mission;

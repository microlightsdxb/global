'use client'
import React from "react";

import Image from "next/image";

const industies = [
  {
    name : "Retail",
    icon : "/assets/img/icons/retail.svg"
  },
  {
    name : "Commercial",
    icon : "/assets/img/icons/commercial.svg",
  },
  {
    name : "Architectural",
    icon : "/assets/img/icons/retail.svg",
  },
  {
    name : "Public Spaces",
    icon : "/assets/img/icons/public-spaes.svg",
  },
  {
    name : "Residential",
    icon : "/assets/img/icons/residential.svg",
  },
  {
    name : "Industrial",
    icon : "/assets/img/icons/industrial.svg",
  },
  {
    name : "Hospitality",
    icon : "/assets/img/icons/hospitality.svg",
  }
]



const IndustrySec = () => {
  return (
    <section className="section-spacing text-white bg-black h-[150vh] overflow-hidden">
      <div className="container">
        <div className="oveflow-hidden">
          <h2 className="text-xl mb-[60px]">Industries Served</h2>
        </div>
        <div className="bomsx grid grid-cols-3 ">
            {industies.map((industry, i) => (
              <div
              className="bitms border-r border-b border-[#595959] border-l border-t relative overflow-hidden group cursor-pointer p-[50px]"  key={i}>
                <figure className="absolute w-full h-[0px] inset-0 z-[0] before:content-[]  before:absolute before:w-full before:h-full before:bg-gradient-to-t before:from-black/80 before:to-transparent transition-all ease-in-out duration-300 top-[50%] -translate-y-[50%] group-hover:h-full overflow-hidden">
                  <Image src={'/assets/img/home/hov-s.jpg'} width={600} height={600} alt=""/>
                  
                </figure>
                <Image src={industry.icon} width={100} height={75} className="w-auto mb-[90px] z-[10] relative" alt={industry.name}/>
                <h3 className="text-lg z-[1]  relative">{industry.name}</h3>
            </div>
            ))}
            
          
          </div>
      </div>
    </section>
  );
};

export default IndustrySec;

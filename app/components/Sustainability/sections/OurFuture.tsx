"use client";
import { assets } from "@/public/assets/assets";
import React,{useState} from "react";
import Image from "next/image";

interface FrameworkItem {
  id: number;
  title: string;
  description: string;
}

interface FrameworkSectionProps {
  data: FrameworkItem[];
}



const OurFuture: React.FC<FrameworkSectionProps> = ({
  data,

}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(1);


  return (
    <>
      <section className="py-100  ">
        <div className="container">
          <div>
            <div className="text-center  mb-6 md md:mb-10 lg:mb-18">
              <h2 className="text-xl text-black leading-[1.3] mb-4 md:mb-5">
                Our Future Goals
              </h2>
              <p className="font-[300] text-[555555]">
                Looking ahead, Microlights Group is committed to advancing our
                sustainability initiatives
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-15 lg:gap-[50px] 2xl:gap-[83px]">
              <div className="   ">
                <Image src={assets.sufe} alt="" />
              </div>
              <div className="border-y border-[#00000010]">
      {data.map((item, index) => (
        <div
          key={item.id}
          className={`py-5 lg:py-10 border-b border-[#00000010] pmargin0 transition-all duration-300 ${
            activeIndex === index ? "bg-[#F1F6F0]" : ""
          }`}
          onMouseEnter={() => setActiveIndex(index)}
        >
          <div className={`border-l-4  ${
                  activeIndex === index ? " border-[#000]" : "border-[transparent]"
                }`}>
            <div className="ps-5 md:ps-10 lg:ps-13">
              <p className="text-lg text-black leading-[1.4]">{item.title}</p>
              <p
                className={`text-[#555555]  detailsec transition-opacity duration-300 ${
                  activeIndex === index ? "opacity-100 visible h-full pt-5" : "opacity-0 invisible h-0"
                }`}
              >
                {item.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurFuture;

"use client";
import React from "react";
import Image from "next/image";


interface FrameworkItem {
  id: number;
  title: string;
  dec: string;
  icon: string;
  decimg?: string;
}

interface FrameworkSectionProps {
  title: string;
  data: FrameworkItem[];
}



const WhyMicolights: React.FC<FrameworkSectionProps> = ({
  title,
  data,

}) => {
  return (
    <div>
      <section className="bg-[#f2f2f2]">
        <div className="container">
          <div className=" pb-[50px] lg:pb-[80px] xl:pb-[100px] 2xl:pb-[130px] pt-[50px] lg:pt-[60px] xl:pt-[80px] 2xl:pt-[110px] ">
            <h2 className="text-xl text-black mb-[20px] md:mb-[57px] leading-[1.3]">
             {title}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[40px] lg:gap-[77px]">

              {data.map((framework) => (
                <div key={framework.id}>
                  <Image
                    src={framework.icon}
                    alt=""
                    height={52}
                  ></Image>
                  <div className="border-b-1 border-black mt-[20px] md:mt-[40px] mb-[20px] md:mb-[30px] "></div>
                  <h3 className="text-lg text-black leading-[1.4] mb-[15px] md:mb-[25px]">
                    {framework.title}
                  </h3>
                  <p className="text-xs font-[300] leading-[1.8]">
                    {framework.dec}
                  </p>
                  {framework.decimg && <Image
                    className="mt-3 md:mt-[30px]"
                    src={framework.decimg}
                    alt=""

                  ></Image>
                  }

                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyMicolights;

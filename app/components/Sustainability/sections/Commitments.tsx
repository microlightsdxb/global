"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";

interface FrameworkItem {
  id: number;
  title: string;
  image: StaticImageData;
  description: string;
}

interface FrameworkSectionProps {
  description: string;
  title: string;
  data: FrameworkItem[];
}



  const Commitments: React.FC<FrameworkSectionProps> = ({ description,title, data }) => {

  return (
    <section className="pb-150 ptc-130">
        <div className="container">
      <h2 className="text-xl text-black leading-[1.3] max-w-[22ch] mb-3 md:mb-4">
        {title}
      </h2>
      <p className="font-[300]">
        {description}
      </p>
      <div className="bg-[#052500] p-12 mt-9">
        <h3 className="text-40 text-white mb-3">Sustainability Practices</h3>
        <p className="text-[#B8B8B8] font-[300]">
          We integrate sustainability across all aspects of our operations:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-0 md:gap-3 lg:gap-[4] xl:gap-[40px] mt-6 lg:mt-10">
          {data.map((practice) => (
            <div key={practice.id} className="mb-8 md:mb-5 lg:mb-0">
               <Image src={practice.image} alt={practice.title} />
              <div className="border-t border-white mt-10 "></div>
              <div className="pt-8">
                <h4 className="text-lg text-white mb-6 leading-[1.2]">{practice.title}</h4>
                <p className="text-[#B8B8B8] font-[300]">{practice.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </section>
  );
};

export default Commitments;

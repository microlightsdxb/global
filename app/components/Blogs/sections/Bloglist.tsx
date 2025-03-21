"use client";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";

interface FrameworkItem {
  category: string;
  id: number;
  title: string;
  date: string;
  image: StaticImageData;
}

interface FrameworkSectionProps {
  categories: string[];
  data: FrameworkItem[];
}

const Bloglist: React.FC<FrameworkSectionProps> = ({ data, categories }) => {
  const [activeTab, setActiveTab] = useState("View All");

  const filteredData =
    activeTab === "View All"
      ? data
      : data.filter((member) => member.category === activeTab);

  return (
    <>
      <section className="ptc-130 pb-10  ">
        <div className="container">
          <div className="flex flex-wrap gap-3 md:gap-6 lg:gap-10 border-b">
        {categories.map((category) => (
          <div
            key={category}
            className={`p-2 cursor-pointer relative top-[2px] text-black border-b-3 border-[transparent] transition-all duration-500 hover:border-b-3 hover:border-black ${
              activeTab === category ? "border-black" : ""
            }`}
            onClick={() => setActiveTab(category)}
          >
            <p  >{category}</p>
          </div>
        ))}
      </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 team-grid gap-x-5 lg:gap-x-10">
            {filteredData.map((member, index) => (
              <div key={index} className="teammem mt-10 lg:-20 xl:mt-30">
                <div className="evecont">
                  <Image
                    src={member.image}
                    alt={member.category}
                    width={300}
                    height={300}
                    className="w-full h-auto  "
                  />
                </div>
                <div className="flex justify-between items-center pmargin0 py-5">
                  <p className="text-[15px]">{member.category}</p>
                  <p className="text-[15px]">{member.date}</p>
                </div>
                <div className="pb-5 md:pb-8 lg:pb-[48px] border-b">
                  <p className="text-lg text-black leading-[1.4]">
                    {member.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="container">
        <div className="border-b border-black"></div>
      </div>
    </>
  );
};

export default Bloglist;

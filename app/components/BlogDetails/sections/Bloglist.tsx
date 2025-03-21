"use client";
import React from "react";
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

const Bloglist: React.FC<FrameworkSectionProps> = ({ data }) => {

  const filteredData =  data
        .filter((member) => member)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3);

  return (
    <>
      <section className="pt-3  ">
        <div className=" ">
<div className="pmargin0">
            <p className="text-lg text-black pt-4 lg:pt-8 pb-4 lg:pb-6 border-t border-black mt-5 md:mt-12">Recent Blogs</p>
            </div>
          <div className=" ">
            {filteredData.map((member, index) => (
              <div key={index} >
                <div className="evecont h-[300px] overflow-hidden"  >
                  <Image
                    src={member.image}
                    alt={member.category}
                    className="w-full h-auto object-center object-cover"
                  />
                </div>
                <div className="pt-2 md:pt-3 lg:pt-4 ">
                  <p className=" text-black leading-[1.4]  ">
                    {member.title}
                  </p>
                </div>
                <div className="flex justify-between items-center pmargin0 pt-5 pb-8 border-b mb-5 md:mb-10">
                  <p className="text-[15px]">{member.category}</p>
                  <p className="text-[15px]">{member.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
};

export default Bloglist;

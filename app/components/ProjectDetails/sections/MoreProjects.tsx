"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";
import { motion } from "framer-motion";



interface FrameworkItem {
  data: {
    id: number;
    name: string;
    category: string;
    location: string;
    thumbnail: string;
    industry: string;
    slug: string;
  }[]
}

interface FrameworkSectionProps {
  data: FrameworkItem;
  industry: string;
  projectName: string;
}

const MoreProjects: React.FC<FrameworkSectionProps> = ({
  data,
  industry,
  projectName
}) => {

  const [filteredData, setFilteredData] = useState<{ id: number; name: string; category: string; location: string; thumbnail: string; industry: string; slug: string }[]>([]);

  useEffect(() => {
    if (data?.data) {
      setFilteredData(() => data?.data?.filter((item: { industry: string }) => item?.industry === industry).filter((item: { name: string }) => item?.name !== projectName).sort(() => Math.random() - 0.5).slice(0, 2))
    }
  }, [data, industry, projectName])



  return (
    <section className=" ">
      <div className="container border-b border-[#000000]">
        <motion.h2 className="text-xl text-black mb-[45px] md:mb-[57px] leading-[1.3]"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.5 }}>
          More From {industry}</motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[40px]">
          {filteredData.map((project, index) => (
            <Link href={`/project-details/${project.slug}`} key={index} className="group">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            >
              <div className="mb-10">
                <figure className="h-[325px] md:h-[380px]  lg:h-[425px] xl:h-[475px] w-full">
                  <Image
                    className="h-full w-full object-cover object-center"
                    src={project.thumbnail}
                    alt={project.name}
                    width={400}
                    height={400}
                  />
                </figure>
              </div>
              <div className="flex items-center justify-between border-b border-[#00000010] pb-3">
                <div className="flex gap-5">
                    <p>{project.industry}</p>
                    {/* <p>-</p> <p>{project.location}</p> */}
                </div>
                <div>
                  <div className="flex group-hover:flex transition-all ease-in-out duration-500 justify-end">
                    <div
                      className="flex gap-[20px] items-center justify-end text-white border-t border-black text-sm w-[61px] border-solid leading-none pt-[12px] cursor-pointer group"
                    >
                      <FiArrowUpRight className="text-[22px] text-[#7D7D7D] group-hover:scale-125 transition-all ease-in-out duration-500" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 mb-4 md:mb-6 xl:mb-20">
                <h2 className="text-lg text-black leading-[1.4]">{project.name}</h2>
              </div>
            </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoreProjects;

"use client";
import React, { Dispatch, SetStateAction, useEffect } from "react";

import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";
import { motion } from "framer-motion";






interface FrameworkItem {
    _id: string;
    name: string;
    category: string;
    location: string;
    thumbnail: string;
    industry: string;
    images: string[];
  }


interface FrameworkSectionProps {
  data: FrameworkItem[];
  setNewVisible: Dispatch<SetStateAction<number>>;
  newVisible:number;
  limit:number
  buttonVisible:boolean;
  setButtonVisible: Dispatch<SetStateAction<boolean>>;
}

const ProjectList: React.FC<FrameworkSectionProps> = ({
  data,
  setNewVisible,
  newVisible,
  limit,
  buttonVisible,
  setButtonVisible
}) => {



  useEffect(()=>{
    if(!data) return
    console.log(newVisible+limit<=data?.length)
    console.log(newVisible)
    if(newVisible+limit<=data?.length){
      setButtonVisible(true)
    }else{
      setButtonVisible(false)
    }
  },[newVisible,data])

  return (
    <section className=" ">
      <div className="container">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[40px]">
      {data?.map((project) => (
        <Link href={`/project-details/${project._id}`} key={project._id}>
          <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
            viewport={{ once: false, amount: 0.5 }}
          className="group">
          <div className="mb-10 ">
          <figure className="h-[325px] md:h-[380px] lg:h-[425px] xl:h-[475px] w-full overflow-hidden">
            <motion.div
              className="h-full w-full"
            >
              <Image
                className="h-full w-full object-cover object-center   group-hover:scale-[1.1] transition-all ease-in-out duration-500"
                src={project.thumbnail}
                alt={project.name}
                width={950}
                height={950}
              />
            </motion.div>
          </figure>
          </div>
          <div className="flex items-center justify-between border-b border-[#00000010] pb-3">
            <div className="flex gap-5">
              <p>{project.industry}</p> <p>-</p> <p>{project.location}</p>
            </div>
            <div>
              <div className="flex group-hover:flex transition-all ease-in-out duration-500 justify-end">
                <div

                        className="flex gap-[20px] items-center justify-end text-white border-t border-black text-sm w-[61px] border-solid leading-none pt-[12px] cursor-pointer group-hover:text-black group-hover:border-black"
                >
                  <FiArrowUpRight className="text-[22px] text-[#7D7D7D] group-hover:text-black group-hover: scale-125 transition-all ease-in-out duration-500" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 mb-4 md:mb-6 xl:mb-20">
            <h2 className="text-lg text-black leading-[1.4]">{project.name}</h2>
          </div></motion.div>
        </Link>
      ))}
        </div>
        {buttonVisible && <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.5 }}
          onClick={() => {
            setNewVisible(newVisible+8)
          }}
        >
        <div className="pb-100 border-b border-black cursor-pointer">
            <div className="py-7 text-center text-black bg-[#D9D9D9] max-w-[220px] md:max-w-[370px] m-auto pb">Load More</div></div>
          </motion.div>}
      </div>
    </section>
  );
};

export default ProjectList;

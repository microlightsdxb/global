"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { moveUp, staggerContainer } from "../../scrollanims";


interface FrameworkItem {
    name: string;
    designation: string;
    image: string;
    imageAlt: string;
}

interface FrameworkSectionProps {
  data: FrameworkItem[];
}
const TeamList: React.FC<FrameworkSectionProps> = ({
  data

}) => {
  return (
    <>
    <section className="ptc-130 pb-10  ">
      <div className="container">
        <h2 className="text-xl leading-[1.3] mb-4 md:mb-15"> Our Team</h2>
        <motion.div initial="hidden" whileInView="show" variants={staggerContainer} viewport={{once:true, amount:0.2}} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 team-grid ">
      {data?.map((member, index) => (
        <motion.div variants={moveUp}
          key={index}
          className="teammem border-b pb-7 hover:border-[#000] hover:border-b-2 transition-all duration-500 mb-10 md:mb-15 lg:mb-20"
        >
          <div className="teamover">
          <Image
            src={member.image}
            alt={member.imageAlt}
            width={300}
            height={300}
            className="w-full h-auto "
            />
          </div>
          <p className="text-lg text-black leading-[1.4] mt-5 md:mt-10 mb-2">
            {member.name}
          </p>
          <p>{member.designation}</p>
        </motion.div>
      ))}
    </motion.div>
      </div>
      </section>
      <div className="container">
        <div className="border-b border-black"></div>
        </div>
      </>
  );
};

export default TeamList;

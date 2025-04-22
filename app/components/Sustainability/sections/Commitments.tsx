"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sustainability } from "@/types/Sustainability";


interface FrameworkSectionProps {
  data: Sustainability;
}



  const Commitments: React.FC<FrameworkSectionProps> = ({data }) => {

  return (
    <section className="pb-150 ptc-130">
        <div className="container">
        <motion.h2 className="text-xl text-black leading-[1.3] max-w-[22ch] mb-3 md:mb-4"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.5 }}>    {data.data.sectionTwoTitle}</motion.h2>
        <motion.p className="font-[300] max-w-[105ch] leading-[1.7]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.5 }}>
        {data.data.sectionTwoDescription}
      </motion.p>
      <div className="bg-[#052500] p-5 mt-9 md:p-15 ">
          <motion.h3 className="text-40 text-white mb-3"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.5 }}>  Sustainability Practices</motion.h3>
          <motion.p className="text-[#B8B8B8] font-[300] "
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.5 }}>
          We integrate sustainability across all aspects of our operations:
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-0 md:gap-3 lg:gap-[4] xl:gap-[40px] mt-10 lg:mt-10">
      {data.data.practices.map((practice, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          className="mb-10 md:mb-5 lg:mb-0"
        >
          <Image
            src={practice.icon}
            alt={practice.iconAlt}
            className="rounded-lg h-10"
            width={30}
            height={30}
          />
          <div className="border-t border-white mt-5 md:mt-10"></div>
          <div className="pt-3 md:pt-8">
            <h4 className="text-lg text-white mb-3 md:mb-6 leading-[1.3]">
              {practice.title}
            </h4>
            <p className="text-[#B8B8B8] font-[300] leading-[1.7]">
              {practice.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
      </div>
    </div>
    </section>
  );
};

export default Commitments;

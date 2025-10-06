"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sustainability } from "@/types/Sustainability";
import { moveUp, staggerContainer } from "../../scrollanims";

interface FrameworkSectionProps {
  data: Sustainability;
}

const Certifications: React.FC<FrameworkSectionProps> = ({
  data,

}) => {
  return (
    <section className="py-100 bg-[#F1F6F0]">
      <div className="container">
        <motion.h2 className="text-xl text-black leading-[1.3] mb-4 md:mb-12"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.5 }}>
          Certifications & Standards
        </motion.h2>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{once:true, amount:0.2}} className="grid grid-cols-1 md:grid-cols-2  border border-[#00000015]">
          {data.data.certifications.map((item) => (

            <motion.div
              key={item.title} variants={moveUp} className="p-5 md:p-10 border-r border-[#00000015] last:border-r-0">
              <div className="flex gap-5 h-20 w-20">
                {item.images.map((image) => (
                  <Image src={image} alt="" key={image} width={80} height={80} className="object-cover h-full w-full" />
                ))}
              </div>
              <div className="border-t   mt-10 "></div>
              <div className="pt-8">
                <h4 className="text-lg text-black mb-5 leading-[1.2]">
                  {item.title}
                </h4>
                <p className="text-[#555555] font-[300] leading-[1.7]">
                  {item.description}
                </p>
              </div>

            </motion.div>
          ))}

        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;

"use client";
import { motion } from "framer-motion";
import React from "react";
import { Sustainability } from "@/types/Sustainability";
import parse from "html-react-parser";

  interface FrameworkSectionProps {
  data: Sustainability;
}

const Banner: React.FC<FrameworkSectionProps> = ({
  data,

}) => {
  return (
    <section className="ptc-213 pb-100 relative bg-[#F1F6F0] overflow-hidden">
      <div className="container ">
        
        <div className="lg:flex">
          <div className="w-full lg:w-1/2 mb-5 lg:mb-0">
          <motion.p className="text-2xl text-black max-w-[14ch] leading-[1.15]"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.5 }}> {data.data.introTitle}</motion.p>
          </div>
          <div className="w-full lg:w-1/2">
          <motion.div className="font-[300] leading-[1.7]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.5 }}>
            {parse(data.data.introDescription || "")}
            </motion.div>
          </div>
          </div>
      </div>
    </section>
  );
};

export default Banner;

"use client";
import { assets } from "@/public/assets/assets";
import { Sustainability } from "@/types/Sustainability";
import { motion } from "framer-motion";
import React from "react";

interface FrameworkSectionProps {
  data: Sustainability;
}

const Joinus: React.FC<FrameworkSectionProps> = ({
  data,

}) => {
  return (
    <>
     <section className="py-[50px] lg:py-[60px] xl:py-[80px] 2xl:py-[150px] ">
        <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
            viewport={{ once: false, amount: 0.5 }}>
            
              <div className="py-90 px-8 md:px-10 lg:px-25   bg-cover bg-center" style={{ background: `url(${assets.fbanner.src})` }} >
                <h2 className="text-xl text-white leading-[1.3] mb-4 md:mb-5">
                  {data?.data?.outroTitle}
                </h2>
                <div className="text-white font-[300] leading-[1.7]">
                  
                    <div>
                      {data?.data?.outroDescription}
                    </div>
                  </div>
              </div>
        </motion.div>
      </div>
      </section>
      <div className="container">
      <div className="border-b border-[#000000]"></div></div>
    </>
  );
};

export default Joinus;

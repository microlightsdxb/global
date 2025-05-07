"use client";
import { About } from "@/types/About";
import { motion } from "framer-motion";
import React from "react";


interface FrameworkSectionProps {
  data?: About;
}


const Banner: React.FC<FrameworkSectionProps> = ({
  data

}) => {

console.log(data)
  return (
    <section>

      
        <div
          className="relative gd-blacktrans"
          style={{
            backgroundImage: `url(${data?.banner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <img src={'assets/img/tandc/tandcbanner.avif'} alt={data?.bannerAltTag} className="hidden"/>
          <div className="container relative z-1">
            <div className="  pt-[190px] md:pt-[280px] lg:pt-[343px] pb-[30px] md:pb-[50px] lg:pb-[93px]">
            <motion.h1 className="text-white text-2xl leading-[1.2]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.5 }}>
             About Us</motion.h1>
            </div>
          </div>
        </div>
  </section>

  );
};

export default Banner;

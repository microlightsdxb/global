"use client";
import { About } from "@/types/About";
import { motion } from "framer-motion";
import React from "react"; 
import Image from "next/image";
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
        
       
      >
        <Image src={data?.banner || ''} alt={data?.bannerAltTag || ''} fill fetchPriority="high"    className="absolute top-0 left-0 w-full h-full max-h-[505px] object-cover" />
        <div className="container relative z-1">
          <div className="  pt-[190px] md:pt-[280px] lg:pt-[343px] pb-[30px] md:pb-[50px] lg:pb-[93px]">
            <motion.h1 className="text-white text-2xl leading-[1.2]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.5 }}>
              About Us</motion.h1>
          </div>
        </div>
      </div>
    </section>

  );
};

export default Banner;

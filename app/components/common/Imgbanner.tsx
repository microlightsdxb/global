"use client";
import { Service } from "@/types/Service";
import { motion } from "framer-motion";
import React from "react";


interface FrameworkSectionProps {
  data: Service;
}



const Imgbanner: React.FC<FrameworkSectionProps> = ({
  data

}) => {

  console.log(data)
  return (
    <section>


      <div
        className="relative gd-blacktrans"
        style={{
          backgroundImage: `url(${data?.pageBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <img src={data?.pageBanner} alt={data?.bannerAlt} className="hidden" />
        <div className="container relative z-1">
          <div className="pt-[190px] md:pt-[280px] lg:pt-[343px] pb-[30px] md:pb-[50px] lg:pb-[93px]">
            <motion.h1 className="text-white text-2xl leading-[1.2]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.5 }}>
              {data?.name}</motion.h1>
          </div>
        </div>
      </div>
    </section>

  );
};

export default Imgbanner;

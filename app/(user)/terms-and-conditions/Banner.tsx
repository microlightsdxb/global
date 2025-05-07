"use client";
import { motion } from "framer-motion";
import React from "react";




const Banner = ({
}) => {

  return (
    <section>

      
        <div
          className="relative gd-blacktrans"
          style={{
            backgroundImage: `url(${'/assets/img/tandc/tandcbanner.webp'})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* <img src={data?.banner} alt={data?.bannerAltTag} className="hidden"/> */}
          <div className="container relative z-1">
            <div className="  pt-[190px] md:pt-[280px] lg:pt-[343px] pb-[30px] md:pb-[50px] lg:pb-[93px]">
            <motion.h1 className="text-white text-2xl leading-[1.2]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.5 }}>
             Terms and Conditions</motion.h1>
            </div>
          </div>
        </div>
  </section>

  );
};

export default Banner;

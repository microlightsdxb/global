"use client";
import React from "react";
import {motion} from "framer-motion";
const Banner = ({}) => {
  return (
    <section className="pt-20 md:pt-20 lg:pt-30 xl:pt-40 pb-100 relative bg-[#f8f8f8] overflow-hidden">
      <div className="container ">
        <div className=" lg:flex">
          <div className="w-full lg:w-1/2 mb-5 lg:mb-0">
            <motion.div className="flex gap-6 lg:gap-10 border-b border-black w-fit pb-8 pmargin0"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.5 }}>
            <p>Dec 11, 2024</p>
              <p>Trends</p>
              </motion.div>
          </div>
          <div className="w-full lg:w-1/2">
          <motion.div className="text-white text-2xl leading-[1.2]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.5 }}>
            <p className="text-2xl text-black leading-[1.18]">
            5 Eye Catching Lighting Solution Examples
              </p>
              </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;

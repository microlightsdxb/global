"use client";
import React from "react";
import {motion} from "framer-motion";
const Banner = ({}) => {
  return (
    <section className="ptc-213 pb-100 relative bg-[#f8f8f8] overflow-hidden">
      <div className="container ">
        <div className="lg:flex items-center">
          <div className="w-full lg:w-1/2 mb-5 lg:mb-0">
          <motion.div className="flex gap-6 lg:gap-10 border-b border-black w-fit pb-8 pmargin0"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.5 }}>
              <p className="text-2xl text-black">Blogs</p>
              </motion.div>
          </div>
          <div className="w-full lg:w-1/2">
          <motion.div  initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.5 }}>
            <p className="font-[300] leading-[1.7]">
              Stay updated on the latest trends and insights in lighting
              solutions. We cover a wide range of topics, including industry
              news, analysis, and insights.
              </p>
              </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;

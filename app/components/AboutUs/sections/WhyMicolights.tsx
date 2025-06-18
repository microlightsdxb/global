"use client";
import React from "react";
import Image from "next/image";

import { motion } from "framer-motion";
import { About } from "@/types/About";




const WhyMicolights = ({
  data,
}: { data: About }) => {
  return (
    <div>
      <section className="bg-[#f2f2f2]">
        <div className="container">
          <div className=" pb-[50px] lg:pb-[80px] xl:pb-[100px] 2xl:pb-[130px] pt-[50px] lg:pt-[60px] xl:pt-[80px] 2xl:pt-[110px] ">
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.5 }} className="text-xl text-black mb-[20px] md:mb-[57px] leading-[1.3]">
              Why Micolights?
            </motion.h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[40px] lg:gap-[77px]">

              {data?.whyItems?.map((framework, index) => (
                <motion.div
                  key={framework._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    initial={{ opacity: 0.7, scale: 1 }}
                    animate={{ opacity: 1, scale: 1, y: [0, -3, 0] }} // Moves up and down
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  >
                    <Image src={framework.icon} alt={framework.iconAltTag} height={52} width={52} className="h-[52px]" />
                  </motion.div>


                  <motion.div
                    className="border-b border-black mt-[20px] md:mt-[40px] mb-[20px] md:mb-[30px]"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    style={{ transformOrigin: "left" }}
                  ></motion.div>

                  <motion.h3
                    className="text-lg text-black leading-[1.4] mb-[15px] md:mb-[25px]"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    {framework.title}
                  </motion.h3>

                  <motion.p
                    className="text-xs font-[300] leading-[1.8]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    {framework.description}
                  </motion.p>

                  {framework.bottomIcon && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <Image className="mt-3 md:mt-[30px]" src={framework.bottomIcon} alt="" width={100} height={100} />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyMicolights;

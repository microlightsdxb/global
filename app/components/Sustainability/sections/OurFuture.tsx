"use client";
import { motion } from "framer-motion";
import { assets } from "@/public/assets/assets";
import React, { useState } from "react";
import Image from "next/image";
import { Sustainability } from "@/types/Sustainability";
import { moveUp, staggerContainer } from "../../scrollanims";

interface FrameworkSectionProps {
  data: Sustainability;
}

const OurFuture: React.FC<FrameworkSectionProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <>
      <section className="pt-100  ">
        <div className="container">
          <div>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="text-center  mb-6 md md:mb-10 lg:mb-18">
              <motion.h2 variants={moveUp} className="text-xl text-black leading-[1.3] mb-4 md:mb-5">
                {data?.data?.goals?.title}
              </motion.h2>
              <motion.p variants={moveUp} className="font-[300] text-[555555]">
                {data?.data?.goals?.description}
              </motion.p>
            </motion.div>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 lg:grid-cols-2 items-center gap-5 lg:gap-[50px] 2xl:gap-[83px]">
              <motion.div variants={moveUp} className="h-[300px] lg:h-[600px] 2xl:h-[700px] w-full">
                <Image
                  src={data?.data?.goals?.items[activeIndex]?.image || assets.sufe}
                  alt={data?.data?.goals?.items[activeIndex]?.iconAlt || ""}
                  className="transition-all duration-500 ease-in-out w-full h-full object-cover"
                  width={1000}
                  height={1000}
                />
              </motion.div>
              <motion.div variants={moveUp} className="border-y border-[#00000010]">
                <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
                  {data?.data?.goals?.items?.map((item, index) => (
                    <motion.div variants={moveUp} key={index}
                      className={`py-5 lg:py-10 border-b border-[#00000010] pmargin0 transition-all duration-300 ${activeIndex === index ? "bg-[#F1F6F0]" : ""
                        }`}
                      onMouseEnter={() => setActiveIndex(index)}
                    >
                      <div
                        className={`border-l-4  ${activeIndex === index
                          ? " border-[#000]"
                          : "border-[transparent]"
                          }`}
                      >
                        <div className="ps-5 md:ps-10 lg:ps-13 flex gap-2 items-center">
                          <Image src={item.icon} alt={item.iconAlt} width={50} height={50} />
                          <p className="text-lg text-black leading-[1.4]">
                            {item.title}
                          </p>
                          {/* <p
                          className={`text-[#555555]  detailsec transition-opacity duration-300 ${
                            activeIndex === index
                              ? "opacity-100 visible h-full pt-5"
                              : "opacity-0 invisible h-0"
                          }`}
                        >
                          {item.description}
                        </p> */}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>


          </div>
        </div>
      </section>
    </>
  );
};

export default OurFuture;

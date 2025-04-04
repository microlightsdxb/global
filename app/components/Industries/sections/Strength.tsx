"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";
import { motion } from "framer-motion";

interface FrameworkItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  url?: string;
  aicon: string;
}

interface FrameworkSectionProps {
  data: FrameworkItem[];
}

const Strength: React.FC<FrameworkSectionProps> = ({ data }) => {
  const [animateIcon, setAnimateIcon] = useState(-1);
  return (
    <>
      <section className="bg-[#f2f2f2]">
        <div className="container ">
          <div className="pt-[50px] lg:pt-[60px] xl:pt-[80px] 2xl:pt-[150px] pb-10  ">
          <motion.div
            className="space-y-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
              {data.map((item, index) => (

                  <motion.div
                key={item.id}
                className="group mb-[70px] md:mb-0 last:mb-[40px]"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay:  0.1 }}
                viewport={{ once: true }}
                onMouseOver={()=>setAnimateIcon(index)}
              >
                  <div className="w-[85px] h-[85px] p-4 md:p-0 md:w-[115px] md:h-[115px] group-hover:bg-black rounded-full border border-[#00000015] flex justify-center items-center bg-[#f2f2f2] relative z-1">
                    {animateIcon === index ? <Image src={item.aicon} alt="" /> : <Image src={item.icon} alt="" />}
                  </div>


                  <div className="relative top-[-43px] md:top-[-56px]">
                    <hr />
                  </div>

                  <div className="w-full md:w-3/5 xl:w-[870px] m-auto">
                    <h3 className="text-lg text-black leading-[1.4] mb-3 lg:mb-5 mt-4 md:mt-0">
                      {item.title}
                    </h3>
                    <p className="text-sm font-[300] mb-0">
                      {item.description}
                    </p>

                    <div className="h-0 group-hover:h-full">
                      <div className="flex mt-[15px] 2xl:mt-[30px] md:opacity-0 group-hover:opacity-100 group-hover:flex transition-all ease-in-out duration-500">
                        <Link
                          href={"/"}
                          className="flex gap-[20px] items-center border-t border-primary text-sm text-primary border-solid leading-none pt-[12px] cursor-pointer group"
                        >
                          Get in Touch{" "}
                          <FiArrowUpRight className="text-[22px] text-[#7D7D7D] group-hover:scale-125 transition-all ease-in-out duration-500" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              </motion.div>
          </div>
        </div>
      </section>
      <div className="container  ">
        <div className="border-b border-black pb-100"> </div>
      </div>
    </>
  );
};

export default Strength;

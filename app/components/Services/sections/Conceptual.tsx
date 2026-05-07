"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "@/public/assets/assets"; 
import { motion } from "framer-motion";
import { Service } from "@/types/Service";
import { moveRight, moveUp, staggerContainer } from "../../scrollanims";

const Conceptual = ({ data }: { data: Service }) => {
  const [activeIndex, setActiveIndex] = useState(1);
 
  useEffect(() => {
    if (typeof window !== "undefined" && data?.method?.items) {
      data.method.items.forEach((item) => {
        const img = new window.Image();
        img.src = item?.image || assets.sufe?.src || '';
      });
    }
  }, [data?.method?.items]);

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.div variants={moveUp} className="bg-[#000] overflow-hidden relative">
        <div className="container-fluid left-spacing">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="py-70 pe-3">
                {data?.method?.items?.map((item, index: number) => (
                  <motion.div
                    key={index}
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                    className={`flex items-center gap-5 pmargin0 py-10 border-b border-[#595959] justify-between pr-0 md:pr-[20px] xl:pr-[60px] transition-all duration-[1200ms] last:border-0
                      ${
                        activeIndex === index
                          ? "befst scale-[1.02]"
                          : "scale-100"
                      }`}
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    <motion.div variants={moveRight} className="flex items-center gap-5 overflow-hidden">
                      <p className="text-2xl leading-[1] text-40 transition-all duration-500 ease-in-out">
                        {"0" + (index + 1)}
                      </p>
                      <div className="flex flex-col">
                        <p className="text-white text-lg">{item.title}</p>
                        <div
                          className={`descd transition-all duration-400 ease-in transform ${
                            activeIndex === index
                              ? "opacity-100 h-auto translate-y-0"
                              : "opacity-0 h-0 translate-y-5"
                          }`}
                        >
                          <div className="mt-3">
                            <p className="text-[#9e9e9e]">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    <div className="min-w-[38px] min-h-[25px] hidden md:block">
                      <Image src={assets.arrright} alt="" width={38} height={25} />
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="relative">
                <figure className="absolute w-full h-full border border-[#00000010] flex">
                  <Image
                    className="object-cover object-center h-full w-full" 
                    
                    src={data?.method?.items[activeIndex]?.image || data?.method?.items[activeIndex]?.image}
                    alt={data?.method?.items[activeIndex]?.imageAlt || ""}
                    width={852}
                    height={966}
                    priority // ✅ Add priority to ensure faster loading
                  />
                </figure>
              </div>

            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Conceptual;

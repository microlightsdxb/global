"use client";
import React, { useState } from "react";
import Image from "next/image";
import { assets } from "@/public/assets/assets";
import { motion } from "framer-motion";
import { Service } from "@/types/Service";


const Conceptual = ({ data }: { data: Service }) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  console.log(data)

  return (
    <div>
      <section >
        <motion.div
          className="bg-[#000] overflow-hidden relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}>
          <div className="container-fluid left-spacing">
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 ">
                <div className="py-70">
                  {data?.method?.items?.map((item, index: number) => {
                    const isInitiallyActive = index === 1 && hoveredId === null;
                    const isHovered = hoveredId === index + 1;

                    return (
                      <div
                        key={index}
                        className={`flex items-center gap-5 pmargin0 py-10 border-b border-[#595959] justify-between pr-0 md:pr-[20px] xl:pr-[60px] transition-all duration-300
                        ${isHovered || isInitiallyActive
                            ? "befst  scale-[1.02]"
                            : "scale-100"
                          }`}
                        onMouseEnter={() => setHoveredId(index + 1)}
                        onMouseLeave={() => setHoveredId(null)}
                      >
                        <div className="flex items-center gap-5">
                          <p
                            className={`text-2xl leading-[1] text-40 transition-all duration-500 ease-in-out  `}
                          >
                            {"0" + (index + 1)}
                          </p>
                          <div className="flex flex-col ">
                            <p className="text-white text-lg">{item.title}</p>
                            <div
                              className={`descd transition-all duration-100 ease-in-out transform mt-3 ${isHovered || isInitiallyActive
                                  ? "opacity-100 h-auto translate-y-0"
                                  : "opacity-0 h-0 translate-y-5"
                                }`}
                            >
                              <p>{item.description}</p>
                            </div>
                          </div>
                        </div>
                        <div className="min-w-[38px] min-h-[25px] hidden md:block">
                          <Image src={assets.arrright} alt="" width={38} height={25} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="relative">
                  <figure className="absolute w-full h-full border border-[#00000010] flex">
                    <Image
                      className="object-cover object-center  h-full w-full"
                      src={hoveredId ? data?.method?.items[hoveredId - 1]?.image : data?.method?.items[1]?.image}
                      alt={hoveredId ? data?.method?.items[hoveredId - 1]?.imageAlt : data?.method?.items[1]?.imageAlt}
                      width={1500}
                      height={1500}
                    />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Conceptual;

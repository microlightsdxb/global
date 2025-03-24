"use client";
import { assets } from "@/public/assets/assets";
import { motion } from "framer-motion";
import React from "react";
interface FrameworkItem {
  id: number;
  title: string;
  dec: string[];
}

interface FrameworkSectionProps {
  data: FrameworkItem[];
}

const Joinus: React.FC<FrameworkSectionProps> = ({
  data,

}) => {
  return (
    <>
     <section className="py-[50px] lg:py-[60px] xl:py-[80px] 2xl:py-[150px] ">
        <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
            viewport={{ once: false, amount: 0.5 }}>
            {data.map((item) => (
              <div key={item.id} className="py-90 px-8 md:px-10 lg:px-25   bg-cover bg-center" style={{ background: `url(${assets.fbanner.src})` }} >
                <h2 className="text-xl text-white leading-[1.3] mb-4 md:mb-5">
                  {item.title}
                </h2>
                <div className="text-white font-[300] leading-[1.7]">
                  {item.dec.map((dec) => (
                    <div key={dec}>
                      <p>{dec}</p>
                    </div>
                  ))}
                  </div>
              </div>
            ))}
        </motion.div>
      </div>
      </section>
      <div className="container">
      <div className="border-b border-[#000000]"></div></div>
    </>
  );
};

export default Joinus;

"use client";
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



const Introducing: React.FC<FrameworkSectionProps> = ({
  data,

}) => {
  return (
    <section className="py-90 ">
      <div className="container">

        {data.map((framework) => (
          <div key={framework.id}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px]">
              <div>
              <motion.h2 className="text-xl text-black mb-[45px] md:mb-[57px] leading-[1.3]"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.5 }}>
        {framework.title}</motion.h2>
              </div>
              <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.5 }}>
                  {framework.dec.map((paragraph, index) => (
              <p key={index} className="text-sm leading-[1.7] font-light">{paragraph}</p>
            ))}
                </motion.div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Introducing;

"use client";
import React from "react";
import Image from "next/image";

import {motion} from "framer-motion";

interface FrameworkItem {
  id: number;
  title: string;
  dec: string[];
  icon: string;
}

interface FrameworkSectionProps {
  data: FrameworkItem[];
}



const Introducing: React.FC<FrameworkSectionProps> = ({
  data,

}) => {
  return (
    <section className="section-spacing ">
      <div className="container">

        {data.map((framework) => (
          <div key={framework.id}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px]">
              <div>
              <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.5 }}
                  className="text-xl text-black mb-[45px] md:mb-[57px] leading-[1.3]">{framework.title}</motion.h2>
                  <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                  <Image src={framework.icon} alt="" ></Image>
                  </motion.div>
                </div>
              <div>

                {framework.dec.map((paragraph, index) => (
                     <motion.p
                     key={index}
                     className="text-sm leading-[1.7] font-light"
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.4, delay: index * 0.2 }}
                     viewport={{ once: true }}
                   > {paragraph}</motion.p>
            ))}
                </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Introducing;

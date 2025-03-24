"use client";
import React from "react";
import Image from "next/image";
import {motion} from "framer-motion";

import { assets } from "@/public/assets/assets";
const slideVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};
interface FrameworkItem {
  id: number;
  title: string;
  dec: string;
  icon: string;
}

interface FrameworkSectionProps {
  data: FrameworkItem[];
}



const Mission: React.FC<FrameworkSectionProps> = ({
  data,

}) => {

  return (
    <div>
      <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.4, delay: 0.2 }}
                     viewport={{ once: true }}
                   >
        <Image src={assets.bnsc} alt=""></Image>
        </motion.div>
    <section style={{background: `url(${assets.bgstabt.src})`, backgroundPositionY: '-6px'}}>
      <div className="container">
        <div className=" py-[50px] lg:py-[90px] xl:py-[120px] 2xl:py-[151px]  ">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-[40px] ">

              {data.map((framework) => (
                  <motion.div
                  key={framework.id}
                className="prditm group cursor-pointer "
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={slideVariants}
                custom={framework.id}
              >
                  <Image src={framework.icon} alt=""   className="h-[45px] md:h-[45px] lg:h-[45px] xl:h-[75px] w-auto"></Image>
                  <div className="border-b-1 border-[#fff]  mt-[20px] md:mt-[40px] mb-[20px] md:mb-[44px] "></div>
                  <h3 className="text-xl text-white mb-[11px]">{framework.title}</h3>
                  <p className="text-white text-sm font-light">{framework.dec}</p>

                  </motion.div>
              ))}
        </div>
       </div>
      </div>
      </section>
    </div>
  );
};

export default Mission;

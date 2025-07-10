"use client";
import React from "react";
import {motion} from "framer-motion";




interface FrameworkItem {
  id: number;
  title: string;
  image: string;
}
interface FrameworkSectionProps {
  data: FrameworkItem[];
}



const Banner: React.FC<FrameworkSectionProps> = ({
  data

}) => {


  return (
    <section>

      {data.map((framework) => (
        <div
          className="relative gd-blacktrans" key={framework.id}
          style={{
            backgroundImage: `url(${framework.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <motion.div
      className="container relative z-1"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="pt-[90px] md:pt-[240px] lg:pt-[290px]"> 
        <motion.h1
          className="select-none pointer-events-none text-white text-[100px] md:text-[150px] xl:text-[250px] 2xl:text-[300px] leading-[1] md:leading-[.7]"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {framework.title}
        </motion.h1>
      </div>
    </motion.div>
        </div>
      ))}
  </section>

  );
};

export default Banner;

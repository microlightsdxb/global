"use client";
import React from "react";
import Image from "next/image";

import {motion} from "framer-motion";
import parse from "html-react-parser";
import { About } from "@/types/About";



const Introducing = ({
  data,

}:{data:About}) => {
  return (
    <section className="section-spacing ">
      <div className="container">

          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px]">
              <div>
              <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.5 }}
                  className="text-xl text-black mb-[45px] md:mb-[57px] leading-[1.3]">{data?.introTitle}</motion.h2>
                  <motion.div
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: [0, 10, -10, 0] }} // Moves back and forth
  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
>
  <Image src={data?.introImage} alt={data?.introImageAltTag} width={300} height={300} />
</motion.div>

                </div>
              <div>

                     <motion.div
                     className="text-sm leading-[1.7] font-light"
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.4, delay: 0.2 }}
                     viewport={{ once: true }}
                   > {parse(data?.introDescription || "")}</motion.div>

                </div>
            </div>
          </div>

      </div>
    </section>
  );
};

export default Introducing;

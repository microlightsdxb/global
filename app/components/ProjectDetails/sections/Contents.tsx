"use client";
import React from "react";
import parse from 'html-react-parser';
import { motion } from "framer-motion";

interface FrameworkItem {
  data:{
    description: string;
  }
}

interface FrameworkSectionProps {
  data: FrameworkItem;
}



const Contents: React.FC<FrameworkSectionProps> = ({
  data,

}) => {

  return (
    <section className="pt-100 pb-10 ">
      <div className="container">

          <div className="pb-5 md:pb-8 lg:pb-[77px] border-b border-[#000000]">
               <motion.div
                     className="text-sm leading-[1.7] font-light"
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.4, delay:   0.2 }}
                     viewport={{ once: true }}
                   >{parse(data?.data?.description || "")}</motion.div>
           </div>


      </div>
    </section>
  );
};

export default Contents;

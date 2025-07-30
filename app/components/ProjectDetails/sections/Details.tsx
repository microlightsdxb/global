"use client";
import { motion } from "framer-motion";
import React from "react";
import { Project } from "@/types/Project";



interface FrameworkSectionProps {
  data: Project;
}

const Details: React.FC<FrameworkSectionProps> = ({
  data,

}) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="pt-100 ">
      <div className="container">
        <div className="pb-5 md:pb-8 lg:pb-[77px] border-b border-[#000000]">
          <motion.h2 className="text-2xl text-black  leading-[1.3]"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.5 }}>
            {data?.data.name}
          </motion.h2>
        </div>
        <motion.div
          className="lg:flex items-center pt-8 pb-9"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { label: "Client", value: data?.data.client },
            { label: "Industry", value: data?.data.industry },
            { label: "Scope", value: data?.data.scope },
            // { label: "Location", value: data?.data.location },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="lg:w-1/3"
              variants={fadeInUp}
              transition={{ delay: index * 0.2 }}
            >
              <div className="pmargin0">
                <p className="text-sm leading-[2.4]">{item.label}</p>
              </div>
              <motion.h3
                className="text-25 font-[500] text-black leading-[1.7]"
                whileHover={{ scale: 1.05 }}
              >
                {item.value}
              </motion.h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Details;

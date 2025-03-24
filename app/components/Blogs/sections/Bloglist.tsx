"use client";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import {motion} from "framer-motion";

interface FrameworkItem {
  category: string;
  id: number;
  title: string;
  date: string;
  image: StaticImageData;
}

interface FrameworkSectionProps {
  categories: string[];
  data: FrameworkItem[];
}

const Bloglist: React.FC<FrameworkSectionProps> = ({ data, categories }) => {
  const [activeTab, setActiveTab] = useState("View All");

  const filteredData =
    activeTab === "View All"
      ? data
      : data.filter((member) => member.category === activeTab);

  return (
    <>
      <section className="pt-20 pbc-120">
        <div className="container">
        <motion.div
      className="flex flex-wrap gap-3 md:gap-6 lg:gap-10 border-b"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {categories.map((category) => (
        <motion.div
          key={category}
          className={`p-2 cursor-pointer relative top-[2px] text-black transition-all duration-500 ${
            activeTab === category ? "border-b-3 border-black" : "border-b-3 border-transparent"
          }`}
          onClick={() => setActiveTab(category)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <p>{category}</p>

          {activeTab === category && (
            <motion.div
              className="absolute bottom-0 left-0 w-full h-[3px] bg-black"
              layoutId="underline"
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          )}
        </motion.div>
      ))}
    </motion.div>

    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 team-grid gap-x-5 lg:gap-x-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {filteredData.map((member, index) => (
        <motion.div
          key={index}
          className="teammem mt-10 lg:mt-20 xl:mt-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            className="evecont"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Image
              src={member.image}
              alt={member.category}
              width={300}
              height={300}
              className="w-full h-auto"
            />

          <div
            className="flex justify-between items-center pmargin0 py-5"
          >
            <p className="text-[15px]">{member.category}</p>
            <p className="text-[15px]">{member.date}</p>
          </div>

          <div
            className="pb-5 md:pb-8 lg:pb-[48px] border-b"
          >
            <p className="text-lg text-black leading-[1.4]">{member.title}</p>
          </div>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
        </div>
      </section>
      <div className="container">
        <div className="border-b border-black"></div>
      </div>
    </>
  );
};

export default Bloglist;

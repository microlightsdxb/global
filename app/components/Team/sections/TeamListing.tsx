"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { moveUp, staggerContainer } from "../../scrollanims";


interface FrameworkItem {
  title: string,
  members: [{
    name: string,
    image: string,
    designation: string,
    imageAlt: string
  }]
}

interface FrameworkSectionProps {
  data: FrameworkItem[];
}
const TeamListing: React.FC<FrameworkSectionProps> = ({ data }) => {
  return (
    <>
      <section className="ptc-130 pb-10  ">
        <div className="container">
          <h2 className="text-xl font-medium leading-[1.3] mb-4 md:mb-15"> Our Team</h2>
          <motion.div variants={staggerContainer} viewport={{ once: true, amount: 0.2 }} >
            {data?.map((item, index) => (
              <div key={index}>
                <p className="text-lg font-medium">{item?.title}</p>
                <motion.div variants={staggerContainer} viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 team-grid overflow-hidden relative ">
                  {item?.members?.map((member, index) => (
                    <motion.div variants={moveUp}
                      key={index}
                      className="teammem teamsepaftr border-b-2 pb-7 hover:border-[#000]  transition-all duration-500 mb-10 md:mb-15 lg:mb-20"
                    >
                      <div className="teamover">
                        {member?.image && member?.image != "" ? <Image
                          src={member?.image}
                          alt={member?.imageAlt}
                          width={300}
                          height={300}
                          className="w-full h-auto"
                        /> : <Image
                        src="/assets/img/team/xc 1.png"
                        alt="placeholder"
                        width={300}
                        height={300}
                        className="w-full h-auto "
                        />}
                      </div>
                      <p className="text-lg text-black leading-[1.4] mt-5 mb-2">
                        {member?.name}
                      </p>
                      <div className="max-w-[80%]">
                      <p>{member?.designation}</p>
                      </div>
                    </motion.div>
                  ))}

                </motion.div>
              </div>
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

export default TeamListing;

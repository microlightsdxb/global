"use client";
import React from "react";
import Image from "next/image";
import { assets } from "@/public/assets/assets";
import {categories} from "../data/dataBox"
import Bloglist from "./Bloglist";
import parse from "html-react-parser";
import { motion } from "framer-motion";

interface FrameworkItem {
  data:{
    _id:string,
    title:string,
    image:string,
    content:string,
    category:string,
    createdAt:string,
  }
}

interface RecentBlogItem {
    _id:string,
    title:string,
    image:string,
    category:string,
    createdAt:string,
  }

interface FrameworkSectionProps {
  data: FrameworkItem;
  recentBlogData: RecentBlogItem[];
}

const Blogdetails: React.FC<FrameworkSectionProps> = ({ data, recentBlogData }) => {
  return (
    <>
      <section className="ptc-120 pbc-135  ">
        <div className="container">
          <div className="lg:flex gap-5 lg:gap-10 xl:gap-[70px]">
            <div className="lg:w-4/6 xl:w-7/9">

          <div>
              <div>
                <figure className="w-full h-[300px]   md:h-[400px]   lg:h-[600px] overflow-hidden ">
                  <Image
                    src={data?.data?.image}
                    alt="bnr"
                    className=" w-full   object-cover"
                    width={500}
                    height={500}
                  />
                </figure>
              </div>
                <div className="font-[300] mt-2 md:mt-4 lg:mt-12 pt-4 leading-[1.7]">

              {parse(data?.data?.content || "")}

                </div>
              </div>

            </div>
            <motion.div
              className="lg:w-2/6 xl:w-2/9"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="pmargin0">
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Share
                </motion.p>

                <motion.div
                  className="flex gap-3 mt-5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="w-10 h-10 bg-black flex justify-center items-center rounded-3xl"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image src={assets.lin} alt="LinkedIn" />
                  </motion.div>

                  <motion.div
                    className="w-10 h-10 bg-black flex justify-center items-center rounded-3xl"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image src={assets.insta} alt="Instagram" />
                  </motion.div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Bloglist data={recentBlogData} categories={categories} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      <div className="container">
        <div className="border-b border-black"></div>
      </div>
    </>
  );
};

export default Blogdetails;

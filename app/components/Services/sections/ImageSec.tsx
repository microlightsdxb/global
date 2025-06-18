"use client";
import React from "react";
import Image from "next/image";

import { motion } from "framer-motion";
import { Service } from "@/types/Service";




const ImageSec = ({ data }: { data: Service }) => {

  return (
    <div>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}>
          <figure className="relative w-full h-[572px] flex pb-150">
            <Image
              className="object-cover w-full h-full"
              src={data?.introImage}
              alt={data?.introImageAlt}
              width={1500}
              height={500}
            />
          </figure>
        </motion.div>
      </div>

    </div>
  );
};

export default ImageSec;

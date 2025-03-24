"use client";
import React from "react";
import Image from "next/image";

import { assets } from "@/public/assets/assets";
import { motion } from "framer-motion";




const ImageSec = () => {

  return (
    <div>
      <div className="container">
         <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.5 }}>
      <figure className="relative w-full h-full   flex pb-150">
                                <Image
                                  className="object-contain w-full h-full"
                                  src={assets.serimg}
                                  alt="Apollo"
                                />
                              </figure>
      </motion.div>
      </div>

    </div>
  );
};

export default ImageSec;

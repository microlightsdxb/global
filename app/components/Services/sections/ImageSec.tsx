"use client";
import React from "react";
import Image from "next/image";

import { assets } from "@/public/assets/assets";




const ImageSec = () => {

  return (
    <div>
      <div className="container">
      <figure className="relative w-full h-full   flex pb-150">
                                <Image
                                  className="object-contain w-full h-full"
                                  src={assets.serimg}
                                  alt="Apollo"
                                />
                              </figure>
                         </div>

    </div>
  );
};

export default ImageSec;

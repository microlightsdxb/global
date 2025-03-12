'use client'
import React from "react";
import {motion} from 'framer-motion'
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
const slideVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };
  
const ProdSec = () => {
    
  return (
    <section className="section-spacing">
      <div className="container">
        <div className="overflow-hidden">
          <h2 className="text-xl leading-none mb-[50px] text-primary">
            Products
          </h2>
        </div>
        <div className="grid grid-cols-3"
        >
          {[
            { id: 1, img: "prd-1.jpg", hoverImg: "hvr-1.jpg", title: "Indoor" },
            { id: 2, img: "prd-2.jpg", hoverImg: "hvr-1.jpg", title: "Outdoor" },
            { id: 3, img: "prd-3.jpg", hoverImg: "hvr-1.jpg", title: "Industrial" },
          ].map((product, i) => (
            <div key={product.id}>
              <motion.div
                className="prditm group cursor-pointer"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.5 }}
                variants={slideVariants}
                custom={i}
              >
                <figure className="relative border border-black/10 mb-[35px] overflow-hidden">
                  <Image
                    src={`/assets/img/home/${product.img}`}
                    alt={product.title}
                    width={600}
                    height={500}
                    className="w-full transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                  />
                  <Image
                    src={`/assets/img/home/${product.hoverImg}`}
                    alt={`Hover ${product.title}`}
                    width={600}
                    height={500}
                    className="absolute inset-0 w-full opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                  />
                </figure>
                <h3 className="text-lg mb-[30px]">{product.title}</h3>
                <div className="flex">
                  <span className="border-t border-primary pt-[12px]">
                    <FiArrowUpRight className="ml-[40px] text-[22px] text-[#7D7D7D] transition-all ease-in-out duration-300 group-hover:ml-[30px] leading-none" />
                  </span>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProdSec;

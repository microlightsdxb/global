'use client'
import React from "react";
import {motion} from 'framer-motion'
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";
const slideVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };
  
const ProdSec = ({data}:{data:{data:{_id:string,type: string, image: string, hoverImage: string}[]}}) => {
    
  return (
    <section className="section-spacing">
      <div className="container">
        <div className="overflow-hidden">
          <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.5 }}
          className="text-xl leading-none mb-[50px] text-primary">
            Products
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[40px]"
        >
          {data?.data?.map((product: {_id: string, type: string, image: string, hoverImage: string}, i: number) => (
            <Link key={product._id} onClick={()=>localStorage.setItem("type",product.type)} href={`/products`} className="relative last:before:hidden before:content-[] before:absolute before:h-full before:w-[1px] before:bg-primary/10 before:right-[-20px] ">
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
                    src={product.image}
                    alt={product.type}
                    width={600}
                    height={500}
                    className="w-full transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                  />
                  <Image
                    src={product.hoverImage}
                    alt={`Hover ${product.type}`}
                    width={600}
                    height={500}
                    className="absolute inset-0 w-full opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                  />
                </figure>
                <h3 className="text-lg mb-[30px]">{product.type}</h3>
                <div className="flex">
                  <span className="border-t border-primary pt-[12px]">
                    <FiArrowUpRight className="ml-[40px] text-[22px] text-[#7D7D7D] transition-all ease-in-out duration-300 group-hover:ml-[30px] leading-none" />
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProdSec;

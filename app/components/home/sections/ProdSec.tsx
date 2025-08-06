'use client'

import { useEffect, useRef, useState } from 'react';
import {motion} from 'framer-motion'
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";
import { useStore } from "@/app/store/productType";
const slideVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

const ProdSec = ({data}:{data:{data:{_id:string,type: string, image: string, hoverImage: string}[]}}) => {
  const setType = useStore((state)=>state.setType);

    const serrefhtRef = useRef<HTMLDivElement | null>(null); 
    const [refHeight, setRefHeight] = useState(0);
  
    useEffect(() => {
      if (!data) return;
    
      const updateSpacing = () => {
        const element = serrefhtRef.current;
        if (element) {
          const height = element.offsetHeight ;
          setRefHeight(height);
        }
      };
    
      const timer = setTimeout(() => {
        updateSpacing();
        window.addEventListener('resize', updateSpacing); 
      }, 1000);   
    
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', updateSpacing);
      };
    
    }, [data]);
    
    
  
    
  return (
    // <section className="section-spacing h-[280vh] md:h-[230vh] lg:h-[100vh] 2xl:h-[110vh]">
    //   <div className="container">
    //     <div className="overflow-hidden">
    //       <h2
    //       initial={{ opacity: 0, x: -50 }}
    //       whileInView={{ opacity: 1, x: 0 }}
    //       transition={{ duration: 0.6 }}
    //       viewport={{ once: true, amount: 0.5 }}
    //       className="text-xl leading-none mb-[50px] text-primary">
    //         Products
    //       </h2>
    //     </div>
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px]"
    //     >
    //       {data?.data?.map((product: {_id: string, type: string, image: string, hoverImage: string}, i: number) => (
    //         <Link key={product._id} onClick={()=>setType(product.type)} href={`/products`} className="relative last:before:hidden before:content-[] before:absolute before:h-full before:w-[1px] before:bg-primary/10 before:right-[-20px] ">
    //           <div
    //             className="prditm group cursor-pointer"
    //             initial="hidden"
    //             whileInView="visible"
    //             viewport={{ once: true, amount: 0.5 }}
    //             variants={slideVariants}
    //             custom={i}
    //           >
    //             <figure className="relative border border-black/10 mb-[35px] overflow-hidden">
    //               <Image
    //                 src={product.image}
    //                 alt={product.type}
    //                 width={600}
    //                 height={500}
    //                 className="w-full transition-opacity duration-500 ease-in-out group-hover:opacity-0"
    //               />
    //               <Image
    //                 src={product.hoverImage}
    //                 alt={`Hover ${product.type}`}
    //                 width={600}
    //                 height={500}
    //                 className="absolute inset-0 w-full opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
    //               />
    //             </figure>
    //             <h3 className="text-lg mb-[30px]">{product.type}</h3>
    //             <div className="flex">
    //               <span className="border-t border-primary pt-[12px]">
    //                 <FiArrowUpRight className="ml-[40px] text-[22px] text-[#7D7D7D] transition-all ease-in-out duration-300 group-hover:ml-[30px] leading-none" />
    //               </span>
    //             </div>
    //           </div>
    //         </Link>
    //       ))}
    //     </div>
    //   </div>
    // </section> 
    <section 
      className="section-spacing relative    "
     
    >
      <div  className="refht  "  >
    <div className="container" >
      <div className="overflow-hidden">
        <motion.h2 
         initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6 }}
               viewport={{ once: true, amount: 0.5 }}
        className="text-xl leading-none mb-[50px] text-primary">
          Products
        </motion.h2>
      </div>
      <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px]" 
      >
        {data?.data?.map((product: {_id: string, type: string, image: string, hoverImage: string}, index:number) => (
          <Link key={product._id} onClick={()=>setType(product.type)} href={`/products`} className="relative last:before:hidden before:content-[] before:absolute before:h-full lg:before:w-[1px] lg:before:bg-primary/10 before:right-[-20px] ">
            <div  style={{
        height: `${refHeight}px`, 
      }}>
            <motion.div
              className="prditm group cursor-pointer" ref={serrefhtRef}
              initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, amount: 0.5 }}
                          variants={slideVariants}
                          custom={index}
            >
              <figure className="relative border h-[320px] lg:h-[380px] 2xl:h-[520px] border-black/10 mb-[35px] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.type} 
                  fill
                  className="w-full   object-cover h-full transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                />
                <Image
                  src={product.hoverImage}
                  alt={`Hover ${product.type}`} 
                  fill
                  className="absolute inset-0 w-full object-cover h-full opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                />
              </figure>
              <h3 className="text-lg mb-[30px]">{product.type}</h3>
              <div className="flex">
                <span className="border-t border-primary pt-[12px]">
                  <FiArrowUpRight className="ml-[40px] text-[22px] text-[#7D7D7D] transition-all ease-in-out duration-300 group-hover:ml-[30px] leading-none" />
                </span>
              </div>
            </motion.div>
            </div>
          </Link>
        ))}
      </div>
      </div>
    </div>
    </div>
  </section>
  );
};

export default ProdSec;

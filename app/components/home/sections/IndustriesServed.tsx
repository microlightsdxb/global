"use client"
import Image from "next/image";
import React, {  } from "react";
/* import gsap  from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; */
import {motion} from "framer-motion"

const industies = [
  {
    name : "Retail",
    icon : "/assets/img/icons/retail.svg"
  },
  {
    name : "Commercial",
    icon : "/assets/img/icons/commercial.svg",
  },
  {
    name : "Architectural",
    icon : "/assets/img/icons/retail.svg",
  },
  {
    name : "Public Spaces",
    icon : "/assets/img/icons/public-spaes.svg",
  },
  {
    name : "Residential",
    icon : "/assets/img/icons/residential.svg",
  },
  {
    name : "Industrial",
    icon : "/assets/img/icons/industrial.svg",
  },
  {
    name : "Hospitality",
    icon : "/assets/img/icons/hospitality.svg",
  }
]
/* 
gsap.registerPlugin(ScrollTrigger); */

const slideVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};


const IndustriesServed = () => {
  /* const headerRef = useRef<HTMLHeadingElement | null>(null); */
/* 
  useEffect(() => {
    if(headerRef.current) {
      gsap.fromTo (
        headerRef.current,
        {
          opacity: 0,
          x: -50
        }, {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power1.inOut",
          scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"

          }
        }
      )
    }
        return () => {
          ScrollTrigger.getAll().forEach((headerRef) => headerRef.kill());
    
      };
   
  }, []) */
  
  return (
    <div>
    <section className="section-spacing relative text-white h-[170vh] lg:h-[133vh] 2xl:h-[150vh] overflow-hidden">
      <figure className="absolute bg-primary w-full h-full inset-0 -z-10">
        <Image src={'/assets/img/banner/industry.jpg'} width={1900} height={900} alt="bnr" className="w-full h-full absolute object-center object-cover" />
      </figure>
      <div className="contntbrd">
        <div className="container">
          <div className="oveflow-hidden">
          <motion.h2   initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.5 }}  className="text-xl mb-[30px] lg:mb-[60px]" >Industries Served</motion.h2>
          </div>
          <div className="bomsx grid grid-cols-1 lg:grid-cols-3 ">
            {industies.map((industry, i) => (
              <motion.div  
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={slideVariants}
              custom={i}
              className="bitms p-[20px] lg:p-[40px] 2xl:p-[50px] border-r border-b border-[#595959] border-l border-t relative overflow-hidden group cursor-pointer"  key={i}>
                <figure className="absolute w-full h-[0px] inset-0 z-[0] before:content-[]  before:absolute before:w-full before:h-full before:bg-gradient-to-t before:from-black/80 before:to-transparent transition-all ease-in-out duration-300 top-[50%] -translate-y-[50%] group-hover:h-full overflow-hidden">
                  <Image src={'/assets/img/home/hov-s.jpg'} width={600} height={600} alt=""/>
                  
                </figure>
                <Image src={industry.icon} width={100} height={75} className="w-auto mb-[40px] lg:mb-[60px] 2xl:mb-[90px] z-[10] relative h-[55px] lg:h-[65px] 2xl:h-[75px]" alt={industry.name}/>
                <h3 className="text-lg z-[10]  relative">{industry.name}</h3>
            </motion.div>
            ))}
            
          
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default IndustriesServed;

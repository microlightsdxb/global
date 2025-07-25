"use client"
import { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import React from "react";
/* import gsap  from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; */
// import { motion } from "framer-motion"
import { Home } from "@/types/Home"

// const industies = [
//   {
//     name: "Retail",
//     icon: "/assets/img/icons/retail.svg",
//     hrimg: "/assets/img/home/hov-s.jpg"
//   },
//   {
//     name: "Commercial",
//     icon: "/assets/img/icons/commercial.svg",
//     hrimg: "/assets/img/home/Commercial.jpg"
//   },
//   {
//     name: "Architectural",
//     icon: "/assets/img/icons/retail.svg",
//     hrimg: "/assets/img/home/Architectural.jpg"
//   },
//   {
//     name: "Public Spaces",
//     icon: "/assets/img/icons/public-spaes.svg",
//     hrimg: "/assets/img/home/Public spaces.jpg"
//   },
//   {
//     name: "Residential",
//     icon: "/assets/img/icons/residential.svg",
//     hrimg: "/assets/img/home/residential.jpg"
//   },
//   {
//     name: "Industrial",
//     icon: "/assets/img/icons/industrial.svg",
//     hrimg: "/assets/img/home/Industrial.jpg"
//   },
//   {
//     name: "Hospitality",
//     icon: "/assets/img/icons/hospitality.svg",
//     hrimg: "/assets/img/home/Hospitality.jpg"
//   }
// ]
/*
gsap.registerPlugin(ScrollTrigger); */

// const slideVariants = {
//   hidden: { opacity: 0, y: 50 },
//   visible: (i: number) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
//   }),
// };


const IndustriesServed = ({data}: {data: Home}) => {
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
    const refhtRef = useRef<HTMLDivElement | null>(null);
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const [refHeight, setRefHeight] = useState(0);
  
    useEffect(() => {
      if (!data) return; 
  
      const updateSpacing = () => {
        const element = refhtRef.current;
        if (element) {
          const height = element.offsetHeight ;
          setRefHeight(height);
        }
      };
  
      updateSpacing(); 
  
      window.addEventListener('resize', updateSpacing);
      return () => window.removeEventListener('resize', updateSpacing);
  
    }, [data]); 
  
    
  return (
    <div>
      {/* <section className="section-spacing relative text-white h-[220vh] lg:h-[133vh] 2xl:h-[150vh] overflow-hidden">
        <figure className="absolute bg-primary w-full h-full inset-0 -z-10">
          <Image src={'/assets/img/banner/industry.jpg'} width={1900} height={900} alt="bnr" className="w-full h-full absolute object-center object-cover" />
        </figure>
        <div className="contntbrd">
          <div className="container">
            <div className="oveflow-hidden">
              <h2 initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.5 }} className="text-xl mb-[30px] lg:mb-[60px]" >{data.industries.title}</h2>
            </div>
            <div className="bomsx grid grid-cols-1 lg:grid-cols-3 ">
              {data.industries.items.map((industry, i) => (
                <div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={slideVariants}
                  custom={i}
                  className="bitms p-[20px] lg:p-[40px] 2xl:p-[50px] border-r border-b border-[#595959] border-l border-t relative overflow-hidden group cursor-pointer" key={i}>
                  <figure className="absolute w-full h-[0px] inset-0 z-[0] before:content-[]  before:absolute before:w-full before:h-full before:bg-gradient-to-t before:from-black/80 before:to-transparent transition-all ease-in-out duration-300 top-[50%] -translate-y-[50%] group-hover:h-full overflow-hidden">
                    <Image src={industry.image} width={600} height={600} alt={industry.imageAlt} />

                  </figure>
                  <Image src={industry.logo} width={100} height={75} className="w-auto mb-[40px] lg:mb-[60px] 2xl:mb-[90px] z-[1] relative h-[55px] lg:h-[65px] 2xl:h-[75px]" alt={industry.logoAlt} />
                  <h3 className="text-lg z-[1]  relative">{industry.title}</h3>
                </div>
              ))}


            </div>
          </div>
        </div>
      </section> */}
      <section
      ref={sectionRef}
      className="section-spacing relative text-white   overflow-hidden"
      
    >
      <div  className="refht" style={{
        height: `${refHeight}px`, 
      }}>
        <figure className="absolute bg-primary w-full h-full inset-0 -z-10">
          <Image src={'/assets/img/banner/industry.jpg'} width={1900} height={900} alt="bnr" className="w-full h-full absolute object-center object-cover" />
        </figure>
        <div className="contntbrd" ref={refhtRef}>
          <div className="container">
            <div className="oveflow-hidden">
              <h2 className="text-xl mb-[30px] lg:mb-[60px]" >{data.industries.title}</h2>
            </div>
            <div className="bomsx grid grid-cols-1 lg:grid-cols-3 ">
              {data.industries.items.map((industry, i) => (
                <div
                  className="bitms p-[20px] lg:p-[40px] 2xl:p-[50px] border-r border-b border-[#595959] border-l border-t relative overflow-hidden group" key={i}>
                  <figure className="absolute w-full h-[0px] inset-0 z-[0] before:content-[]  before:absolute before:w-full before:h-full before:bg-gradient-to-t before:from-black/80 before:to-transparent transition-all ease-in-out duration-300 top-[50%] -translate-y-[50%] group-hover:h-full overflow-hidden">
                    <Image src={industry.image} width={600} height={600} alt={industry.imageAlt} />

                  </figure>
                  <Image src={industry.logo} width={100} height={75} className="w-auto mb-[40px] lg:mb-[60px] 2xl:mb-[90px] z-[1] relative h-[55px] lg:h-[65px] 2xl:h-[75px]" alt={industry.logoAlt} />
                  <h3 className="text-lg z-[1]  relative">{industry.title}</h3>
                </div>
              ))}


            </div>
          </div>
        </div>
        </div>
      </section>
    </div>
  );
};

export default IndustriesServed;

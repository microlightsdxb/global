"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";

/* import { motion } from "framer-motion"; */
// import c01web2 from "@/public/assets/img/home/slide1.jpg";
// import c01web3 from "@/public/assets/img/home/secbnr.jpg";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { Home } from "@/types/Home";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, EffectCreative } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/pagination";


const HeroSection = ({ data }: { data: Home }) => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const swiperRef = useRef<SwiperClass | null>(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = data.banners.length;

  const [textVersion, setTextVersion] = useState(0);

  return (
    <section
      className="h-screen relative overflow-hidden bg-primary"
      ref={triggerRef}
      suppressHydrationWarning
    >
      <div className="absolute bottom-[80px] lg:bottom-[150px] w-full ">
        <div className="container flex justify-end">
          <span className="text-[15px] text-white whitespace-nowrap font-light relative z-10">
            <span className="font-medium "> {`0${currentSlide}`}</span> - {`0${totalSlides}`}
          </span>
        </div>
      </div>

      <div className="prject-sec h-full flex flex-wrap" style={{ width: `${data?.banners?.length * 100}vw` }} ref={sectionRef}>

      <Swiper
         modules={[Autoplay, EffectFade, EffectCreative]}
         
         effect="creative"
         creativeEffect={{
           prev: {
             translate: [0, 0, 0],
           },
           next: {
             translate: [200, 0, 0],
           },
         }}
         autoplay={{ delay: 5000,
         disableOnInteraction: false, }}
         slidesPerView={1}
         spaceBetween={0}
         loop
         onSwiper={(swiper) => {
           swiperRef.current = swiper;
         }}
        
         
         onSlideChange={(swiper) => {
           setCurrentSlide(swiper.realIndex + 1);
           setTextVersion(v => v + 1);
         }}
        className="w-full h-full"
      >

        {data?.banners?.map((project, index) => (
          <SwiperSlide key={index}>
            <div key={index} className="slide h-full w-screen relative overflow-hidden text-white">
              <figure className="h-full w-full absolute -z-50">
                <Image className="h-full w-full absolute object-cover object-center" src={project.image} alt={project.bannerAltTag} width={2500} height={1000} />
              </figure>
              <div className="h-full w-full -z-40 absolute bg-gradient-to-t from-black to-transparent opacity-70"></div>

              <div className="absolute w-full h-full">
                <div className="container h-full">
                  <div className="h-full relative">
                    <div key={`${index}-${textVersion}`}
                      className="title absolute bottom-[80px] lg:bottom-[150px] transition-all ease-in-out flex flex-col"

                    >
                      <div className="overflow-hidden mb-[20px] lg:mb-[30px]"  key={`${index}-${textVersion}`}>
                        <motion.h1 initial={{ opacity: 0, x: -50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6  }}
                          viewport={{ once: true, amount: 0.5 }} className="text-2xl text-white leading-none font-custom font-normal lg:w-[70%] ">
                          {project.title}
                        </motion.h1>
                      </div>
                      <div className="overflow-hidden mb-[30px] lg:mb-[50px]">
                        <motion.p initial={{ opacity: 0, x: -50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                          viewport={{ once: true, amount: 0.5 }} className="text-lg text-white leading-tight font-custom font-light">
                          {project.subTitle}
                        </motion.p>
                      </div>
                      <div className="overflow-hidden">
                        <motion.div className="flex" initial={{ opacity: 0, x: -50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.6 }}
                          viewport={{ once: true, amount: 0.5 }}>
                          <Link href={'/'} className="flex gap-[20px] items-center border-t border-white text-sm text-white border-solid leaing-none pt-[12px]">
                            <span>Explore</span> <FiArrowUpRight className="text-[22px] text-white" />
                          </Link>
                        </motion.div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HeroSection;
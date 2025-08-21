"use client";
import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper/types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import Image from "next/image";
import { motion } from "framer-motion";

const Pjctslider = ({ data }: { data: { data: { images: string[], name:string } } }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  console.log(data)
  return (
    <section className="">
      <motion.div
         initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.5 }}
      >
        <div className="relative">
          <Swiper
            modules={[Navigation, Thumbs]}
            slidesPerView={1}
            spaceBetween={40}
            navigation={false}
            thumbs={{ swiper: thumbsSwiper }}
            className={`w-full h-[400px] md:h-[500px] lg:h-[750px] overlayslider`}
          >
            {data?.data?.images?.map((project: string, index: number) => (
              <SwiperSlide key={index} className="h-full flex">
                <div className="overflow-hidden w-full h-full flex">
                  <figure className="relative w-full h-full flex">
                    <Image
                      className="object-cover w-full h-full"
                      src={project}
                      alt="Apollo"
                      width={1920}
                      height={1500}
                    />
                    
                  </figure>
                </div>
              </SwiperSlide>
            ))}
            
          </Swiper>

          {/* Thumbnail Swiper */}
          <div className="absolute bottom-0 w-full">
            <Swiper
              onSwiper={setThumbsSwiper}
              modules={[Thumbs]}
              slidesPerView={"auto"} // Adjust based on the number of thumbnails
              spaceBetween={10}
              watchSlidesProgress
              className="w-full mt-4 thumpslider fullslider"
            >
              {data?.data?.images?.map((project: string, index: number) => (
                <SwiperSlide key={index} className="cursor-pointer  " style={{ width: "60px" }}>
                  <div className="border-1 flex  mb-4 transition-all duration-300 min-h-full overflow-hidden"
                    style={{ width: "60px", height: "60px" }}>
                    <Image
                      className="object-cover h-full m-auto"
                      src={project}
                      alt="Apollo"
                      width={60}
                      height={60}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Pjctslider;

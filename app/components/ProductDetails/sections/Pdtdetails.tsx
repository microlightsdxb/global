"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer, moveUp } from "@/app/components/scrollanims";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper/types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Image from "next/image";
import Link from "next/link";

interface ProductProps {
  data:{
    name: string;
    thumbnail: string;
    wattage: string;
    lumen: string;
    images: string[];
    type: string;
    file: string;
  }
}

const Pdtdetails = ({data}: {data: ProductProps}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  return (
    <section className="">
      <div className="container ">
        <div className="pt-16 pb-150  ">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{once:true, amount:0.2}} className="grid grid-cols-1 md:grid-cols-2 gap:[30px] lg:gap-[90px]">
            <motion.div variants={moveUp} className=" ">
              <div>
                {/* Main Swiper */}
                <Swiper
                  modules={[Navigation, Thumbs]}
                  slidesPerView={1}
                  spaceBetween={40}
                  navigation={false}
                  thumbs={{ swiper: thumbsSwiper }}
                  className="w-full h-[400px] md:h-[500px] lg:h-[590px]"
                >
                  {data?.data?.images?.map((image: string,index: number) => (
                    <SwiperSlide key={index} className="h-full flex">
                      <div className="overflow-hidden w-full h-full flex">
                        <figure className="relative w-full h-full py-90 border border-[#00000010] flex">
                          <Image
                            className="object-contain w-full h-full"
                            src={image}
                            alt=""
                            width={100}
                            height={100}
                          />
                        </figure>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Thumbnail Swiper */}
                <Swiper
                  onSwiper={setThumbsSwiper}
                  modules={[Thumbs]}
                  slidesPerView={6} // Adjust based on the number of thumbnails
                  spaceBetween={10}
                  watchSlidesProgress
                  className="w-full mt-4 thumpslider productthumb"
                >
                  {data?.data?.images?.map((image: string,index: number) => (
                    <SwiperSlide key={index} className="cursor-pointer  "  >
                      <div className=" p-5 border-1 flex border-[#00000010]   hover:border-primary transition-all duration-300 min-h-full">
                        <Image
                          className="  h-full   m-auto"
                          src={image}
                          alt="Apollo"
                          width={100}
                          height={100}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </motion.div>
            <motion.div variants={moveUp} className=" ">
              <div className="flex flex-col gap-30 justify-between">
              <div>
              <div>
                 <h1 className="text-xl text-black leading-[1.4] mb-4 md:mb-10">{data?.data?.name} </h1>
              </div>
              <div className="border-b border-[#00000010] pb-5">
                <p>Type</p>
                <p className="text-25 text-black font-[500]">{data?.data?.type}</p>
              </div>
              <div className="border-b border-[#00000010] pb-5 pt-4">
                <p>Wattage</p>
                <p className="text-25 text-black font-[500]">{data?.data?.wattage}</p>
              </div>
              <div className="border-b border-[#00000010] pb-5 pt-4">
                <p>Lumen</p>
                <p className="text-25 text-black font-[500]">{data?.data?.lumen}</p>
              </div>
              </div>

            <Link href={data?.data?.file || "#"} target="_blank"><div className="px-7 py-4 bg-black text-white w-fit">
            Download Datasheet
            </div></Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Pdtdetails;

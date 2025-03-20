"use client";
import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper/types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { assets } from "@/public/assets/assets";
import Image, { StaticImageData } from "next/image";

interface Project {
  id: number;
  image: string | StaticImageData;
}

const projects: Project[] = [
  {
    id: 1,
    image: assets.appolo_slide,
  },
  {
    id: 2,
    image: assets.appolo_slide,
  },
  {
    id: 3,
    image: assets.eddi,
  },
  {
    id: 4,
    image: assets.appolo_slide,
  },
  {
    id: 5,
    image: assets.eddig,
  },
];
const Pdtdetails = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  return (
    <section className="">
      <div className="container ">
        <div className="pt-16 pb-150  ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap:[30px] lg:gap-[90px]">
            <div className=" ">
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
                  {projects.map((project) => (
                    <SwiperSlide key={project.id} className="h-full flex">
                      <div className="overflow-hidden w-full h-full flex">
                        <figure className="relative w-full h-full py-90 border border-[#00000010] flex">
                          <Image
                            className="object-contain w-full h-full"
                            src={project.image}
                            alt="Apollo"
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
                  className="w-full mt-4 thumpslider"
                >
                  {projects.map((project) => (
                    <SwiperSlide key={project.id} className="cursor-pointer  ">
                      <div className="border-1 flex border-[#00000010] p-4 hover:border-primary transition-all duration-300 min-h-full">
                        <Image
                          className="  h-full   m-auto"
                          src={project.image}
                          alt="Apollo"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
            <div className=" ">
              <div className="flex flex-col gap-30 justify-between">
              <div>
              <div>
                 <h1 className="text-lg text-black leading-[1.4] mb-4 md:mb-10">Apollo </h1>
              </div>
              <div className="border-b border-[#00000010] pb-5">
                <p>Type</p>
                <p className="text-25 text-black">Downllight</p>
              </div>
              <div className="border-b border-[#00000010] pb-5 pt-4">
                <p>Wattage</p>
                <p className="text-25 text-black">12W</p>
              </div>
              <div className="border-b border-[#00000010] pb-5 pt-4">
                <p>Lumen</p>
                <p className="text-25 text-black">3000Lm</p>
              </div>
              </div>

            <div className="px-7 py-4 bg-black text-white w-fit">
            Download Datasheet
            </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pdtdetails;

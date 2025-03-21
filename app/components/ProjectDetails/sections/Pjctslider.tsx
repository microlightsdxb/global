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
    image: assets.pjtslide1,
  },
  {
    id: 2,
    image: assets.pjtslide2,
  },
  {
    id: 3,
    image: assets.pjtslide3,
  },
  {
    id: 4,
    image: assets.pjtslide4,
  },
];
const Pjctslider = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  return (
    <section className="">
              <div className="relative">
                {/* Main Swiper */}
                <Swiper
                  modules={[Navigation, Thumbs]}
                  slidesPerView={1}
                  spaceBetween={40}
                  navigation={false}
                  thumbs={{ swiper: thumbsSwiper }}
                  className="w-full h-[400px] md:h-[500px] lg:h-[825px] overlayslider"
                >
                  {projects.map((project) => (
                    <SwiperSlide key={project.id} className="h-full flex">
                      <div className="overflow-hidden w-full h-full flex">
                        <figure className="relative w-full h-full    flex">
                          <Image
                            className="object-cover w-full h-full"
                            src={project.image}
                            alt="Apollo"
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
                  slidesPerView={6} // Adjust based on the number of thumbnails
                  spaceBetween={10}
                  watchSlidesProgress
                  className="w-full mt-4 thumpslider fullslider"
                >
                  {projects.map((project) => (
                    <SwiperSlide key={project.id} className="cursor-pointer  ">
                      <div className="border-1 flex  mb-4 transition-all duration-300 min-h-full">
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
    </section>
  );
};

export default Pjctslider;

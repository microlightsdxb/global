"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import dynamic from "next/dynamic";
import { Home } from "@/types/Home";

// ✅ Dynamic Swiper
const Swiper = dynamic(() =>
  import("swiper/react").then((mod) => mod.Swiper),
  { ssr: false }
);

const SwiperSlide = dynamic(() =>
  import("swiper/react").then((mod) => mod.SwiperSlide),
  { ssr: false }
);

// ✅ Import module
import { Autoplay } from "swiper/modules";
import "swiper/css";

const HeroSection = ({ data }: { data: Home }) => {
  const [mounted, setMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(1);

  const firstBanner = data?.banners?.[0];

  useEffect(() => {
    requestAnimationFrame(() => {
      setMounted(true);
    });
  }, []);

  return (
    <section className="h-screen relative overflow-hidden bg-primary">

      {/* ✅ First Slide (LCP optimized) */}
      {!mounted && firstBanner && (
        <div className="absolute h-screen w-screen overflow-hidden text-white">
          <Image
            src={firstBanner.image}
            alt={firstBanner.bannerAltTag}
            fill
            priority
            fetchPriority="high"
            quality={85}
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />

          <div className="absolute bottom-[80px] lg:bottom-[150px] container">
            <h1 className="text-2xl lg:w-[70%]">{firstBanner.title}</h1>
            <p className="mt-4 text-lg">{firstBanner.subTitle}</p>

            <Link
              href="/about-us"
              className="flex gap-[20px] items-center border-t border-white text-sm text-white pt-[12px] mt-4"
            >
              <span>Explore</span>
              <FiArrowUpRight className="text-[22px]" />
            </Link>
          </div>
        </div>
      )}

      {/* ✅ Swiper */}
      {mounted && (
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          loop={data.banners.length > 1}
          observer={true}
          observeParents={true}
          autoplay={
            data.banners.length > 1
              ? {
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: false,
                }
              : false
          }
          onSlideChange={(swiper) => {
            setCurrentSlide(swiper.realIndex + 1);
          }}
          className="w-full h-full"
        >
          {data?.banners?.map((project, index) => (
            <SwiperSlide key={index}>
              <div className="h-full w-screen relative text-white">

                <Image
                  src={project.image}
                  alt={project.bannerAltTag}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />

                <div className="absolute bottom-[80px] lg:bottom-[150px] container">
                  <h2 className="text-2xl lg:w-[70%]">
                    {project.title}
                  </h2>

                  <p className="mt-4 text-lg">
                    {project.subTitle}
                  </p>

                  <Link
                    href="/about-us"
                    className="flex gap-[20px] items-center border-t border-white text-sm text-white pt-[12px] mt-4"
                  >
                    <span>Explore</span>
                    <FiArrowUpRight className="text-[22px]" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

    </section>
  );
};

export default HeroSection;
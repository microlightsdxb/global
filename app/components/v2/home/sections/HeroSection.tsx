"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import type { HeroData } from "@/app/(user)/v2/home/data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";

const AUTOPLAY_DELAY = 6000; // time each slide stays on screen (ms)
const FADE_SPEED = 1400; // cross-fade duration between slides (ms)

const HeroSection = ({ data }: { data: HeroData }) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const banners = data?.slides ?? [];
  const activeBanner = banners[activeIndex];

  if (!banners.length) return null;

  return (
    <section className="h-screen relative overflow-hidden bg-black">
      {/* Background slider — images only, cross-fade */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={FADE_SPEED}
        autoplay={{ delay: AUTOPLAY_DELAY, disableOnInteraction: false }}
        loop={banners.length > 1}
        allowTouchMove={banners.length > 1}
        slidesPerView={1}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="!absolute inset-0 w-full h-full"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            <Image
              src={banner.image}
              alt={banner.alt || "Microlights"}
              fill
              sizes="100vw"
              quality={80}
              priority={index === 0}
              fetchPriority={index === 0 ? "high" : "auto"}
              className="object-cover object-center"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay — 50% black tint plus a fade to solid black toward the bottom */}
      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-70"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0) 32.19%, #000000 86.13%), linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))",
        }}
      />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-[70px] lg:bottom-[110px] z-20">
        <div className="container flex items-end justify-between gap-8">
          {/* Text — fades in on every slide change */}
          <div className="min-h-[220px] lg:min-h-[260px] flex flex-col justify-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <h1 className="text-2xl text-white leading-[1.1] font-custom font-light whitespace-pre-line">
                  {activeBanner?.title}
                </h1>
                {activeBanner?.subTitle && (
                  <p className="mt-[14px] lg:mt-[18px] text-22 text-white/90 leading-snug font-custom font-light">
                    {activeBanner.subTitle}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>

            <Link
              href={data.cta.href}
              className="group mt-[40px] lg:mt-[60px] inline-flex w-fit flex-col gap-[12px] text-white"
            >
              <span className="block h-px w-[60px] bg-white/70 transition-all duration-500 group-hover:w-full group-hover:bg-white" />
              <span className="flex items-center gap-[18px] text-xs font-light">
                {data.cta.label}
                <FiArrowUpRight className="text-[18px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </div>

          {/* Pagination — line bullets, active one fills over the autoplay delay */}
          {banners.length > 1 && (
            <div className="flex items-center gap-[10px] pb-[6px]">
              {banners.map((_, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={isActive}
                    onClick={() => swiperRef.current?.slideToLoop(index)}
                    className={`relative h-[2px] overflow-hidden bg-white/35 transition-all duration-500 cursor-pointer ${
                      isActive ? "w-[48px]" : "w-[24px] hover:bg-white/60"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        key={activeIndex}
                        className="absolute inset-y-0 left-0 bg-white"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: (AUTOPLAY_DELAY + FADE_SPEED) / 1000, ease: "linear" }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

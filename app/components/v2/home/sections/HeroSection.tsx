"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import ArrowButton from "@/app/components/v2/common/ArrowButton";
import { AnimatePresence, motion } from "framer-motion";
import type { HeroData } from "@/app/(v2)/v2/home/data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";

const AUTOPLAY_DELAY = 6000;
const FADE_SPEED = 1400;
const EASE = [0.25, 0.1, 0.25, 1] as const;
const STAGGER = 0.15;

const riseIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const HeroSection = ({ data }: { data: HeroData }) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const banners = data?.slides ?? [];
  const activeBanner = banners[activeIndex];

  if (!banners.length) return null;

  return (
    <section className="h-screen relative overflow-hidden bg-black">
      {/* Background slider */}
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
              priority={index === 0}
              fetchPriority={index === 0 ? "high" : "auto"}
              className="object-cover object-center pointer-events-none"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-55"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0) 32.19%, #000000 86.13%), linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))",
        }}
      />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 section-bottom-spacing z-20">
        <div className="container flex items-end justify-between gap-8">
          {/* Text */}
          <div className="min-h-[220px] lg:min-h-[260px] flex flex-col justify-end">
            <AnimatePresence mode="wait">
              {/* Each title line, then the subtitle, rises in one after another */}
              <motion.div
                key={activeIndex}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: -10, transition: { duration: 0.4 } }}
                variants={{ show: { transition: { staggerChildren: STAGGER } } }}
              >
                <h1 className="heroTitle text-white">
                  {(activeBanner?.title ?? "").split("\n").map((line, i) => (
                    <motion.span key={i} className="block" variants={riseIn}>
                      {line}
                    </motion.span>
                  ))}
                </h1>
                {activeBanner?.subTitle && (
                  <motion.p className="mt-[30px] text-subtitle !leading-[1.6] text-white" variants={riseIn}>
                    {activeBanner.subTitle}
                  </motion.p>
                )}
              </motion.div>
            </AnimatePresence>

            <motion.div
              className="mt-[40px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: STAGGER * 3, ease: EASE }}
            >
              <ArrowButton href={data.cta.href} label={data.cta.label} />
            </motion.div>
          </div>

          {/* Pagination */}
          {banners.length > 1 && (
            <motion.div
              className="flex items-center gap-[10px] pb-[6px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: STAGGER * 4, ease: EASE }}
            >
              {banners.map((_, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={isActive}
                    onClick={() => swiperRef.current?.slideToLoop(index)}
                    className={`relative h-[3px] cursor-pointer transition-[width,background-color] duration-500 ease-in-out before:absolute before:-inset-y-[12px] before:-inset-x-[5px] before:content-[''] ${
                      isActive ? "w-[46px] bg-white" : "w-[15px] bg-white/40 hover:bg-white/70"
                    }`}
                  />
                );
              })}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

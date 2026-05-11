"use client";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { Motiondiv, MotionH1, MotionP } from "./MotionComp";
import { Home } from "@/types/Home";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCreative } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const HeroSection = ({ data }: { data: Home }) => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const swiperRef = useRef<SwiperClass | null>(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [textVersion, setTextVersion] = useState(0);
  
  const totalSlides = data.banners.length;
  const firstBanner = data?.banners?.[0];

  // Wait for client-side mounting
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Preload only the first image
  useEffect(() => {
    if (!firstBanner?.image) return;
    
    const img = new window.Image();
    img.src = firstBanner.image;
    img.onload = () => {
      setImagesLoaded(true);
    };
  }, [firstBanner?.image]);

  // Don't render Swiper on server
  if (!isClient) {
    return (
      <section className="h-screen relative overflow-hidden bg-primary" ref={triggerRef}>
        <div className="absolute bottom-[80px] lg:bottom-[150px] w-full">
          <div className="container flex justify-end">
            <span className="text-[15px] text-white whitespace-nowrap font-light relative z-10">
              <span className="font-medium">01</span> - 0{totalSlides}
            </span>
          </div>
        </div>
        
        {/* Critical LCP placeholder - first banner only */}
        <div className="h-screen w-full relative overflow-hidden text-white">
          <div className="h-full w-full absolute">
            <Image
              src={firstBanner?.image || ""}
              alt={firstBanner?.bannerAltTag || "Hero banner"}
              fill
              priority
              className="object-cover"
              sizes="100vw"
              quality={75}
            />
          </div>
          <div className="h-full w-full absolute bg-gradient-to-t from-black to-transparent opacity-70" />
          <div className="absolute w-full h-full">
            <div className="container h-full">
              <div className="h-full relative">
                <div className="title absolute bottom-[80px] lg:bottom-[150px] flex flex-col">
                  <div className="overflow-hidden mb-[20px] lg:mb-[30px]">
                    <h1 className="text-2xl text-white leading-none font-custom font-normal lg:w-[70%]">
                      {firstBanner?.title}
                    </h1>
                  </div>
                  <div className="overflow-hidden mb-[30px] lg:mb-[50px]">
                    <p className="text-lg text-white leading-tight font-custom font-light">
                      {firstBanner?.subTitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="h-screen relative overflow-hidden bg-primary"
      ref={triggerRef}
      suppressHydrationWarning
    >
      <div className="absolute bottom-[80px] lg:bottom-[150px] w-full z-20">
        <div className="container flex justify-end">
          <span className="text-[15px] text-white whitespace-nowrap font-light relative z-10">
            <span className="font-medium">0{currentSlide}</span> - 0{totalSlides}
          </span>
        </div>
      </div>

      <Swiper
        modules={[Autoplay, EffectCreative]}
        effect="creative"
        creativeEffect={{
          prev: { translate: [0, 0, 0] },
          next: { translate: ["100%", 0, 0] },
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true, // Pause on hover for better UX
        }}
        slidesPerView={1}
        spaceBetween={0}
        loop
        lazyPreloadPrevNext={1} // Only preload adjacent slides
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          React.startTransition(() => {
            setCurrentSlide(swiper.realIndex + 1);
            setTextVersion((v) => v + 1);
          });
        }}
        className="w-full h-full"
      >
        {data?.banners?.map((project, index) => (
          <SwiperSlide key={index}>
            <div className="slide h-full w-screen relative overflow-hidden text-white">
              {/* Optimized Image Loading */}
              <figure className="h-full w-full absolute -z-50">
                <Image
                  className="h-full w-full absolute object-cover object-center"
                  src={project.image}
                  alt={project.bannerAltTag}
                  fill
                  sizes="100vw"
                  quality={75}
                  priority={index === 0} // Only first image is priority
                  loading={index === 0 ? "eager" : "lazy"}
                  // Add fetchpriority for LCP image
                  fetchPriority={index === 0 ? "high" : "auto"}
                  // Decode images asynchronously
                  decoding={index === 0 ? "sync" : "async"}
                  // Add blur placeholder for better perceived performance
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${Buffer.from(
                    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#000000" opacity="0.1"/></svg>`
                  ).toString("base64")}`}
                />
              </figure>

              <div className="h-full w-full -z-40 absolute bg-gradient-to-t from-black to-transparent opacity-70" />

              <div className="absolute w-full h-full">
                <div className="container h-full">
                  <div className="h-full relative">
                    <div
                      key={`${index}-${textVersion}`}
                      className={`title absolute bottom-[80px] lg:bottom-[150px] flex flex-col transition-opacity duration-500 ease-in-out ${
                        currentSlide === index + 1 ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden mb-[20px] lg:mb-[30px]">
                        {index === 0 ? (
                          <MotionH1
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-2xl text-white leading-none font-custom font-normal lg:w-[70%]"
                          >
                            {project.title}
                          </MotionH1>
                        ) : (
                          <MotionP
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true, amount: 0.5 }}
                            className="text-2xl text-white leading-none font-custom font-normal lg:w-[70%]"
                          >
                            {project.title}
                          </MotionP>
                        )}
                      </div>

                      <div className="overflow-hidden mb-[30px] lg:mb-[50px]">
                        <MotionP
                          initial={{ opacity: 0, x: -50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                          viewport={{ once: true, amount: 0.5 }}
                          className="text-lg text-white leading-tight font-custom font-light"
                        >
                          {project.subTitle}
                        </MotionP>
                      </div>

                      <div className="overflow-hidden">
                        <Motiondiv
                          className="flex"
                          initial={{ opacity: 0, x: -50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.6 }}
                          viewport={{ once: true, amount: 0.5 }}
                        >
                          <Link
                            href="/about-us"
                            className="flex gap-[20px] items-center border-t border-white text-sm text-white border-solid pt-[12px]"
                          >
                            <span>Explore</span>
                            <FiArrowUpRight className="text-[22px] text-white" />
                          </Link>
                        </Motiondiv>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;
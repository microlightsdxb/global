"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import SliderNav from "@/app/components/v2/common/SliderNav";
import type { TestimonialsData } from "@/app/(v2)/v2/home/data";

const TestimonialsSec = ({ data }: { data: TestimonialsData }) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = data?.testimonials ?? [];
  if (!testimonials.length) return null;

  const hasMany = testimonials.length > 1;

  return (
    <section className="section-spacing">
      <div className="container flex flex-col gap-[50px] lg:flex-row lg:justify-between">
        {/* Left — title, description, slider nav pinned to the bottom */}
        <div className="flex flex-col justify-between gap-[40px] lg:max-w-[470px]">
          <div>
            <h2 className="section-title text-black">{data.title}</h2>
            <p className="mt-[30px] text-description text-[#555555] !mb-0">{data.description}</p>
          </div>
          {hasMany && (
            <SliderNav
              onPrev={() => swiperRef.current?.slidePrev()}
              onNext={() => swiperRef.current?.slideNext()}
            />
          )}
        </div>

        {/* Right — quote mark (98) + 70px gap + 740px content = 908px at 1920 */}
        <div className="flex gap-[24px] md:gap-[70px] min-w-0 lg:w-[908px] lg:max-w-[60%]">
          <Image
            src="/assets/img/icons/quote.svg"
            alt=""
            width={98}
            height={89}
            unoptimized // SVG — skip the image optimizer, which rejects SVGs
            className="hidden md:block w-[clamp(60px,5.104vw,98px)] h-auto self-start shrink-0"
          />

          <div className="min-w-0 flex-1">
            {/* One bar per testimonial — active dark, others light; each is clickable */}
            {hasMany && (
              <div className="flex gap-(--space-60)">
                {testimonials.map((_, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={index}
                      type="button"
                      aria-label={`Show testimonial ${index + 1}`}
                      aria-current={isActive}
                      onClick={() => swiperRef.current?.slideToLoop(index)}
                      className={`relative h-[1.9px] flex-1 cursor-pointer transition-colors duration-500 before:absolute before:-inset-y-[12px] before:inset-x-0 before:content-[''] ${
                        isActive ? "bg-black" : "bg-black/20 hover:bg-black/40"
                      }`}
                    />
                  );
                })}
              </div>
            )}

            <Swiper
              modules={[EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              speed={600}
              loop={hasMany}
              allowTouchMove={hasMany}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              className={hasMany ? "mt-(--space-60)" : ""}
            >
              {testimonials.map((t, index) => (
                <SwiperSlide key={index} className="bg-white">
                  <blockquote className="!mb-0">
                    <p className="text-subtitle-2 text-black !mb-0">“{t.quote}”</p>
                    <p className="mt-[20px] text-description text-[#555555] !mb-0">{t.body}</p>
                  </blockquote>
                  <p className="mt-(--space-66) text-subtitle text-black !mb-0">{t.name}</p>
                  <p className="mt-[5px] text-description-2 text-[#4A5565] !mb-0">{t.role}</p>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSec;

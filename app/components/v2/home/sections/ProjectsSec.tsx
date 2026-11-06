"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import ArrowButton from "@/app/components/v2/common/ArrowButton";
import SliderNav from "@/app/components/v2/common/SliderNav";
import Reveal, { REVEAL_STAGGER } from "@/app/components/v2/common/Reveal";
import useCardReveal, { MEDIA_CLIP } from "@/app/components/v2/common/useCardReveal";
import type { ProjectsData } from "@/app/(v2)/v2/home/data";

const ProjectsSec = ({ data }: { data: ProjectsData }) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  useCardReveal(listRef);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const projects = data?.projects ?? [];
  if (!projects.length) return null;

  const syncEdges = (swiper: SwiperClass) => {
    setAtStart(swiper.isBeginning);
    setAtEnd(swiper.isEnd);
  };

  return (
    <section className="section-spacing">
      <div className="container">
        {/* Heading */}
        <div className="flex flex-col gap-[30px] md:flex-row md:items-end md:justify-between">
          <div className="max-w-[560px]">
            <Reveal>
              <h2 className="section-title text-black">{data.title}</h2>
            </Reveal>
            <Reveal delay={REVEAL_STAGGER}>
              <p className="mt-[30px] text-description text-[#555555] !mb-0">{data.description}</p>
            </Reveal>
          </div>
          <Reveal delay={REVEAL_STAGGER * 2} className="shrink-0">
          <SliderNav
            onPrev={() => swiperRef.current?.slidePrev()}
            onNext={() => swiperRef.current?.slideNext()}
            prevDisabled={atStart}
            nextDisabled={atEnd}
          />
          </Reveal>
        </div>

        <Reveal>
          <hr className="my-[50px] border-black/10" />
        </Reveal>

        <div ref={listRef}>
        <Swiper
          slidesPerView={1.1}
          spaceBetween={20}
          breakpoints={{
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            syncEdges(swiper);
          }}
          onSlideChange={syncEdges}
          onResize={syncEdges}
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
              <div data-reveal="card">
              <Link href={project.href} className="group block">
                <div data-reveal="content" className="flex items-start justify-between gap-[20px]">
                  <h3 className="text-subtitle text-black whitespace-pre-line line-clamp-2 !mb-0">{project.title}</h3>
                  <ArrowButton as="span" tone="dark" className="shrink-0" />
                </div>

                <p data-reveal="content" className="mt-[10px] text-description-2 text-[#4A5565] !mb-0">
                  Industry: {project.industry}
                  <span className="mx-[10px]">|</span>
                  Scope: {project.scope}
                </p>

                {/* Image */}
                <figure data-reveal="media" className={`relative mt-[25px] aspect-[480/350] overflow-hidden ${MEDIA_CLIP}`}>
                  <div data-reveal="zoom" className="absolute inset-0">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                  />
                  </div>
                </figure>
              </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        </div>

        <Reveal className="mt-[50px]">
          <ArrowButton href={data.cta.href} label={data.cta.label} tone="dark" />
        </Reveal>
      </div>
    </section>
  );
};

export default ProjectsSec;

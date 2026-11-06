"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import type { Sector, SectorsData } from "@/app/(v2)/v2/home/data";

// 16×16 arrow shown beside the active sector — public/assets/img/icons/sector_arrow_home.svg
const SmallArrow = () => (
  <Image
    src="/assets/img/icons/sector_arrow_home.svg"
    alt=""
    width={16}
    height={16}
    unoptimized // SVG — skip the image optimizer, which rejects SVGs
    className="block w-[16px] h-[16px] max-w-none shrink-0"
  />
);

const SectorItem = ({
  sector,
  isActive,
  onActivate,
}: {
  sector: Sector;
  isActive: boolean;
  onActivate: () => void;
}) => {
  const inner = (
    <>
      {/* Icon 50×50 — full white when active, 60% when not */}
      <Image
        src={sector.icon}
        alt=""
        width={50}
        height={50}
        unoptimized // SVG — skip the image optimizer, which rejects SVGs
        className={`w-[clamp(36px,2.604vw,50px)] h-[clamp(36px,2.604vw,50px)] shrink-0 transition-opacity duration-300 ${
          isActive ? "opacity-100" : "opacity-60"
        }`}
      />
      {/* 40px icon → title, 30px title → arrow.
          The arrow is absolutely positioned so it doesn't widen the grid column
          (it's hidden on inactive items, so it shouldn't reserve space). */}
      <span
        className={`relative ml-[clamp(20px,2.083vw,40px)] text-subtitle whitespace-nowrap transition-colors duration-300 ${
          isActive ? "text-white" : "text-white/60"
        }`}
      >
        {sector.title}
        <span
          className={`absolute left-full top-1/2 ml-[30px] -translate-y-1/2 transition-opacity duration-300 ${
            isActive ? "opacity-100" : "opacity-0"
          }`}
        >
          <SmallArrow />
        </span>
      </span>
    </>
  );

  const className = "flex items-center text-left cursor-pointer";
  const handlers = { onMouseEnter: onActivate, onFocus: onActivate };

  return sector.href ? (
    <Link href={sector.href} className={className} {...handlers}>
      {inner}
    </Link>
  ) : (
    <button type="button" className={className} aria-pressed={isActive} onClick={onActivate} {...handlers}>
      {inner}
    </button>
  );
};

const SectorsSec = ({ data }: { data: SectorsData }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectors = data?.sectors ?? [];

  if (!sectors.length) return null;

  return (
    <section className="relative flex flex-col overflow-hidden bg-black lg:block">
      {/* Background image + gradient (behind the left side) */}
      {data.bgImage && (
        <Image src={data.bgImage} alt="" fill sizes="100vw" className="object-cover object-left" />
      )}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(181.44deg, rgba(0, 0, 0, 0) 31.4%, #000000 78.41%)" }}
      />

      {/* Right image — 850×914 at 1920, flush to the right edge and full section height.
          On mobile it stacks under the content. */}
      <div className="relative aspect-[850/914] lg:absolute lg:inset-y-0 lg:right-0 lg:w-[44.27vw] lg:aspect-auto order-last">
        {sectors.map((sector, index) => (
          <Image
            key={index}
            src={sector.image}
            alt={sector.alt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className={`object-cover transition-opacity duration-500 ease-in-out ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Left content — sits in the container, stops a 130px gap short of the image.
          Section is at least as tall as the image (914 / 1920 = 47.6vw). */}
      <div className="container relative">
        <div className="section-spacing flex flex-col justify-between gap-[60px] lg:min-h-[47.6vw] lg:max-w-[calc(55.73vw-(100vw-100%)/2-var(--space-130))]">
          <div>
            <h2 className="heroTitle text-white whitespace-pre-line">{data.title}</h2>
            <p className="mt-[30px] max-w-[695px] text-description text-[#B8B8B8] !mb-0">{data.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[auto_auto] justify-start gap-x-[95px] gap-y-[50px]">
            {sectors.map((sector, index) => (
              <SectorItem
                key={sector.title}
                sector={sector}
                isActive={index === activeIndex}
                onActivate={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectorsSec;

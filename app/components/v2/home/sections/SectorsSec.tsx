"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { Sector, SectorsData } from "@/app/(v2)/v2/home/data";

const SmallArrow = () => (
  <Image
    src="/assets/img/icons/sector_arrow_home.svg"
    alt=""
    width={16}
    height={16}
    unoptimized
    className="block w-[16px] h-[16px] max-w-none shrink-0 pointer-events-none"
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
      <Image
        src={sector.icon}
        alt=""
        width={50}
        height={50}
        unoptimized
        className={`pointer-events-none w-[clamp(36px,2.604vw,50px)] h-[clamp(36px,2.604vw,50px)] shrink-0 transition-opacity duration-300 ${
          isActive ? "opacity-100" : "opacity-60"
        }`}
      />
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

// Outgoing image is clipped away from the left edge; GSAP tweens --edge (0 → 100)
const WIPE_CLIP = "inset(0 0 0 calc(var(--edge) * 1%))";

const SectorsSec = ({ data }: { data: SectorsData }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const shownRef = useRef(0);
  const sectors = data?.sectors ?? [];

  const activate = (index: number) => setActiveIndex(index);

  // Wipes that are still running stay on top of the new one, so fast hovers stack instead of jumping
  useEffect(() => {
    const images = imagesRef.current;
    const outgoing = images[shownRef.current];
    const incoming = images[activeIndex];
    if (shownRef.current === activeIndex || !outgoing || !incoming) return;
    shownRef.current = activeIndex;

    gsap.killTweensOf(incoming);
    images.forEach((image) => {
      if (!image || image === outgoing || image === incoming) return;
      if (gsap.isTweening(image)) gsap.set(image, { zIndex: Number(image.style.zIndex) + 1 });
      else gsap.set(image, { visibility: "hidden", zIndex: 0 });
    });
    gsap.set(incoming, { visibility: "visible", zIndex: 0 });
    incoming.style.clipPath = "";

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(outgoing, { visibility: "hidden" });
      return;
    }

    gsap.fromTo(incoming, { scale: 1.06 }, { scale: 1, duration: 1.2, ease: "power3.out" });

    // clip-path set directly — GSAP can't parse the var() inside it
    gsap.set(outgoing, { zIndex: 1 });
    outgoing.style.clipPath = WIPE_CLIP;
    gsap.fromTo(
      outgoing,
      { "--edge": 0 },
      {
        "--edge": 100,
        duration: 0.9,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.set(outgoing, { visibility: "hidden", zIndex: 0 });
          outgoing.style.clipPath = "";
        },
      }
    );
  }, [activeIndex]);

  if (!sectors.length) return null;

  return (
    <section className="relative flex flex-col overflow-hidden bg-black lg:block">
      {/* Background */}
      {data.bgImage && (
        <Image src={data.bgImage} alt="" fill sizes="100vw" className="object-cover object-left pointer-events-none" />
      )}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(181.44deg, rgba(0, 0, 0, 0) 31.4%, #000000 78.41%)" }}
      />

      {/* Image */}
      <div className="relative overflow-hidden aspect-[850/914] lg:absolute lg:inset-y-0 lg:right-0 lg:w-[44.27vw] lg:aspect-auto order-last">
        {sectors.map((sector, index) => (
          <Image
            key={index}
            ref={(el) => {
              imagesRef.current[index] = el;
            }}
            src={sector.image}
            alt={sector.alt}
            fill
            loading="eager"
            sizes="(min-width: 1024px) 45vw, 100vw"
            onLoad={(e) => e.currentTarget.decode?.().catch(() => {})}
            className={`pointer-events-none object-cover ${index === 0 ? "" : "invisible"}`}
          />
        ))}
      </div>

      {/* Content */}
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
                onActivate={() => activate(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectorsSec;

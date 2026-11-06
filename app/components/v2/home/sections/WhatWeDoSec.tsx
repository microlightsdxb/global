"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import ArrowButton from "@/app/components/v2/common/ArrowButton";
import Reveal, { REVEAL_STAGGER } from "@/app/components/v2/common/Reveal";
import useCardReveal, { MEDIA_CLIP } from "@/app/components/v2/common/useCardReveal";
import type { ServiceItem, WhatWeDoData } from "@/app/(v2)/v2/home/data";

const ServiceCard = ({ service }: { service: ServiceItem }) => {
  const inner = (
    <>
      {/* Image */}
      <figure data-reveal="media" className={`relative aspect-[365/275] overflow-hidden ${MEDIA_CLIP}`}>
        <div data-reveal="zoom" className="absolute inset-0">
        <Image
          src={service.image}
          alt={service.alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
        />
        </div>
      </figure>

      <h3 data-reveal="content" className="mt-[30px] text-subtitle text-white !mb-0">{service.title}</h3>
      <p data-reveal="content" className="mt-[25px] text-description text-[#B8B8B8] !mb-0">{service.description}</p>

      <div data-reveal="content" className="mt-[40px]">
        <ArrowButton as="span" className="opacity-40 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
    </>
  );

  return service.href ? (
    <Link href={service.href} className="group flex flex-col">
      {inner}
    </Link>
  ) : (
    <div className="group flex flex-col">{inner}</div>
  );
};

const WhatWeDoSec = ({ data }: { data: WhatWeDoData }) => {
  const services = data?.services ?? [];
  const listRef = useRef<HTMLDivElement>(null);
  useCardReveal(listRef);

  if (!services.length) return null;

  return (
    <section className="relative overflow-hidden bg-black">
      {/* Background */}
      <Image src={data.bgImage} alt="" fill sizes="100vw" className="object-cover object-top pointer-events-none" />

      <div className="container relative section-spacing">
        <Reveal>
          <h2 className="section-title text-white">{data.title}</h2>
        </Reveal>
        <Reveal delay={REVEAL_STAGGER}>
          <p className="mt-[30px] max-w-[740px] text-description text-[#B8B8B8] !mb-0">{data.description}</p>
        </Reveal>

        <div ref={listRef} className="mt-[50px] grid grid-cols-1 gap-x-[20px] gap-y-[50px] sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div key={service.title} data-reveal="card">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSec;

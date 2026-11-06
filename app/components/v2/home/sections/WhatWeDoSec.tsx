import Image from "next/image";
import Link from "next/link";
import React from "react";
import ArrowButton from "@/app/components/v2/common/ArrowButton";
import type { ServiceItem, WhatWeDoData } from "@/app/(v2)/v2/home/data";

const ServiceCard = ({ service }: { service: ServiceItem }) => {
  const inner = (
    <>
      {/* Image */}
      <figure className="relative aspect-[365/275] overflow-hidden">
        <Image
          src={service.image}
          alt={service.alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </figure>

      <h3 className="mt-[30px] text-subtitle text-white !mb-0">{service.title}</h3>
      <p className="mt-[25px] text-description text-[#B8B8B8] !mb-0">{service.description}</p>

      <ArrowButton
        as="span"
        className="mt-[40px] opacity-40 transition-opacity duration-300 group-hover:opacity-100"
      />
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
  if (!services.length) return null;

  return (
    <section className="relative overflow-hidden bg-black">
      {/* Background */}
      <Image src={data.bgImage} alt="" fill sizes="100vw" className="object-cover object-top" />

      <div className="container relative section-spacing">
        <h2 className="section-title text-white">{data.title}</h2>
        <p className="mt-[30px] max-w-[740px] text-description text-[#B8B8B8] !mb-0">{data.description}</p>

        <div className="mt-[50px] grid grid-cols-1 gap-x-[20px] gap-y-[50px] sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSec;

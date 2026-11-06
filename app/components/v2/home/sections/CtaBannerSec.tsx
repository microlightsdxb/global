import Image from "next/image";
import React from "react";
import BoxButton from "@/app/components/v2/common/BoxButton";
import type { CtaBannerData } from "@/app/(v2)/v2/home/data";

const CtaBannerSec = ({ data }: { data: CtaBannerData }) => {
  return (
    <section className="relative overflow-hidden bg-black">
      <Image src={data.bgImage} alt="" fill sizes="100vw" className="object-cover object-center pointer-events-none" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(81.21deg, #000000 13.51%, rgba(0, 0, 0, 0.7) 46.92%, rgba(0, 0, 0, 0) 81.69%), linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))",
        }}
      />

      <div className="container relative section-spacing">
        <h2 className="section-title text-white">{data.title}</h2>
        <p className="mt-[30px] max-w-[700px] text-description text-[#B8B8B8] !mb-0">{data.description}</p>
        <BoxButton href={data.cta.href} label={data.cta.label} className="mt-[50px]" />
      </div>
    </section>
  );
};

export default CtaBannerSec;

"use client";
import { assets } from "@/public/assets/assets";
import React from "react";
import Image from "next/image";

const Certifications = () => {
  return (
    <section className="py-100 bg-[#F1F6F0]">
      <div className="container">
        <h2 className="text-xl text-black leading-[1.3] mb-4 md:mb-8">
          Certifications & Standards
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2  border border-[#00000015]">
          <div className="p-10 border-r border-[#00000015]">
          <div className="flex gap-5">
              <Image src={assets.cer1} alt="" />
              </div>
            <div className="border-t   mt-10 "></div>
            <div className="pt-8">
              <h4 className="text-lg text-black mb-5 leading-[1.2]">
                LEED Certification
              </h4>
              <p className="text-[#555555] font-[300]">
                Many of our projects contribute to LEED (Leadership in Energy
                and Environmental Design) certification, showcasing our role in
                sustainable building practices.
              </p>
            </div>
          </div>
          <div className="p-10">
            <div className="flex gap-5">
            <Image src={assets.cer2} alt="" />
            <Image src={assets.cer3} alt="" />
          </div>
            <div className="border-t   mt-10 "></div>
            <div className="pt-8">
              <h4 className="text-lg text-black mb-5 leading-[1.2]">
                LEED Certification
              </h4>
              <p className="text-[#555555] font-[300]">
                Many of our projects contribute to LEED (Leadership in Energy
                and Environmental Design) certification, showcasing our role in
                sustainable building practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;

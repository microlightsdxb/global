"use client";
import React, { useState } from "react";
import Image from "next/image";
import { assets } from "@/public/assets/assets";

const items = [
  { id: 1, number: "01", icon: assets.arrright, title: "Conceptual Design", description: "Our lighting designers utilize lighting simulation software to ensure the proposed fixtures deliver sufficient ambient light and achieve optimal illumination. At this point, we produce a 3D visualization of the intended lighting design.." },
  { id: 2, number: "02", icon: assets.arrright, title: "Lighting Calculations", description: "Our lighting designers utilize lighting simulation software to ensure the proposed fixtures deliver sufficient ambient light and achieve optimal illumination. At this point, we produce a 3D visualization of the intended lighting design.." },
  { id: 3, number: "03", icon: assets.arrright, title: "Design Documentations", description: "Our lighting designers utilize lighting simulation software to ensure the proposed fixtures deliver sufficient ambient light and achieve optimal illumination. At this point, we produce a 3D visualization of the intended lighting design.." },
  { id: 4, number: "04", icon: assets.arrright,title: "Final Commissioning & After Sales", description: "Our lighting designers utilize lighting simulation software to ensure the proposed fixtures deliver sufficient ambient light and achieve optimal illumination. At this point, we produce a 3D visualization of the intended lighting design.." },
];

const Conceptual = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <>
      <section className="bg-[#000] overflow-hidden relative pb-100">
        <div className="container  ">
          <div >
            <div className="grid grid-cols-1 md:grid-cols-2 ">
            <div className="py-70">
      {items.map((item) => {
        const isInitiallyActive = item.id === 2 && hoveredId === null;
        const isHovered = hoveredId === item.id;

        return (
          <div
            key={item.id}
            className={`flex items-center gap-5 pmargin0 py-10 border-b border-[#595959] justify-between pr-[60px] transition-all duration-300
            ${isHovered || isInitiallyActive ? "befst  scale-[1.02]" : "scale-100"}`}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="flex items-center gap-5">
              <p className={`text-2xl leading-[1] text-40 transition-all duration-500 ease-in-out
              ${isHovered || isInitiallyActive ? "translate-x-2" : "translate-x-0"}`}>{item.number}</p>
              <div className="flex flex-col ">
                <p className="text-white text-lg">{item.title}</p>
                <div
                  className={`descd transition-all duration-100 ease-in-out transform ${
                    isHovered || isInitiallyActive ? "opacity-100 h-auto translate-y-0" : "opacity-0 h-0 translate-y-5"
                  }`}
                >
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
            <div className="min-w-[38px] min-h-[25px]">
              <Image src={item.icon} alt="" width={38} height={25} />
            </div>
          </div>
        );
      })}
    </div>
              <div className="">
                <figure className="absolute w-full h-full border border-[#00000010] flex">
                  <Image
                    className="object-cover  "
                    src={assets.sersec}
                    alt="Apollo"
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container  ">
        <div className="border-b border-black pb-100"> </div>
      </div>
    </>
  );
};

export default Conceptual;

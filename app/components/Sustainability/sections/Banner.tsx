"use client";
import React from "react";
const Banner = ({}) => {
  return (
    <section className="ptc-213 pb-100 relative bg-[#F1F6F0] overflow-hidden">
      <div className="container ">
        <div className="lg:flex">
          <div className="w-full lg:w-1/2 mb-5 lg:mb-0">
            <p className="text-2xl text-black max-w-[14ch]">Sustainability at Microlights Group</p>
          </div>
          <div className="w-full lg:w-1/2">
            <p className="font-[300]">
            Since the beginning of our journey, our sustainability mission has been clear: to build a brighter, more sustainable future. Sustainability is at the heart of everything we do. Each project we undertake, and every collaboration with clients, partners, and stakeholders, is an opportunity to shape a world where lighting not only illuminates spaces but also protects and nurtures the environment for future generations. Through these partnerships, we aim to lead by example and make a lasting impact on the lighting industry.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;

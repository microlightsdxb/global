"use client";
import React from "react";
import { assets } from "@/public/assets/assets";

const Imgbanner = () => {
  return (
    <section>
    <div
      className="relative gd-blacktrans"
      style={{
        backgroundImage: `url(${assets.aboutbanner.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container relative z-1">
        <div className="  pt-[190px] md:pt-[280px] lg:pt-[343px] pb-[30px] md:pb-[50px] lg:pb-[93px]">
          <h1 className="text-white text-2xl leading-[1.2]">About Us</h1>
        </div>
      </div>
    </div>
  </section>

  );
};

export default Imgbanner;

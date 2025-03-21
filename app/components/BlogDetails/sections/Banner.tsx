"use client";
import React from "react";
const Banner = ({}) => {
  return (
    <section className="pt-20 md:pt-20 lg:pt-30 xl:pt-40 pb-100 relative bg-[#f8f8f8] overflow-hidden">
      <div className="container ">
        <div className=" lg:flex">
          <div className="w-full lg:w-1/2 mb-5 lg:mb-0">
            <div className="flex gap-6 lg:gap-10 border-b border-black w-fit pb-8 pmargin0">
            <p>Dec 11, 2024</p>
            <p>Trends</p>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <p className="text-2xl text-black">
            5 Eye Catching Lighting Solution Examples
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;

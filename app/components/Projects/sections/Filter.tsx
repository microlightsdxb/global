"use client";
import { assets } from "@/public/assets/assets";
import React from "react";

import Image from "next/image";
import Link from "next/link";


const Filter = () => {
  return (
    <section className="py-100 ">
      <div className="container">
        <div>
          <h2 className="text-2xl text-black mb-[15px] md:mb-[28px] leading-[1.3]">
            Projects
          </h2>
        </div>
        <div className="block md:flex bg-black p-10 pt-5 items-center">
          <div className="w-full md:w-4/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px]">
              <div>
                <div className="relative w-full">
                <select className="w-full bg-transparent text-white py-2 pr-8 pl-3 border-b border-white appearance-none focus:outline-none focus:border-gray-300 transition duration-300">
              <option className="bg-black text-white" value="Industry">Industry</option>
              <option className="bg-black text-white" value="Technology">Technology</option>
              <option className="bg-black text-white" value="Finance">Finance</option>
            </select>

                  <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-white">
                   <Image src={assets.arrdn} alt=""></Image>
                  </div>
                </div>
              </div>
              <div><div className="relative w-full">
              <select className="w-full bg-transparent text-white py-2 pr-8 pl-3 border-b border-white appearance-none focus:outline-none focus:border-gray-300 transition duration-300">
  <option className="bg-black text-white" value="Location">Location</option>
  <option className="bg-black text-white" value="City">City</option>
  <option className="bg-black text-white" value="Country">Country</option>
</select>

                  <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-white">
                   <Image src={assets.arrdn} alt=""></Image>
                  </div>
                </div></div>
            </div>
          </div>
          <div className="w-full md:w-1/5">
          <div className="flex mt-5 2xl:mt-[30px]   group-hover:flex transition-all ease-in-out duration-500 justify-end">
              <Link
                href={"/"}
                className="flex gap-[20px] items-center text-white border-t border-white text-sm   border-solid leading-none pt-[12px] cursor-pointer group"
              >
                Clear{" "}
                <Image src={assets.iconback} alt="" className="text-[22px] text-[#7D7D7D] group-hover:scale-125 transition-all ease-in-out duration-500"></Image>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Filter;

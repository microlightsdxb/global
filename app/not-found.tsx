"use client";
import React from "react";
import Image from "next/image";
import "/app/globals.css";

import { MdOutlineArrowForward } from "react-icons/md";
import Link from "next/link";


export const dynamic = "force-dynamic";

const page = () => {
  return (
    <div className="er-pg">
      <div className="text-center cdedd">
          <div className="flex justify-center h-[48dvh] alnbase items-center px-4">
  
            <p className="rtts text-[11em] md:text-[13em] animate-[float2_6s_ease-in-out_infinite] text-black">
              4
            </p>

            <div className="xemn animate-[float_3s_ease-in-out_infinite]">
              <p className="zerost text-[13em] md:text-[18em] 
                animate-[colorShift_4s_linear_infinite]">
                <span>0</span>
              </p>
            </div>

            <p className="rtts text-[11em] md:text-[13em] animate-[float2_6s_ease-in-out_infinite] text-black">
              4
            </p>

          </div>


        <div className="h-[38dvh] h38dd">
          <div className="w-1/6 pt-10 m-auto border-t-1"></div>
          <div>
          <h2 className="mb-3 flex items-center justify-center uppercase md:text-[35px]  lg:mb-[17px] lg:text-[47px] ">
            <span className="font-bold">UH OH! You're lost. </span>
            
          </h2>

          <p className="fnt-lexend fnt404 mb-3 pe-2 ps-2 text-font16 text-[#909496] md:text-[20px] lg:mb-[57px]">
            Looks like the page you were looking for is no longer here.
          </p>
          <div className="flex gap-2 md:gap-4  justify-center">
            <div className="mt-4 flex justify-center group">
            <Link
              href="/contact-us"
              className="min-w-[150px] justify-center p404 flex w-fit items-center justify-between gap-10 rounded-full border border-primary
                        px-[25px] py-[15px] text-font16 uppercase leading-lh1p66 text-black transition-all   duration-300 ease-in group-hover:shadow-lg"
            >
              <span className="flex items-center justify-center gap-3 text-[12px] md:text-[14px] transition-transform duration-300 ease-in-out group-hover:translate-x-1 group-hover:text-gray1 md:text-font16">
                Contact Us
                <MdOutlineArrowForward className="bg-[#333] group-hover:bg-black text-white" />
              </span>
            </Link>
          </div>
          <div className="mt-4 flex justify-center group">
            <Link
              href="/sitemap"
              className="min-w-[150px] justify-center p404 flex w-fit items-center justify-between gap-10 rounded-full border border-primary
                        px-[25px] py-[15px] text-font16 uppercase leading-lh1p66 text-black transition-all   duration-300 ease-in group-hover:shadow-lg"
            >
              <span className="flex items-center justify-center gap-3 text-[12px] md:text-[14px] transition-transform duration-300 ease-in-out group-hover:translate-x-1 group-hover:text-gray1 md:text-font16">
                Sitemap
                <MdOutlineArrowForward className="bg-[#333] group-hover:bg-black text-white" />
              </span>
            </Link>
          </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

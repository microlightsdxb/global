"use client";
import { assets } from "@/public/assets/assets";
import React from "react";
import Image from "next/image";
const Banner = ({}) => {
  return (
    <section className="ptc-130 pb-100 relative bg-[#f8f8f8] overflow-hidden">
      <div className="container ">
        <div className="flex flex-col-reverse md:flex-row">
          <div className="w-full md:w-1/2">
            <h1 className="text-2xl text-black mb-2 md:mb-4 leading-[1.2]">
              Word from the MD
          </h1>
          <p className="font-[300] ">
            I started my career with Microlights as Regional Sales Manager in
            2009.  I then moved into a Sales Director position, before finally
            becoming the Managing Director of the company in 2022. I am very
            proud to have been part of the Microlights journey, and equally
            proud to have worked for such a dynamic and enterprising SME that
            always puts its clients needs first.  
          </p>

          <p className="font-[300]">
            Many of our clients have been purchasing our products for over 20
            years, but it is not just about purchasing products.  Microlights
            prides itself on its client relationships, and its after care
            service, which has meant that clients have always come back to us.
            Having a strong and motivated team has been part of the success that
            the company has achieved over the years, and the company has been
            fortunate to acquire the necessary talent to ensure the continued
            delivery of our products and services. I am very excited to be at
            the helm of the company as it moves into its next chapter of
            expansion and growth in the Middle East region which continues to
            evolve.
          </p>
          <div>
            <p className="text-lg text-black leading-[1.4] mt-4 md:mt-9">Julian Beglar</p>
            <p>Managing Director</p>
          </div>
        </div>
        <div className="md:absolute top-0 md:top-[23%] xl:top-0 right-0 mb-5 md:mb-0 md:w-[50%] lg:w-[50%] ">
          <Image src={assets.md} alt=""  ></Image>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;

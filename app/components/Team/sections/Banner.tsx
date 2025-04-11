"use client";
import parse from "html-react-parser";
import React from "react";
import Image from "next/image";

interface MdData {
    mdName: string;
    mdDesignation: string;
    mdDescription: string;
    mdImage: string;
}


const Banner = ({data}:{data:MdData}) => {
  return (
    <section className="ptc-130  relative bg-[#f8f8f8] overflow-hidden">
      <div className="container ">
        <div className="flex flex-col-reverse lg:flex-row 2xl:pt-20">
          <div className="w-full lg:w-1/2 pb-100">
            <h1 className="text-2xl text-black mb-2 lg:mb-4 leading-[1.2]">
              Word from the MD
          </h1>
          <div className="font-[300]">
            {parse(data?.mdDescription || "")}
          </div>
          {/* <p className="font-[300] ">
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
          </p> */}
          <div>
            <p className="text-lg text-black leading-[1.4] mt-4 lg:mt-9">
              {data?.mdName}
            </p>
            <p>{data?.mdDesignation}</p>
          </div>
        </div>
        <div className="lg:absolute  right-0  mb-5 lg:mb-0 w-full h-full top-0 lg:w-1/2">
          <Image src={data?.mdImage} alt="" className="lg:absolute  right-0 bottom-0" height={1000} width={1000}></Image>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;

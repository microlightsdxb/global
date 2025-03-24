"use client";
import React from "react";
import moment from "moment";

const Banner = ({data}:{data:{data:{createdAt:string,category:string,title:string}}}) => {
  return (
    <section className="pt-20 md:pt-20 lg:pt-30 xl:pt-40 pb-100 relative bg-[#f8f8f8] overflow-hidden">
      <div className="container ">
        <div className=" lg:flex">
          <div className="w-full lg:w-1/2 mb-5 lg:mb-0">
            <div className="flex gap-6 lg:gap-10 border-b border-black w-fit pb-8 pmargin0">
            <p>{moment(data?.data?.createdAt).format("ll")}</p>
            <p>{data?.data?.category}</p>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <p className="text-2xl text-black leading-[1.18]">
            {data?.data?.title}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;

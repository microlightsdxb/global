"use client";
import React from "react";
import Image from "next/image";
import { assets } from "@/public/assets/assets";
import {categories} from "../data/dataBox"
import Bloglist from "./Bloglist";
import parse from "html-react-parser";

interface FrameworkItem {
  data:{
    _id:string,
    title:string,
    image:string,
    content:string,
    category:string,
    createdAt:string,
  }
}

interface RecentBlogItem {
    _id:string,
    title:string,
    image:string,
    category:string,
    createdAt:string,
  }

interface FrameworkSectionProps {
  data: FrameworkItem;
  recentBlogData: RecentBlogItem[];
}

const Blogdetails: React.FC<FrameworkSectionProps> = ({ data, recentBlogData }) => {
  return (
    <>
      <section className="ptc-120 pbc-135  ">
        <div className="container">
          <div className="lg:flex gap-5 lg:gap-10 xl:gap-[70px]">
            <div className="lg:w-4/6 xl:w-7/9">
            
          <div>
              <div>
                <figure className="w-full h-full ">
                  <Image
                    src={data?.data?.image}
                    alt="bnr"
                    className="w-full h-full"
                    width={500}
                    height={500}
                  />
                </figure>
              </div>
                <div className="font-[300] mt-2 md:mt-4 lg:mt-12 pt-4 leading-[1.7]">
                
              {parse(data?.data?.content || "")}
            
                </div>
              </div>
                
            </div>
            <div className="lg:w-2/6 xl:w-2/9">
              <div className="pmargin0">
                <p>Share</p>
                <div className="flex gap-3 mt-5">

                <div className="w-10 h-10 bg-black flex justify-center items-center rounded-3xl"><Image src={assets.lin} alt=""></Image></div>
                <div className="w-10 h-10 bg-black flex justify-center items-center rounded-3xl"><Image src={assets.insta} alt=""></Image></div>
                </div>
              </div>

         <Bloglist data={recentBlogData} categories={categories} />
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        <div className="border-b border-black"></div>
      </div>
    </>
  );
};

export default Blogdetails;

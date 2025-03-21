"use client";
import React    from "react";
import Image, { StaticImageData } from "next/image";
import { assets } from "@/public/assets/assets";
import { blogdetails ,categories} from "../data/dataBox"
import Bloglist from "./Bloglist";

interface FrameworkItem {
  id: number;
  dec: string[];
  image: StaticImageData;
}

interface FrameworkSectionProps {
  data: FrameworkItem[];
}

const Blogdetails: React.FC<FrameworkSectionProps> = ({ data }) => {


  return (
    <>
      <section className="ptc-130 pb-10  ">
        <div className="container">
          <div className="lg:flex gap-5 lg :gap-10 xl:gap-[70px]">
            <div className="lg:w-4/6">
            {data.map((framework) => (
          <div key={framework.id}>
              <div>
                <figure className="    w-full h-full ">
                  <Image
                    src={framework.image}
                    alt="bnr"
                    className="w-full h-full  "
                  />
                </figure>
              </div>
                <div className="font-[300] mt-2 md:mt-4 lg:mt-12 pt-4">
                {framework.dec.map((paragraph, index) => (
              <p key={index} >{paragraph}</p>
            ))}
                </div>
              </div>
                ))}
            </div>
            <div className="lg:w-2/6">
              <div className="pmargin0">
                <p>Share</p>
                <div className="flex gap-3 mt-5">

                <div className="w-10 h-10 bg-black flex justify-center items-center rounded-3xl"><Image src={assets.lin} alt=""></Image></div>
                <div className="w-10 h-10 bg-black flex justify-center items-center rounded-3xl"><Image src={assets.insta} alt=""></Image></div>
                </div>
              </div>

         <Bloglist data={blogdetails} categories={categories} />
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

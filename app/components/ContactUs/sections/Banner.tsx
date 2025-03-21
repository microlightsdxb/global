"use client";
import React from "react";




interface FrameworkItem {
  id: number;
  title: string;
  image: string;
}
interface FrameworkSectionProps {
  data: FrameworkItem[];
}



const Banner: React.FC<FrameworkSectionProps> = ({
  data

}) => {


  return (
    <section>

      {data.map((framework) => (
        <div
          className="relative gd-blacktrans" key={framework.id}
          style={{
            backgroundImage: `url(${framework.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="container relative z-1">
            <div className="  pt-[190px] md:pt-[240px] lg:pt-[290px]  ">
              <h1 className="text-white text-[100px] md:text-[150px]  xl:text-[250px] 2xl:text-[300px] leading-[1] md:leading-[.7]">{framework.title}</h1>
            </div>
          </div>
        </div>
      ))}
  </section>

  );
};

export default Banner;

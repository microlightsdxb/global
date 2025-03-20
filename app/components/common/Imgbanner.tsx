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



const Imgbanner: React.FC<FrameworkSectionProps> = ({
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
            <div className="  pt-[190px] md:pt-[280px] lg:pt-[343px] pb-[30px] md:pb-[50px] lg:pb-[93px]">
              <h1 className="text-white text-2xl leading-[1.2]">{framework.title}</h1>
            </div>
          </div>
        </div>
      ))}
  </section>

  );
};

export default Imgbanner;

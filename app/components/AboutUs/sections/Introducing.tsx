"use client";
import React from "react";
import Image from "next/image";




interface FrameworkItem {
  id: number;
  title: string;
  dec: string[];
  icon: string;
}

interface FrameworkSectionProps {
  data: FrameworkItem[];
}



const Introducing: React.FC<FrameworkSectionProps> = ({
  data,

}) => {
  return (
    <section className="section-spacing ">
      <div className="container">

        {data.map((framework) => (
          <div key={framework.id}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px]">
              <div>
                <h2 className="text-xl text-black mb-[20px] md:mb-[57px] leading-[1.3]">{framework.title}</h2>
                <Image src={framework.icon} alt=""></Image>
              </div>
              <div>

                  {framework.dec.map((paragraph, index) => (
              <p key={index} className="text-sm leading-[1.7] font-light">{paragraph}</p>
            ))}
                </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Introducing;

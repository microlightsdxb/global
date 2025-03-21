"use client";
import React from "react";

interface FrameworkItem {
  id: number;
  dec: string[];
}

interface FrameworkSectionProps {
  data: FrameworkItem[];
}



const Contents: React.FC<FrameworkSectionProps> = ({
  data,

}) => {

  return (
    <section className="pt-100 pb-10 ">
      <div className="container">
        {data.map((framework) => (
          <div key={framework.id} className="pb-5 md:pb-8 lg:pb-[77px] border-b border-[#000000]">
            {framework.dec.map((paragraph, index) => (
              <p key={index} className="text-sm leading-[1.7] font-light">{paragraph}</p>
            ))}
           </div>
        ))}

      </div>
    </section>
  );
};

export default Contents;

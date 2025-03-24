"use client";
import React from "react";
import parse from 'html-react-parser';

interface FrameworkItem {
  data:{
    description: string;
  }
}

interface FrameworkSectionProps {
  data: FrameworkItem;
}



const Contents: React.FC<FrameworkSectionProps> = ({
  data,

}) => {

  return (
    <section className="pt-100 pb-10 ">
      <div className="container">
        
          <div className="pb-5 md:pb-8 lg:pb-[77px] border-b border-[#000000]">
              <div className="text-sm leading-[1.7] font-light">{parse(data?.data?.description || "")}</div>
           </div>
        

      </div>
    </section>
  );
};

export default Contents;

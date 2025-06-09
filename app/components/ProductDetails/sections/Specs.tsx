"use client";
import React from "react";

interface FrameworkItem {
  _id: string;
  name: string;
  items: {
    title: string;
    value: string;
  }[]
}
interface FrameworkSectionProps {
  data: FrameworkItem;
}



const PdtSpec: React.FC<FrameworkSectionProps> = ({
  data

}) => {
  return (
    <div>

      <div key={data._id} className="">
        <div className="text-lg font-[500] leading-[1.4] px-5 py-2 bg-black text-white mb-4 md:mb-6 ">
          {data.name}
        </div>
        <div className="mb-12">
          <div >
            {data?.items?.map((item, index) => (
              <div key={index} className="flex border-b border-[#00000010]">
                <div className="w-1/3 py-3">
                  {item.title}
                </div>
                <div className="w-2/3 py-3">
                  {item.value}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>


    </div>
  );
};

export default PdtSpec;

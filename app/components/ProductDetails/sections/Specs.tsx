"use client";
import React from "react";

interface decs {
  keys: string;
  values: string;
}
interface FrameworkItem {
  id: number;
  title: string;
  dec: decs[];
}
interface FrameworkSectionProps {
  data: FrameworkItem[];
}



const PdtSpec: React.FC<FrameworkSectionProps> = ({
  data

}) => {
  return (
    <div>
      {data.map((framework) => (
          <div key={framework.id}>
                <div className="text-lg font-[500] leading-[1.4] px-5 py-2 bg-black text-white mb-4 md:mb-6 ">
                  {framework.title}
                </div>
                <div className="mb-12">
            <div >
            {framework.dec.map((paragraph, index) => (
              <div key={index} className="flex border-b border-[#00000010]">
                    <div className="w-1/3 py-3">
                  {paragraph.keys}
                    </div>
                    <div className="w-2/3 py-3">
                    {paragraph.values}
                      </div>
                    </div>
              ))}
                  </div>

                </div>
         </div>

      ))}
              </div>
  );
};

export default PdtSpec;

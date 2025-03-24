"use client";
import { assets } from "@/public/assets/assets";
import React from "react";

import Image from "next/image";


const Filter = ({industryData, locationData, setIndustrySelected, setLocationSelected, industrySelected, locationSelected}: {industryData: {data:{name:string}[], setIndustrySelected: (name: string)=>void, industrySelected: string}, locationData: {data:{name:string}[], setLocationSelected: (name: string)=>void, locationSelected: string}, setIndustrySelected: (name: string)=>void, setLocationSelected: (name: string)=>void, industrySelected: string, locationSelected: string}) => {
  return (
    <section className="py-100">
      <div className="container">
        <div>
          <h2 className="text-2xl text-black mb-[15px] md:mb-[28px] leading-[1.3]">
            Projects
          </h2>
        </div>
        <div className="flex bg-black p-10 pt-5 items-center">
          <div className="w-4/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px]">
              <div>
                <div className="relative w-full">
                  <select className="w-full bg-transparent pb-4 border-b border-white text-[#ffffff40] py-2 pr-8 focus:outline-none focus:border-gray-300 appearance-none" value={industrySelected} onChange={(e)=>setIndustrySelected(e.target.value)}>
                    <option className="bg-black text-white" value={"Industry"}>
                        Industry
                      </option>
                    {industryData?.data?.map((item: {name: string},index: number)=>(
                      <option className="bg-black text-white" value={item.name} key={index}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-white">
                   <Image src={assets.arrdn} alt=""></Image>
                  </div>
                </div>
              </div>
              <div><div className="relative w-full">
                  <select className="w-full bg-transparent pb-4 border-b border-white text-[#ffffff40] py-2 pr-8 focus:outline-none focus:border-gray-300 appearance-none" value={locationSelected} onChange={(e)=>setLocationSelected(e.target.value)}>
                    <option className="bg-black text-white" value="Location">
                    Location
                    </option>
                    {locationData?.data?.map((item: {name: string},index: number)=>(
                      <option className="bg-black text-white" value={item.name} key={index}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-white">
                   <Image src={assets.arrdn} alt=""></Image>
                  </div>
                </div></div>
            </div>
          </div>
          <div className="w-1/5">
          <div className="flex mt-[15px] 2xl:mt-[30px]   group-hover:flex transition-all ease-in-out duration-500 justify-end">
              <button
                type="button"
                className="flex gap-[20px] items-center text-white border-t border-white text-sm   border-solid leading-none pt-[12px] cursor-pointer group" onClick={()=>{
                  setIndustrySelected("Industry")
                  setLocationSelected("Location")
                }}
              >
                Clear{" "}
                <Image src={assets.iconback} alt="" className="text-[22px] text-[#7D7D7D] group-hover:scale-125 transition-all ease-in-out duration-500"></Image>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Filter;

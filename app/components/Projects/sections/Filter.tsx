"use client";
import { assets } from "@/public/assets/assets";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import { motion } from "framer-motion";
import Select from 'react-select'

interface Option {
  value: string;
  label: string;
}


const Filter = ({ industryData, locationData, setIndustrySelected, setLocationSelected }: { industryData: { data: { name: string }[], setIndustrySelected: (name: string) => void, industrySelected: string }, locationData: { data: { name: string }[], setLocationSelected: (name: string) => void, locationSelected: string }, setIndustrySelected: (name: string) => void, setLocationSelected: (name: string) => void }) => {
  
  const [selectedIndustry, setSelectedIndustry] = useState<Option | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Option | null>(null);
  const [industryOptions, setIndustryOptions] = useState<Option[]>([]);
  const [locationOptions, setLocationOptions] = useState<Option[]>([]);
 
  const handleIndustryChange = (newValue: Option | null) => {
    setSelectedIndustry(newValue);
    setIndustrySelected(newValue?.value || "")
  };

  const handleLocationChange = (newValue: Option | null) => {
    setSelectedLocation(newValue);
    setLocationSelected(newValue?.value || "")
  };

  const handleClear = () => {
    setIndustrySelected("Industry")
    setLocationSelected("Location")
    setSelectedIndustry(null)
    setSelectedLocation(null)
  }

  useEffect(()=>{
    if(industryData?.data?.length>0){
      setIndustryOptions([{value: "Industry", label: "Industry"},...industryData?.data?.map((item: {name: string})=>({value: item.name, label: item.name}))]);
    }

    if(locationData?.data?.length>0){
      setLocationOptions([{value: "Location", label: "Location"},...locationData?.data?.map((item: {name: string})=>({value: item.name, label: item.name}))]);
    }
  },[industryData,locationData])

  
  return (
    <section className="py-100">
      <div className="container">
        <div><motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.5 }}>
          <h2 className="text-2xl text-black mb-[15px] md:mb-[28px] leading-[1.3]">
            Projects
          </h2>
        </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.5 }}>
          <div className="block md:flex bg-black p-6 md:p-10 pt-5 items-center">
            <div className="w-full md:w-4/5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px]">
                <div>
                  <div className="relative w-full">
                    <Select
                      options={industryOptions}
                      value={selectedIndustry}
                      onChange={handleIndustryChange}
                      isSearchable={true}
                      placeholder="Industry"
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          backgroundColor: "transparent",
                          border: "none",
                          borderBottom: "1px solid #fff",
                          color: "white",
                          borderRadius: "0px",
                          boxShadow: "none",
                          "&:hover": { borderBottom: "1px solid #fff" }
                        }),
                        singleValue: (provided) => ({
                          ...provided,
                          color: "white"
                        }),
                        placeholder: (provided) => ({
                          ...provided,
                          color: "white"
                        }),
                        input: (provided) => ({
                          ...provided,
                          color: "white"
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor: state.isSelected
                            ? "black"
                            : state.isFocused
                              ? "#333"
                              : "transparent",
                          color: state.isSelected || state.isFocused ? "white" : "black",
                          padding: 10
                        }),
                        menu: (provided) => ({
                          ...provided,
                          backgroundColor: "white",
                          borderBottom: "1px solid white"
                        })
                      }}
                    />
                    {/* <select className="w-full bg-transparent text-white py-2 pr-8 pl-3 border-b border-white appearance-none focus:outline-none focus:border-gray-300 transition duration-300" value={industrySelected} onChange={(e)=>setIndustrySelected(e.target.value)}>
                    <option className="bg-black text-white" value={"Industry"}>
                        Industry
                      </option>
                    {industryData?.data?.map((item: {name: string},index: number)=>(
                      <option className="bg-black text-white" value={item.name} key={index}>
                        {item.name}
                      </option>
                    ))}
                  </select> */}
                    {/* <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-white">
                      <Image src={assets.arrdn} alt=""></Image>
                    </div> */}
                  </div>
                </div>
                <div><div className="relative w-full">
                  {/* <select className="w-full bg-transparent text-white py-2 pr-8 pl-3 border-b border-white appearance-none focus:outline-none focus:border-gray-300 transition duration-300" value={locationSelected} onChange={(e) => setLocationSelected(e.target.value)}>
                    <option className="bg-black text-white" value="Location">
                      Location
                    </option>
                    {locationData?.data?.map((item: { name: string }, index: number) => (
                      <option className="bg-black text-white" value={item.name} key={index}>
                        {item.name}
                      </option>
                    ))}
                  </select> */}
                  <Select
                      options={locationOptions}
                      value={selectedLocation}
                      onChange={handleLocationChange}
                      isSearchable={true}
                      placeholder="Location"
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          backgroundColor: "transparent",
                          border: "none",
                          borderBottom: "1px solid #fff",
                          color: "white",
                          borderRadius: "0px",
                          boxShadow: "none",
                          "&:hover": { borderBottom: "1px solid #fff" }
                        }),
                        singleValue: (provided) => ({
                          ...provided,
                          color: "white"
                        }),
                        placeholder: (provided) => ({
                          ...provided,
                          color: "white"
                        }),
                        input: (provided) => ({
                          ...provided,
                          color: "white"
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor: state.isSelected
                            ? "black"
                            : state.isFocused
                              ? "#333"
                              : "transparent",
                          color: state.isSelected || state.isFocused ? "white" : "black",
                          padding: 10
                        }),
                        menu: (provided) => ({
                          ...provided,
                          backgroundColor: "white",
                          borderBottom: "1px solid white"
                        })
                      }}
                    />
                  {/* <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-white">
                    <Image src={assets.arrdn} alt=""></Image>
                  </div> */}
                </div></div>
              </div>
            </div>
            <div className="w-1/5 ml-auto  ">
              <div className="flex mt-[35px] 2xl:mt-[30px]   group-hover:flex transition-all ease-in-out duration-500 justify-end">
                <button
                  type="button"
                  className="flex gap-[20px] items-center text-white border-t border-white text-sm   border-solid leading-none pt-[12px] cursor-pointer group" onClick={handleClear}
                >
                  Clear{" "}
                  <Image src={assets.iconback} alt="" className="text-[22px] text-[#7D7D7D] group-hover:scale-125 transition-all ease-in-out duration-500"></Image>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Filter;

"use client";
import { assets } from "@/public/assets/assets";
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import Image from "next/image";
import { motion } from "framer-motion";
import Select from 'react-select'
import { FaCheck } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";

interface Option {
  value: string;
  label: string;
}


const Filter = ({ industryData, locationData, setIndustrySelected, setLocationSelected, selectedLocations, setSelectedLocations }: {
  industryData: { data: { name: string }[], setIndustrySelected: (name: string) => void, industrySelected: string },
  locationData: { data: { name: string }[], setLocationSelected: (name: string) => void, locationSelected: string },
  setIndustrySelected: (name: string) => void, setLocationSelected: (name: string) => void,
  setSelectedLocations: Dispatch<SetStateAction<string[]>>,
  selectedLocations: string[]

}) => {

  const [selectedIndustry, setSelectedIndustry] = useState<Option | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Option | null>(null);
  const [industryOptions, setIndustryOptions] = useState<Option[]>([]);
  const [locationOptions, setLocationOptions] = useState<Option[]>([]);

  const handleIndustryChange = (newValue: Option | null) => {
    setSelectedIndustry(newValue);
    setIndustrySelected(newValue?.value || "")
  };

  // const handleLocationChange = (newValue: Option | null) => {
  //   console.log(newValue)
  //   if (newValue) {
  //     setSelectedLocations((prev) => {
  //       const updated = [...(prev || []), newValue.value];
  //       return updated;
  //     });
  //     setSelectedLocation(newValue);
  //     setLocationSelected(newValue.value);
  //   }
  // };

  useEffect(() => {
    console.log(selectedLocation)
  }, [selectedLocation])

  const handleClear = () => {
    setIndustrySelected("Industry")
    setLocationSelected("Location")
    setSelectedIndustry(null)
    setSelectedLocation(null)
    setSelectedLocations([])
  }

  useEffect(() => {
    if (industryData?.data?.length > 0) {
      setIndustryOptions([{ value: "Industry", label: "Industry" }, ...industryData?.data?.map((item: { name: string }) => ({ value: item.name, label: item.name }))]);
    }

    if (locationData?.data?.length > 0) {
      setLocationOptions([...locationData?.data?.map((item: { name: string }) => ({ value: item.name, label: item.name }))]);
    }
  }, [industryData, locationData])


  return (
    <section className="py-100">
      <div className="container">
        <div><motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.5 }}>
          <h2 className="text-2xl text-black mb-[15px] md:mb-[28px] leading-[1.3]">
            Projects
          </h2>
        </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.5 }}>
          <div className="block md:flex bg-black p-6 md:p-10 pt-5 items-center">
            <div className="w-full md:w-4/5">
              <div className="grid grid-cols-1 ">
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
                          borderRadius: "0px", // Rounded corners for select box
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
                          padding: "10px",
                          margin: "0",
                          borderRadius: "0px", // Rounded corners for each option
                          "&:active": {
                            backgroundColor: "black"
                          }
                        }),
                        menu: (provided) => ({
                          ...provided,
                          backgroundColor: "white",
                          borderBottom: "1px solid white",
                          borderRadius: "5px" // Rounded corners for dropdown menu
                        }),
                        menuList: (provided) => ({
                          ...provided,
                          paddingTop: 0,
                          paddingBottom: 0,
                          borderRadius: "5px" // Rounded corners for list container
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
                <div>
                  {/* <div className="relative w-full">

                  <CustomDropdown
                    options={locationOptions}
                    selected={selectedLocation}
                    onChange={setSelectedLocation}
                    setSelectedLocation={setSelectedLocation}
                    setLocationSelected={setLocationSelected}
                    setSelectedLocations={setSelectedLocations}
                    selectedLocations={selectedLocations}
                    placeholder="Location"
                  />

                  </div> */}
                </div>
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



interface CustomDropdownProps {
  options: Option[];
  selected: Option | null;
  onChange: (option: Option) => void;
  placeholder?: string;
  setSelectedLocation: (loc: Option) => void
  setLocationSelected: (loc: string) => void
  setSelectedLocations: Dispatch<SetStateAction<string[]>>
  selectedLocations: string[]
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  onChange,
  setSelectedLocation,
  setLocationSelected,
  setSelectedLocations,
  selectedLocations
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option: Option) => {
    console.log(option)
    onChange(option);
    // setIsOpen(false);
    setSelectedLocation(option);
    setLocationSelected(option.value);
    if (selectedLocations.includes(option.value)) {
      setSelectedLocations((prev) => prev.filter((item) => item !== option.value));
    } else {
      setSelectedLocations((prev) => {
        const updated = [...(prev || []), option.value];
        return [...new Set(updated)];
      });
    }
  };

  const handleRemoveLocation = (option: string) => {
    setIsOpen(!isOpen)
    setSelectedLocations((prev) => prev.filter((item) => item !== option));
    setLocationSelected(option);
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full border-b  mt-1 flex justify-between" ref={dropdownRef}>
      <div onClick={toggleDropdown} className="w-full">
        <div
          className="bg-transparent border-b border-none text-white py-1 px-3 cursor-pointer select-none"

        >
          <div className="flex gap-3">
            {selectedLocations.map((item, index) => (
              <div className="px-1 bg-gray-500 flex gap-1 items-center" key={index}>
                {item}
                <IoIosCloseCircle className="" onClick={() => handleRemoveLocation(item)} />
              </div>
            ))}
          </div>
          {selectedLocations.length == 0 && "Location"}
        </div>
        {isOpen && (
          <div className="absolute z-10 w-full bg-white text-black border  rounded-b-md mt-1">
            {options.map((option, index) => (
              <div key={index} className="flex gap-3 items-center px-3 w-full hover:text-white hover:bg-[#333] hover:cursor-pointer" onClick={() => handleOptionClick(option)}>
                <div className="h-5 w-5 border">{selectedLocations.includes(option.value) && <FaCheck className="text-sm" />}</div>
                <div
                  key={index}
                  className={`px-3 py-2 cursor-pointer ${selectedLocations.includes(option.value)
                      ? ` text-black hover:text-white ${index == options.length - 1 ? "rounded-b-md" : ""}`
                      : ` ${index == options.length - 1 ? "rounded-b-md" : ""}`
                    }`}

                >
                  {option.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {selectedLocations.length > 0 ? <IoIosCloseCircle className="text-lg cursor-pointer" onClick={(() => setSelectedLocations([]))} /> : <FaAngleDown className="text-[28px] pt-2 text-[rgb(204, 204, 204)]" />}
    </div>
  );
};



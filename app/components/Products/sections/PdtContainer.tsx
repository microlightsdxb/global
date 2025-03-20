"use client";
import React, { useState } from "react";
import { Plus, Minus, Check } from "lucide-react";
import { assets } from "@/public/assets/assets";

import Image from "next/image";
interface FrameworkSectionProps {
  title: string;
  options: string[];
}

const ToggleSection: React.FC<FrameworkSectionProps> = ({ title, options }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleSelection = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  return (
    <div className="mb-6">
      {/* Toggle Header */}
      <div
        className="border-b mb-4 pb-3 flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-lg text-black leading-[1.4]">{title}</p>
        {isOpen ? <Minus size={20} /> : <Plus size={20} />}
      </div>

      {/* Toggle Content */}
      <div
        className={`transition-all duration-300 ${
          isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        {options.map((option) => (
          <div
            key={option}
            className="flex justify-between items-center mb-3 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
            onClick={() => toggleSelection(option)}
          >
            <p>{option}</p>
            {selectedOptions.includes(option) && (
              <Check size={20} className="text-font" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const PdtContainer = () => {
  return (
    <section className="">
      <div className="container ">
        <div className="pt-16 pb-150 border-b border-black">
        <h1 className="text-2xl text-black mb-8 md:mb-12 leading-[1.3]">
          Ceiling Recessed
        </h1>
        <div className="flex gap-10">
          <div className="w-1/4">
            <ToggleSection
              title="Type"
              options={["Indoor", "Outdoor", "Industrial"]}
            />
            <ToggleSection
              title="Category"
              options={["Home", "Office", "Commercial"]}
            />
            <ToggleSection
              title="Usage"
              options={["Heavy Duty", "Lightweight", "Medium"]}
            />
          </div>

          <div className="w-3/4   p-4 ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <div className="pdtcontainer min-h-[300px] md:min-h-[385px] xl:min-h-[435px] h-full border relative overflow-hidden cursor-pointer group">
                  <div className="flex h-full">
                    <figure className="relative w-full pt-8 mb-[82px]">
                    <Image
                      className="object-none h-full object-center m-auto"
                      src={assets.appolo}
                      alt="Apollo"
                    />
                    </figure>
                    </div>

                  <div
                    className={`px-10 pb-3 w-full absolute  bottom-0 group-hover:translate-y-[10px] transition-all duration-500 ease-in-out group-hover:bg-black
                 group-hover:text-white  `}
                  >
                    <p className="text-25 text-black  group-hover:text-white transition-500 mt-5 mb-8">
                      Apollo
                    </p>

                    <div
                      className={`text-gray-600  text-sm transition-opacity duration-500 h-0 group-hover:text-white group-hover:h-full opacity-0 group-hover:opacity-100 `}
                    >
                      <div className="flex justify-between ">
                        {" "}
                        <p className="text-red group-hover:text-white">
                          Wattage
                        </p>{" "}
                        <p>10W</p>
                      </div>
                      <div className="flex justify-between ">
                        {" "}
                        <p className=" group-hover:text-white">Lumen</p>{" "}
                        <p>1000lm</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="pdtcontainer min-h-[300px] md:min-h-[385px] xl:min-h-[435px] h-full border relative overflow-hidden cursor-pointer group">
                  <div className="flex h-full">
                    <figure className="relative w-full pt-8 mb-[82px]">
                    <Image
                      className="object-none h-full object-center m-auto"
                      src={assets.eddi}
                      alt="Apollo"
                    />
                  </figure></div>

                  <div
                    className={`px-10 pb-3 w-full absolute  bottom-0 group-hover:translate-y-[10px] transition-all duration-500 ease-in-out group-hover:bg-black
                 group-hover:text-white  `}
                  >
                    <p className="text-25 text-black  group-hover:text-white transition-500 mt-5 mb-8">
                    Eddi® Gimbal
                    </p>

                    <div
                      className={`text-gray-600  text-sm transition-opacity duration-500 h-0 group-hover:text-white group-hover:h-full opacity-0 group-hover:opacity-100 `}
                    >
                      <div className="flex justify-between ">
                        {" "}
                        <p className="text-red group-hover:text-white">
                          Wattage
                        </p>{" "}
                        <p>10W</p>
                      </div>
                      <div className="flex justify-between ">
                        {" "}
                        <p className=" group-hover:text-white">Lumen</p>{" "}
                        <p>1000lm</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="pdtcontainer min-h-[300px] md:min-h-[385px] xl:min-h-[435px] h-full border relative overflow-hidden cursor-pointer group">
                  <div className="flex h-full">
                    <figure className="relative w-full pt-8 mb-[82px]">
                    <Image
                      className="object-none h-full object-center m-auto"
                      src={assets.eddig}
                      alt="Apollo"
                    />
                  </figure>
                      </div>
                  <div
                    className={`px-10 pb-3 w-full absolute  bottom-0 group-hover:translate-y-[10px] transition-all duration-500 ease-in-out group-hover:bg-black
                 group-hover:text-white  `}
                  >
                    <p className="text-25 text-black  group-hover:text-white transition-500 mt-5 mb-8">
                    Eddi® Gimbal Circ
                    </p>

                    <div
                      className={`text-gray-600  text-sm transition-opacity duration-500 h-0 group-hover:text-white group-hover:h-full opacity-0 group-hover:opacity-100 `}
                    >
                      <div className="flex justify-between ">
                        {" "}
                        <p className="text-red group-hover:text-white">
                          Wattage
                        </p>{" "}
                        <p>10W</p>
                      </div>
                      <div className="flex justify-between ">
                        {" "}
                        <p className=" group-hover:text-white">Lumen</p>{" "}
                        <p>1000lm</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="pdtcontainer min-h-[300px] md:min-h-[385px] xl:min-h-[435px] h-full border relative overflow-hidden cursor-pointer group">
                  <div className="flex h-full">
                    <figure className="relative w-full pt-8 mb-[82px]">
                    <Image
                      className="object-none h-full object-center m-auto"
                      src={assets.eddig}
                      alt="Apollo"
                    />
                  </figure>
                      </div>
                  <div
                    className={`px-10 pb-3 w-full absolute  bottom-0 group-hover:translate-y-[10px] transition-all duration-500 ease-in-out group-hover:bg-black
                 group-hover:text-white  `}
                  >
                    <p className="text-25 text-black  group-hover:text-white transition-500 mt-5 mb-8">
                    Eddi® Gimbal Circ
                    </p>

                    <div
                      className={`text-gray-600  text-sm transition-opacity duration-500 h-0 group-hover:text-white group-hover:h-full opacity-0 group-hover:opacity-100 `}
                    >
                      <div className="flex justify-between ">
                        {" "}
                        <p className="text-red group-hover:text-white">
                          Wattage
                        </p>{" "}
                        <p>10W</p>
                      </div>
                      <div className="flex justify-between ">
                        {" "}
                        <p className=" group-hover:text-white">Lumen</p>{" "}
                        <p>1000lm</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          </div>
      </div>
    </section>
  );
};

export default PdtContainer;

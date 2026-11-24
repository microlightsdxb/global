"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Select from "react-select";
import { assets } from "@/public/assets/assets";

interface Option {
  value: string;
  label: string;
}

interface FilterProps {
  industryData: { data: { name: string }[] };
  locationData: { data: { name: string }[] };
  setIndustrySelected: (name: string) => void;
  setLocationSelected: (name: string) => void;
  setSelectedLocations: Dispatch<SetStateAction<string[]>>;
  selectedLocations: string[];
}

const Filter = ({
  industryData,
  setIndustrySelected,
  setLocationSelected,
  selectedLocations,
  setSelectedLocations,
}: FilterProps) => {
  const [selectedIndustry, setSelectedIndustry] = useState<Option | null>(null);
  const industryOptions = [
    { value: "", label: "All projects" },
    ...industryData.data.map(({ name }) => ({ value: name, label: name })),
  ];
  const hasActiveFilters = Boolean(selectedIndustry) || selectedLocations.length > 0;

  const handleIndustryChange = (option: Option | null) => {
    if (!option || option.value === "") {
      setSelectedIndustry(null);
      setIndustrySelected("");
      setSelectedLocations([]);
      setLocationSelected("");
      return;
    }

    setSelectedIndustry(option);
    setIndustrySelected(option?.value || "");
  };

  const handleClear = () => {
    setSelectedIndustry(null);
    setIndustrySelected("");
    setSelectedLocations([]);
    setLocationSelected("");
  };

  return (
    <section className="py-100">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl text-black mb-[15px] md:mb-[28px] leading-[1.3]">
            lighting projects
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Compact mobile filter control */}
          <div className="flex items-center gap-4 bg-black/85 px-4 py-2 text-white md:hidden">
            <div className="min-w-0 flex-1">
              <Select
                options={industryOptions}
                value={selectedIndustry}
                onChange={handleIndustryChange}
                isSearchable
                placeholder="All projects"
                styles={{
                  control: (provided) => ({
                    ...provided,
                    minHeight: 42,
                    backgroundColor: "transparent",
                    border: "none",
                    borderBottom: "1px solid #fff",
                    borderRadius: 0,
                    boxShadow: "none",
                    "&:hover": { borderBottom: "1px solid #fff" },
                  }),
                  valueContainer: (provided) => ({ ...provided, paddingLeft: 0 }),
                  singleValue: (provided) => ({ ...provided, color: "white" }),
                  placeholder: (provided) => ({ ...provided, color: "white" }),
                  input: (provided) => ({ ...provided, color: "white" }),
                  indicatorSeparator: () => ({ display: "none" }),
                  dropdownIndicator: (provided) => ({
                    ...provided,
                    color: "white",
                    paddingRight: 0,
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected
                      ? "black"
                      : state.isFocused
                        ? "#a1a1a1"
                        : "white",
                    color: state.isSelected || state.isFocused ? "white" : "black",
                    padding: "10px",
                  }),
                  menu: (provided) => ({
                    ...provided,
                    zIndex: 30,
                    backgroundColor: "white",
                  }),
                }}
              />
            </div>

          </div>

          {/* Original desktop filter layout */}
          <div className="hidden bg-black/85 p-6 pt-5 text-white md:flex md:items-center md:p-10 md:pt-10">
            <div className="w-full md:w-4/5">
              <div className="grid grid-cols-1">
                <div className="relative w-full">
                  <Select
                    options={industryOptions}
                    value={selectedIndustry}
                    onChange={handleIndustryChange}
                    isSearchable
                    placeholder="Filters"
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        backgroundColor: "transparent",
                        border: "none",
                        borderBottom: "1px solid #fff",
                        color: "white",
                        borderRadius: "0px",
                        boxShadow: "none",
                        "&:hover": { borderBottom: "1px solid #fff" },
                      }),
                      singleValue: (provided) => ({
                        ...provided,
                        color: "white",
                      }),
                      placeholder: (provided) => ({
                        ...provided,
                        color: "white",
                      }),
                      input: (provided) => ({ ...provided, color: "white" }),
                      option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isSelected
                          ? "black"
                          : state.isFocused
                            ? "#333"
                            : "transparent",
                        color:
                          state.isSelected || state.isFocused
                            ? "white"
                            : "black",
                        padding: "10px",
                        margin: "0",
                        borderRadius: "0px",
                        "&:active": { backgroundColor: "black" },
                      }),
                      menu: (provided) => ({
                        ...provided,
                        backgroundColor: "white",
                        borderBottom: "1px solid white",
                        borderRadius: "5px",
                      }),
                      menuList: (provided) => ({
                        ...provided,
                        paddingTop: 0,
                        paddingBottom: 0,
                        borderRadius: "5px",
                      }),
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="ml-auto w-1/5">
              <div className="mt-[35px] flex justify-end transition-all duration-500 ease-in-out 2xl:mt-[30px]">
                <button
                  type="button"
                  onClick={handleClear}
                  className="group flex cursor-pointer items-center gap-5 border-t border-white pt-3 text-sm leading-none text-white"
                >
                  Clear
                  <Image
                    src={assets.iconback}
                    alt=""
                    aria-hidden="true"
                    className="text-[22px] text-[#7D7D7D] transition-transform duration-500 group-hover:scale-125"
                  />
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

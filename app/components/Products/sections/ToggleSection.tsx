"use client"

import { Plus, Minus, Check } from "lucide-react";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface FrameworkSectionProps {
    setTypeSelected: (type: string) => void;
    setCategorySelected: (category: string) => void;
}

  interface Type {
    data:{
      type: string;
      _id: string;
      category: {
        name: string;
        _id: string;
      }[];
    }[]

  }

export const ToggleSection: React.FC<FrameworkSectionProps> = ({setTypeSelected, setCategorySelected}) => {

  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())
  const { data }: { data: Type } = useSWR(`/api/admin/product/type`, fetcher)
  

  useEffect(() => {
    if (data?.data) {
      console.log(data?.data)
    }
  }, [data])


    const [isTypeOpen, setIsTypeOpen] = useState(true);
    const [isCategoryOpen, setIsCategoryOpen] = useState(true);
    const [selectedType, setSelectedType] = useState<number>(0);
    const [selectedCategory, setSelectedCategory] = useState<number>(0);
    const categories = data?.data[selectedType].category

  
    const toggleTypeSelection = (index: number,type: string) => {
      setTypeSelected(type)
      setSelectedType(index)
      setSelectedCategory(0)
      setCategorySelected(data?.data[index].category[0].name)
    };

    const toggleCategorySelection = (index: number,category: string) => {
      setCategorySelected(category)
      setSelectedCategory(index)
    };

    useEffect(() => {
      setTypeSelected(data?.data[0].type)
      setCategorySelected(data?.data[0].category[0].name)
    }, [data])
  
    return (
      <div>
      <div className="mb-6">
        {/* Toggle Header */}
        <div
          className="border-b mb-4 pb-3 flex justify-between items-center cursor-pointer"
          onClick={() => setIsTypeOpen(!isTypeOpen)}
        >
          <p className="text-lg text-black leading-[1.4]">Type</p>
          {isTypeOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
  
        {/* Toggle Content */}
        <div
          className={`transition-all duration-300 ${
            isTypeOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          {data?.data?.map((type,index) => (
            <div
              key={type._id}
              className="flex justify-between items-center mb-3 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
              onClick={() => toggleTypeSelection(index,type.type)}
            >
              <p>{type.type}</p>
              {selectedType === index && (
                <Check size={20} className="text-font" />
              )}
            </div>
          ))}
        </div>
      </div>


      <div className="mb-6">
        {/* Toggle Header */}
        <div
          className="border-b mb-4 pb-3 flex justify-between items-center cursor-pointer"
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
        >
          <p className="text-lg text-black leading-[1.4]">Category</p>
          {isCategoryOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
  
        {/* Toggle Content */}
        <div
          className={`transition-all duration-300 ${
            isCategoryOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          {categories?.map((category,index) => (
            <div
              key={category._id}
              className="flex justify-between items-center mb-3 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
              onClick={() => toggleCategorySelection(index,category.name)}
            >
              <p>{category.name}</p>
              {selectedCategory === index && (
                <Check size={20} className="text-font" />
              )}
            </div>
          ))}
        </div>
      </div>

      </div>
    );
  };
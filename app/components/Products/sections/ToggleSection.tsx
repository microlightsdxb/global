"use client"
import {motion} from "framer-motion";
import { moveUp, staggerContainer } from "../../scrollanims";
import { useStore } from "@/app/store/productType";
import { Plus, Minus, Check } from "lucide-react";
import { useEffect, useState } from "react";

interface FrameworkSectionProps {
  typeSelected: string;
  setTypeSelected: (type: string) => void;
  setCategorySelected: (category: string) => void;
  type: string;
  categorySelected: string;
  categories: Type;
}

interface Type {
  data: {
    type: string;
    _id: string;
    category: {
      name: string;
      _id: string;
    }[];
  }[]

}

export const ToggleSection: React.FC<FrameworkSectionProps> = ({ typeSelected, setTypeSelected, setCategorySelected, type, categorySelected,categories }) => {

  const [isTypeOpen, setIsTypeOpen] = useState(true);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [selectedType, setSelectedType] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const categoriesArray = categories?.data[selectedType]?.category
  const setType = useStore((state) => state.setType)


  const toggleTypeSelection = (index: number, typeInSelection: string) => {
    setTypeSelected(typeInSelection)
    setType(typeInSelection)
    setSelectedType(index)
    // setSelectedCategory(0)
    // setCategorySelected(data?.data[index].category[0].name)
  };

  const toggleCategorySelection = (index: number, category: string) => {
    setCategorySelected(category)
    // setSelectedCategory(index)
  };

  useEffect(() => {
    setTypeSelected(categories?.data[0]?.type)
    // setCategorySelected(data?.data[0].category[0].name)
  }, [categories])


  useEffect(() => {

    setSelectedType(categories?.data.findIndex((item) => item.type === type) || 0)
    // setSelectedCategory(0)
    setCategorySelected("")
  }, [type])


  return (
    <div>
      <div className="mb-1 md:mb-6">
        {/* Toggle Header */}
        <div className="border-b mb-2 md:mb-4 md:pb-3  flex justify-between items-center cursor-pointer" onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
          <p className="text-[16px] lg:text-lg text-black leading-[1.4]">Category</p>
          {isCategoryOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>

        {/* Toggle Content */}
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className={`transition-all duration-300 ${isCategoryOpen ? "  opacity-100" : "max-h-0 opacity-0 overflow-hidden" }`}>
          {categoriesArray?.map((category, index) => (
            <motion.div variants={moveUp}
              key={category._id}
              className="flex justify-between items-center xl:mb-3 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
              onClick={() => {toggleCategorySelection(index, category.name);setSelectedCategory(index)}}
            >
              <span>{category.name}</span>
              {selectedCategory === index && categorySelected !="" && (
                <Check size={20} className="text-font" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="mb-4 md:mb-6">
        {/* Toggle Header */}
        <div className="border-b mb-2 md:mb-4 md:pb-3 flex justify-between items-center cursor-pointer" onClick={() => setIsTypeOpen(!isTypeOpen)}>
          <p className="text-[16px] lg:text-lg text-black leading-[1.4]">Type</p>
          {isTypeOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
        {/* Toggle Content */}
        <motion.div variants={staggerContainer} initial="hidden" animate="show" viewport={{once:true, amount:0.2}} className={`transition-all duration-300 ${isTypeOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden" }`} >
          {categories?.data?.map((type, index) => (
            <motion.div variants={moveUp} key={type._id} className="flex justify-between items-center xl:mb-3 cursor-pointer hover:bg-gray-100 p-2 rounded-md" onClick={() => toggleTypeSelection(index, type.type)} >
              <span>{type.type}</span>
              {typeSelected === type.type && (
                <Check size={20} className="text-font" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
      
    </div>
  );
};
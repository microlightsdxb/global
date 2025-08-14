"use client";
import {motion} from "framer-motion";
import { moveUp, staggerContainer } from "../../scrollanims";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ToggleSection } from "./ToggleSection";
import useSWR from "swr";
import Link from "next/link";
import { useStore } from "@/app/store/productType";

interface Product {
  data: {
    name: string;
    slug: string;
    thumbnail: string;
    wattage: string;
    lumen: string;
    _id: string;
    type: string;
    category: string;
    altTag: string;
  }[]
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


const PdtContainer = () => {

  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())
  const { data }: { data: Product } = useSWR(`/api/admin/product`, fetcher)
  const { data:categories }: { data: Type } = useSWR(`/api/admin/product/type`, fetcher)
  const [products, setProducts] = useState<{ name: string, slug: string, thumbnail: string, wattage: string, lumen: string, _id: string, altTag: string }[]>([])
  const [typeSelected, setTypeSelected] = useState<string>("")
  const [categorySelected, setCategorySelected] = useState<string>("")
  const type = useStore((state) => state.type);

  useEffect(() => {
    if (data?.data) {
      if(categorySelected == ""){
        if(!categories){
          return
        }
        setProducts(categories?.data
          .find(item => item.type === typeSelected)
          ?.category.flatMap((category: { name: string }) =>
            data?.data.filter(
              (product: { type: string; category: string }) =>
                product.type === typeSelected && product.category === category.name
            )
          ) || [])
      }else{
        setProducts(data?.data.filter((product: { type: string, category: string, altTag: string }) => product.type === typeSelected && product.category === categorySelected))
      }
    }
  }, [data, typeSelected, categorySelected, categories])

  useEffect(() => {
    if (type == "") {
      setTypeSelected(data?.data[0].type)
    } else {
      setTypeSelected(type)
    }
  }, [data, type])


  return (
    <section className="">
      <div className="container ">
        <div className="pt-16 pb-150 border-b border-black">
          <h1 className="text-2xl text-black mb-8 md:mb-12 leading-[1.3]">
            {categorySelected == "" ? typeSelected : categorySelected}
          </h1>
          <div className="md:flex gap-5 xl:gap-10">
            <div className="md:w-1/4">
              <ToggleSection type={type} typeSelected={typeSelected} setTypeSelected={setTypeSelected} setCategorySelected={setCategorySelected} categorySelected={categorySelected} categories={categories}/>
            </div>

            <div className="md:w-3/4   p-4 ">
              <motion.div variants={staggerContainer} initial="hidden" animate="show" viewport={{once:true, amount:0.2}} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products?.map((product, index) => (
                  <motion.div variants={moveUp} key={index}>
                    <Link href={`/product-details/${product.slug}`} >
                      <div className="pdtcontainer min-h-[300px] md:min-h-[300px] xl:min-h-[435px] h-full border relative overflow-hidden cursor-pointer group">
                        <div className="flex h-full">
                          <figure className="relative w-full pt-8 mb-[82px]">
                            <Image
                              className="object-contain h-full object-center m-auto" src={product?.thumbnail} alt={'image'} width={180} height={180} />
                          </figure>
                        </div>

                        <div
                          className={`px-10 pb-3 w-full absolute  bottom-0 group-hover:translate-y-[10px] transition-all duration-500 ease-in-out group-hover:bg-[#7D7D7D] group-hover:text-white`} >
                          <p className="text-25 text-black  group-hover:text-white transition-500 mt-5 mb-8">
                            {product?.name.includes("W/m") ? product?.name.split(" ").filter((item) => item !== "W/m").join(" ").toUpperCase() + " W/m" : product?.name.split(" ").join(" ").toUpperCase()}
                          </p>

                          <div className={`text-gray-600  text-sm transition-opacity duration-500 h-0 group-hover:text-white group-hover:h-full opacity-0 group-hover:opacity-100 `} >
                            <div className="flex justify-between ">
                              {" "}
                              <p className="text-red group-hover:text-white">
                                Wattage
                              </p>{" "}
                              <p>{product?.wattage}</p>
                            </div>
                            <div className="flex justify-between ">
                              {" "}
                              <p className=" group-hover:text-white">Lumen</p>{" "}
                              <p>{product?.lumen}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default PdtContainer;



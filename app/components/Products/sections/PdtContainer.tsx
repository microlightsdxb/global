"use client";
import React, { useEffect, useState } from "react";


import Image from "next/image";
import { ToggleSection } from "./ToggleSection";
import useSWR from "swr";
import Link from "next/link";

interface Product {
  data:{
    name: string;
    thumbnail: string;
    wattage: string;
    lumen: string;
    _id: string;
    type: string;
    category: string;
  }[]
}


const PdtContainer = () => {

  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())
  const { data }: { data: Product } = useSWR(`/api/admin/product`, fetcher)
  const [products, setProducts] = useState<{ name: string, thumbnail: string, wattage: string, lumen: string, _id: string }[]>([])
  const [typeSelected, setTypeSelected] = useState<string>("")
  const [categorySelected, setCategorySelected] = useState<string>("")

  useEffect(() => {
    if (data?.data) {
      console.log(data?.data)
      setProducts(data?.data.filter((product: {type: string, category: string}) => product.type === typeSelected && product.category === categorySelected))
    }
  }, [data,typeSelected,categorySelected])


  return (
    <section className="">
      <div className="container ">
        <div className="pt-16 pb-150 border-b border-black">
          <h1 className="text-2xl text-black mb-8 md:mb-12 leading-[1.3]">
            {categorySelected}
          </h1>
          <div className="flex gap-10">
            <div className="w-1/4">
              <ToggleSection setTypeSelected={setTypeSelected} setCategorySelected={setCategorySelected}/>
              {/* <ToggleSection
                title="Category"
                options={["Home", "Office", "Commercial"]}
              /> */}
              {/* <ToggleSection
              title="Usage"
              options={["Heavy Duty", "Lightweight", "Medium"]}
            /> */}
            </div>

            <div className="w-3/4   p-4 ">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products?.map((product,index) => (
                  <Link href={`/product-details/${product._id}`} key={index}>
                    <div className="pdtcontainer min-h-[300px] md:min-h-[385px] xl:min-h-[435px] h-full border relative overflow-hidden cursor-pointer group">
                      <div className="flex h-full">
                        <figure className="relative w-full pt-8 mb-[82px]">
                          <Image
                            className="object-none h-full object-center m-auto"
                            src={product?.thumbnail}
                            alt="Apollo"
                            width={180}
                            height={180}
                          />
                        </figure>
                      </div>

                      <div
                        className={`px-10 pb-3 w-full absolute  bottom-0 group-hover:translate-y-[10px] transition-all duration-500 ease-in-out group-hover:bg-black
                 group-hover:text-white  `}
                      >
                        <p className="text-25 text-black  group-hover:text-white transition-500 mt-5 mb-8">
                          {product?.name}
                        </p>

                        <div
                          className={`text-gray-600  text-sm transition-opacity duration-500 h-0 group-hover:text-white group-hover:h-full opacity-0 group-hover:opacity-100 `}
                        >
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
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default PdtContainer;



"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";


interface FrameworkSectionProps {
  categories: {
    data:{
      name:string,
      id:number
    }[]
  };
  data:{   
    data:{
    image:string,
    category:string,
    _id:string,
    title:string,
    createdAt:string
  }[];
  }
}

const Bloglist: React.FC<FrameworkSectionProps> = ({ data, categories }) => {
  const [activeTab, setActiveTab] = useState("View All");

  useEffect(()=>{
    console.log(data?.data,categories?.data)
  },[data,categories])

  const filteredData =
    activeTab === "View All"
      ? data?.data
      : data?.data?.filter((member) => member.category === activeTab) || [];

    useEffect(()=>{
      console.log(filteredData)
    },[filteredData])

  return (
    <>
      <section className="pt-20 pbc-120">
        <div className="container">
          <div className="flex flex-wrap gap-3 md:gap-6 lg:gap-10 border-b">
          <div
            className={`p-2 cursor-pointer relative top-[2px] text-black border-b-3 border-[transparent] transition-all duration-500 hover:border-b-3 hover:border-black ${
              activeTab === "View All" ? "border-black" : ""
            }`}
            onClick={() => setActiveTab("View All")}
          >
            <p  >View All</p>
          </div>
        {categories?.data?.map((category:{name:string}) => (
          <div
            key={category.name}
            className={`p-2 cursor-pointer relative top-[2px] text-black border-b-3 border-[transparent] transition-all duration-500 hover:border-b-3 hover:border-black ${
              activeTab === category.name ? "border-black" : ""
            }`}
            onClick={() => setActiveTab(category.name)}
          >
            <p  >{category.name}</p>
          </div>
        ))}
      </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 team-grid gap-x-5 lg:gap-x-10">
            {filteredData?.map((member, index:number) => (
              <Link key={index} href={`/blog-details/${member._id}`} className="teammem mt-10 lg:mt-20 xl:mt-20">
                <div className="evecont">
                  <Image
                    src={member.image}
                    alt={member.category}
                    width={300}
                    height={300}
                    className="w-full h-auto  "
                  />
                </div>
                <div className="flex justify-between items-center pmargin0 py-5">
                  <p className="text-[15px]">{member.category}</p>
                  <p className="text-[15px]">{moment(member.createdAt).format('ll')}</p>
                </div>
                <div className="pb-5 md:pb-8 lg:pb-[48px] border-b">
                  <p className="text-lg text-black leading-[1.4]">
                    {member.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <div className="container">
        <div className="border-b border-black"></div>
      </div>
    </>
  );
};

export default Bloglist;

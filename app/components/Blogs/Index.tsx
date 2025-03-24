"use client"

import React, { useEffect } from "react";
import Banner from "./sections/Banner";
import Bloglist from "./sections/Bloglist";
import useSWR from "swr";

const Index = () => {
  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())
  const { data:blogData } = useSWR(`/api/admin/blog`, fetcher)
  const { data:categoryData } = useSWR(`/api/admin/category`, fetcher)

  useEffect(()=>{
    console.log(blogData?.data,categoryData?.data)
  },[blogData,categoryData])

  return (
    <>
      <div className="headerpadding"> </div>

      <Banner />
      <Bloglist data={blogData} categories={categoryData} />
    </>
  );
};

export default Index;

"use client"

import React, { useEffect, useState } from "react";
import Banner from "./sections/Banner";
import Blogdetails from "./sections/Blogdetails";
import useSWR from "swr";
import {useParams} from "next/navigation";

const Index = () => {

  const {slug} = useParams()

  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())
  const { data } = useSWR(`/api/admin/blog?slug=${slug}`, fetcher)
  const {data: recentBlogs} = useSWR(`/api/admin/blog`, fetcher)
  const [recentBlogData, setRecentBlogData] = useState([])

  useEffect(()=>{
    setRecentBlogData(recentBlogs?.data.sort((a:{createdAt:number}, b:{createdAt:number}) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0,3))
  },[recentBlogs])
  
  return (
    <>
      <div className="headerpadding"> </div>
      <Banner data={data}/>
      <Blogdetails  data={data} recentBlogData={recentBlogData}/>
    </>
  );
};

export default Index;

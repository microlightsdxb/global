"use client"

import React, { useEffect } from "react";
import Address from "./sections/Address";
import Banner from "./sections/Banner";
import {banner} from "./data/dataBox"
import ContactForm from "./sections/ContactForm";
import useSWR from "swr";
const Index = () => {
  
  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())
  const { data } = useSWR(`/api/admin/contact`, fetcher)

  useEffect(()=>{
    console.log(data?.data)
  },[data])

  return (
    <>
      <div className="headerpadding"> </div>
      <Banner data={banner.data} />
      <Address data={data}/>
      <ContactForm />
    </>
  );
};

export default Index;

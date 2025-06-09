"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import parse from "html-react-parser";


interface AddressProps {
  data: {
    region: string,
    area: {
      _id: string,
      name: string,
      type: string,
      address: string,
      telephone: string,
      mobile: string,
      email: string,
      mapIframe: string
    }[]
  }[]
}

const Address = ({ data }: { data: AddressProps }) => {

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    console.log(activeTab)
  }, [activeTab])

  return (
    <section className="pt-10 md:pt-20 lg:pt-30 pb-100 ">
      <div className="container">
        <div className="pb-5 md:pb-6 lg:pb-[58px]  ">
          <motion.h2
            className="text-xl text-black  leading-[1.3] max-w-[26ch]"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            Do You Have a Project in Mind? Get In Touch!
          </motion.h2>
        </div>
        <div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex gap-3 md:gap-10 border-b mb-4 md:mb-30 lg:mb-[60px]">
              {data?.data?.map((tab: { region: string }, index: number) => (
                <div
                  key={index}
                  className={`p-[10px] pl-0 pb-[20px] cursor-pointer relative top-[2px] text-black ${activeTab === index ? "border-b-3 border-black" : ""
                    }`}
                  onClick={() => setActiveTab(index)}
                >
                  <p>{tab.region}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px]">
              {data?.data[activeTab]?.area.map((location: { _id: string, name: string, type: string, address: string, telephone: string, mobile: string, email: string, mapIframe: string }) => (
                <div key={location._id}>
                  <div className="mb-5">
                    <p className="text-25 font-[600] leading-[1.2] text-black">
                      {location.name}
                    </p>
                    <p className="font-[600] leading-[1.2]">{location.type}</p>
                    <p className="font-[300]">{location.address}</p>
                  </div>
                  <div className="flex flex-col gap-0 lg:flex-row lg:gap-3 pmargin0 mb-2 md:mb-3">
                    {location.telephone && <p className="font-[600] text-black">Tel: {location.telephone}</p>}
                    {location.mobile && <p className="font-[600] text-black">Mob: {location.mobile}</p>}
                  </div>
                  {location.email && <p className="font-[600] text-black">Email: {location.email}</p>}
                  <div className="mt-5" style={{ filter: "grayscale(100%)" }}>
                    {/* <Image src={location.map} alt="Map" /> */}
                    {parse(location.mapIframe || "")}

                  </div>
                </div>
              ))}
            </div>
          </motion.div>


        </div>
      </div>
    </section>
  );
};

export default Address;

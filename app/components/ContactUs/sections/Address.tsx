"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { moveUp } from "../../scrollanims";
// import parse from "html-react-parser";
import ContactForm from "../sections/ContactForm";

interface AddressProps {
  data: {
    region: string;
    area: {
      _id: string;
      name: string;
      type: string;
      address: string;
      telephone: string;
      mobile: string;
      email: string;
      mapIframe: string;
    }[];
  }[];
}

const Address = ({ data }: { data: AddressProps }) => {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    console.log(activeTab);
  }, [activeTab]);

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
            className="flex xl:flex-row flex-col w-full gap-10 2xl:gap-15"
          >
            <div className="flex flex-col">
              <div className="flex border-b mb-7 md:mb-6 lg:mb-12 gap-10">
                {data?.data?.map((tab: { region: string }, index: number) => (
                  <div
                    key={index}
                    className={`p-[10px] pl-0 pb-2 md:pb-[20px] cursor-pointer relative top-[2px] text-black ${
                      activeTab === index ? "border-b-3 border-black" : ""
                    }`}
                    onClick={() => setActiveTab(index)}
                  >
                    <p>{tab.region}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 3xl:gap-[80px] items-stretch">
                {data?.data[activeTab]?.area.map(
                  (location: {
                    _id: string;
                    name: string;
                    type: string;
                    address: string;
                    telephone: string;
                    mobile: string;
                    email: string;
                    mapIframe: string;
                  }) => (
                    <motion.div
                      variants={moveUp}
                      key={location._id}
                      className="h-full flex flex-col 2xl:min-w-[391px]"
                    >
                      {/* Address — grows to fill */}
                      <div className="mb-5">
                        <p className="text-25 font-[600] leading-[1.2] text-black">
                          {location.name}
                        </p>
                        <p className="font-[600] leading-[1.2]">
                          {location.type}
                        </p>
                        <p className="font-[300]">{location.address}</p>
                      </div>

                      {/* Contact — pushed to bottom of info area */}
                      <div className="mt-auto">
                        <div className="flex flex-col 2xl:flex-row gap-2 pmargin0 mb-2 md:mb-3">
                          {location.telephone && (
                            <p className="font-[600] text-black -tracking-[0.01em] text-sm">
                              Tel: {location.telephone}
                            </p>
                          )}
                          {location.mobile && (
                            <p className="font-[600] text-black -tracking-[0.01em] text-sm">
                              Mob: {location.mobile}
                            </p>
                          )}
                        </div>
                        {location.email && (
                          <p className="font-[600] text-black -tracking-[0.01em] text-sm">
                            Email: {location.email}
                          </p>
                        )}
                      </div>

                      {/* Map always at very bottom */}
                      <div
                        className="mt-5"
                        style={{ filter: "grayscale(100%)" }}
                      >
                        <iframe
                          src={location.mapIframe || ""}
                          className="w-full h-[224px]"
                          style={{ border: "0" }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>
                    </motion.div>
                  ),
                )}
              </div>
            </div>
            <div className="w-full xl:max-w-[598px]">
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Address;

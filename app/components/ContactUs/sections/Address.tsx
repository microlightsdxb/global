"use client";
import { assets } from "@/public/assets/assets";
import React, { useState } from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";


const tabs = [
  { id: "tb-1", label: "UAE" },
  { id: "tb-2", label: "Saudi Arabia" },
];

type LocationType = {
  id: number;
  city: string;
  type: string;
  address: string;
  tel: string;
  mob: string;
  email: string;
  map: string | StaticImport;
};

const locations: { [key: string]: LocationType[] } = {
  "tb-1": [
    {
      id:1,
      city: "Dubai",
      type: "Headquarters",
      address:
        "P.O. Box 23994, Al Kuthban Building, 1st Floor, Offices 106 & 107, Sheikh Zayed Road, Dubai, UAE",
      tel: "+971 056 1713002",
      mob: "+971 4 328 5488",
      email: "info@microlightsgroup.ae",
      map: assets.mapuae, // Replace with actual image path
    },
    {
      id:2,
      city: "Dubai",
      type: "Headquarters",
      address:
        "P.O. Box 23994, Al Kuthban Building, 1st Floor, Offices 106 & 107, Sheikh Zayed Road, Dubai, UAE",
      tel: "+971 056 1713002",
      mob: "+971 4 328 5488",
      email: "info@microlightsgroup.ae",
      map: assets.mapuae, // Replace with actual image path
    },
  ],
  "tb-2": [
    {
      id:1,
      city: "Riyadh",
      type: "Branch Office",
      address:
        "P.O. Box 12345, Business Tower, Office 202, King Fahd Road, Riyadh, Saudi Arabia",
      tel: "+966 056 1713002",
      mob: "+966 4 328 5488",
      email: "info@microlightsgroup.sa",
      map: assets.mapuae, // Replace with actual image path
    },
    {
      id:2,
      city: "Riyadh",
      type: "Branch Office",
      address:
        "P.O. Box 12345, Business Tower, Office 202, King Fahd Road, Riyadh, Saudi Arabia",
      tel: "+966 056 1713002",
      mob: "+966 4 328 5488",
      email: "info@microlightsgroup.sa",
      map: assets.mapuae, // Replace with actual image path
    },
  ],
};

const Address = () => {

  const [activeTab, setActiveTab] = useState("tb-1");
  return (
    <section className="pt-10 md:pt-20 lg:pt-30 pb-100 ">
      <div className="container">
        <div className="pb-5 md:pb-6 lg:pb-[58px]  ">
          <h2 className="text-xl text-black  leading-[1.3] max-w-[26ch]">
            Do You Have a Project in Mind? Get In Touch!
          </h2>
        </div>
        <div>
      {/* Tabs */}
      <div className="flex gap-3 md:gap-10 border-b mb-4 md:mb-30 lg:mb-[60px]">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`p-2 cursor-pointer relative top-[2px] text-black ${
              activeTab === tab.id ? "border-b-3 border-black" : ""
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <p>{tab.label}</p>
          </div>
        ))}
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px]">
        {locations[activeTab].map((location) => (
          <div key={location.id}>
            <div className="mb-5">
              <p className="text-25 font-[600] leading-[1.2] text-black">
                {location.city}
              </p>
              <p className="font-[600] leading-[1.2]">{location.type}</p>
              <p className="font-[300]">{location.address}</p>
            </div>
            <div className="flex flex-col gap-0 lg:flex-row lg:gap-3 pmargin0 mb-2 md:mb-3">
              <p className="font-[600] text-black">Tel: {location.tel}</p>
              <p className="font-[600] text-black">Mob: {location.mob}</p>
            </div>
            <p className="font-[600] text-black">Email: {location.email}</p>
            <div className="mt-5">
              <Image src={location.map} alt="Map" />
            </div>
          </div>
        ))}
          </div>


    </div>
      </div>
    </section>
  );
};

export default Address;

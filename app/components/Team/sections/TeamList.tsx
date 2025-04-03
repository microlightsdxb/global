"use client";
import React from "react";
import Image from "next/image";



interface FrameworkItem {
  data:{
    name: string;
    designation: string;
    image: string;
  }[]
}

interface FrameworkSectionProps {
  data: FrameworkItem;
}
const TeamList: React.FC<FrameworkSectionProps> = ({
  data

}) => {
  return (
    <>
    <section className="ptc-130 pb-10  ">
      <div className="container">
        <h2 className="text-xl leading-[1.3] mb-4 md:mb-15"> Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 team-grid ">
      {data?.data?.map((member, index) => (
        <div
          key={index}
          className="teammem border-b pb-7 hover:border-[#000] hover:border-b-2 transition-all duration-500 mb-10 md:mb-15 lg:mb-20"
        >
          <div className="teamover">
          <Image
            src={member.image}
            alt={member.name}
            width={300}
            height={300}
            className="w-full h-auto "
            />
          </div>
          <p className="text-lg text-black leading-[1.4] mt-5 md:mt-10 mb-2">
            {member.name}
          </p>
          <p>{member.designation}</p>
        </div>
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

export default TeamList;

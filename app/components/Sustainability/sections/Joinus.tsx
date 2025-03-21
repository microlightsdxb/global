"use client";
import { assets } from "@/public/assets/assets";
import React from "react";

const Joinus = () => {
  return (
    <>
     <section className="py-100  ">
      <div className="container">
        <div  className="py-90 px-8 md:px-10 lg:px-25 bgst" style={{background: `url(${assets.fbanner.src})` }} >
          <h2 className="text-xl text-white leading-[1.3] mb-4 md:mb-5">
          Join Us on Our Sustainable Journey
          </h2>
          <div className="text-white font-[300]">
            <p>At Microlights Group, we believe that sustainable practices and innovative lighting solutions go hand in hand. By choosing Microlights, you are partnering with a company that prioritizes the well-being of our planet without compromising on quality or performance. Together, we can create brighter, more sustainable spaces for today and tomorrow.</p>

<p>For more information about our sustainability initiatives or to discuss how Microlights can support your next project with eco-friendly lighting solutions, please contact us.</p>
          </div>
        </div>
      </div>
      </section>
      <div className="container">
      <div className="border-b border-[#000000]"></div></div>
    </>
  );
};

export default Joinus;

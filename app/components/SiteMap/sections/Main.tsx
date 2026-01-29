"use client"; 
import React from "react";  
import Link from "next/link";

 
import { useStore } from "@/app/store/productType";

const Main = () => {
    const setType = useStore((state)=>state.setType)
  return (
    <section className=" bg-[#f9f9f9] relative ">
      <div className="container ">
        
        <div className="  px-6 py-12">
    
    <div className="mb-5 lg:mb-10   ">
      <h1 className="text-xl text-black    leading-[1.3]">Sitemap</h1> 
    </div>

     
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pl-2">

     
      <div> 
        <ul className="space-y-2 disklist">
          <li><Link href="/" className="hover:text-black">Home</Link></li>
          <li><Link href="" className="hover:text-black">About</Link></li> 
          <ul className="circlelist">
          <li><Link href="/about-us" className="hover:text-black">About Us</Link></li>
          <li><Link href="/our-team" className="hover:text-black">Our Team</Link></li>
          </ul>
          <li><Link href="" className="hover:text-black">Products</Link></li> 
          <ul className="circlelist">
          <li onClick={()=>{setType("Indoor")}}><Link href="/lighting-products" className="hover:text-black">Indoor Lighting</Link></li>
          <li onClick={()=>{setType("Outdoor")}}><Link href="/lighting-products" className="hover:text-black">Outdoor Lighting</Link></li>
          <li onClick={()=>{setType("Industrial")}}><Link href="/lighting-products" className="hover:text-black">Industrial Lighting</Link></li>
          </ul>
            <li><Link href="" className="hover:text-black">Services</Link></li> 
          <ul className="circlelist">
          <li><Link href="/services/lighting-design" className="hover:text-black">Lighting Design</Link></li>
          <li><Link href="/services/project-management" className="hover:text-black">Project Management</Link></li> 
          </ul>
          <li><Link href="/projects" className="hover:text-black">Projects</Link></li> 
          <li><Link href="/sustainability" className="hover:text-black">Sustainability</Link></li> 
          <li><Link href="/blog" className="hover:text-black">Blog</Link></li> 
          <li><Link href="/contact-us" className="hover:text-black">Contact</Link></li> 
          <li><Link href="/privacy-policy" className="hover:text-black">Privacy Policy</Link></li> 
          <li><Link href="/terms-and-conditions" className="hover:text-black">Terms and Conditions</Link></li> 

        </ul>
      </div>
 

    </div>

    
  </div>

      </div>
    </section>
  );
};

export default Main;

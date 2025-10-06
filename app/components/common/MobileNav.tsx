"use client";

import React, { useState, useRef ,useEffect} from "react";
import { menuItems } from "./menuItems";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { gsap } from "gsap";

import { useStore } from "@/app/store/productType";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import Link from "next/link"; 

const MobileNav = () => {
  const setType = useStore((state)=>state.setType)
  const setScrollToSection = useStore((state)=>state.setScrollToSection)
   const [services, setServices] = useState<{name:string,slug:string}[]>([]); 
  
    useEffect(()=>{
      const fetchServices = async() =>{
        try {
          const response = await fetch(`/api/admin/service`)
          const data = await response.json()
          setServices(data.data)
        } catch (error) {
          console.log(error)
        }
      }
      fetchServices()
    },[])
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false); // State for menu visibility
  const pathRef = useRef(null);
  const actualPath =
    "456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 489.292,457.678 277.331,245.004 489.292,32.337 ";

  const handleClose = () => {
    const finalPath =
      "50,150 440,150 440,190 50,190 50,300 440,300 440,340 50,340";
    if (pathRef.current) {
      gsap.to(pathRef.current, {
        attr: { points: finalPath },
        duration: 0.5, // Adjust duration for smooth animation
        onComplete: () => {
          setTimeout(() => setMenuOpen(false)); // Shorter delay for better UX
        },
      });
    }
  };

  const handleMenuOpen = () => {
    if (pathRef.current) {
      gsap.to(pathRef.current, {
        attr: { points: actualPath },
        duration: 0.8,
      });
    }
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="w-full bg-white text-white tanspheader py-4 absolute top-[-1px] z-10 lg:hidden shadow-xs">
        <div className="container flex items-center justify-between">
          <div className="logo-sec">
          <Link href="/" onClick={()=>{setScrollToSection('')}}> <Image
              src="/assets/img/logo.svg"
              alt=""
              className="h-[45px] w-auto"
              width={100}
              height={250}
            />
          </Link>
          </div>
          <div className="w-[30px] h-[30px]">
          <div
            className="cursor-pointer bg-white rounded-full top-5 absolute"
            onClick={handleMenuOpen}
          >
            <svg
              fill="#000000"
              height="30px"
              width="30px"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 490 490"
            >
              <polygon
                points="50,150 440,150 440,190 50,190 
                     50,300 440,300 440,340 50,340"
              />
            </svg>
          </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)} // Clicking outside closes menu
        ></div>
      )}

      {/* Sliding Menu */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[300px] bg-white shadow-2xl transform transition-transform duration-500 
          ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="min-h-full px-6 pt-[30px] pb-[40px] flex flex-col relative">
          {/* Close Button */}
          <button
            className="absolute top-8 right-4 text-[25px] text-primary font-600"
            onClick={handleClose}
          >
            <svg
              fill="#000000"
              height="30px"
              width="30px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 490 490"
              xmlSpace="preserve"
            >
              <polygon
                points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 
                                    489.292,457.678 277.331,245.004 489.292,32.337 "
                ref={pathRef}
              />
            </svg>
          </button>

          {/* Logo */}
          <div className="text-left mb-[50px]">
            <Link href="/">
              <Image
                src="/assets/img/logo.svg"
                alt="Crest Logo"
                width={80}
                height={50}
                className="h-[50px] w-auto"
              />
            </Link>
          </div>

          {/* <svg fill="#000000" height="800px" width="800px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490 490">
                        <polygon points="50,150 440,150 440,190 50,190 
                     50,300 440,300 440,340 50,340" />
                    </svg> */}

          {/* Navigation Items */}
          <ul className="flex flex-col gap-4">
            {menuItems.map((item, index) =>
              item.children ? (
                <li key={index}>
                  <div
                    className="pb-2 flex justify-between items-center cursor-pointer"
                    onClick={() =>
                      setActiveDropdown(activeDropdown === index ? null : index)
                    }
                  >
                    <span className="font-semibold">{item.title}</span>
                    <ChevronDown
                      className={`transition-transform duration-300 ${
                        activeDropdown === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {/* Dropdown */}
                 

                     {activeDropdown === index && item.title == "Services" && services.map((service: {name:string,slug:string}, subIndex) => (
                                  <div key={subIndex}>
                                  <Link href={`/services/${service.slug}`} onClick={()=>setMenuOpen(false)}>
                                      <div className="hover:bg-black/5 pl-3 pr-[80px] py-2 rounded-[8px] transition-transform duration-300 hover:scale-105 flex justify-between items-center">
                                        <p className="m-0 p-0 text-[16px]">
                                          {service.name}
                                        </p>
                                      </div>
                                    </Link>
                                  </div>  
                                  ))}
                                  {activeDropdown === index && item.title !== "Services" && item.children?.length ? (
                                      <div   className="py-1">
                                      {item.children.map((item, subIndex) => (
                                        <Link href={item.url} key={subIndex} onClick={() => {
                                          setType(item.title.split(" ")[0]);
                                          setMenuOpen(false);
                                          if (item.title === "Our Testimonials") {
                                            setScrollToSection("testimonials");
                                          }
                                        }}>
                                          <div className="hover:bg-black/5 pl-3 pr-[80px] py-2 rounded-[8px] transition-transform duration-300 hover:scale-105 flex justify-between items-center">
                                            <p className="m-0 p-0 text-[16px]">
                                              {item.title}
                                            </p>
                                          </div>
                                        </Link>
                                      ))}
                                    </div>
                                  ) : null}
                </li>

                
              ) : (
                <li key={index} className="pb-2">
                  <Link
                    href={item.url}
                    onClick={() => setMenuOpen(false)}
                    className="font-semibold"
                  >
                    {item.title}
                  </Link>
                </li>
              )
            )}
            

            {/* Contact Link */}
            <li>
              <Link
                href="/contact-us"
                onClick={() => setMenuOpen(false)}
                className="font-semibold"
              >
                Contact Us
              </Link>
            </li>
          </ul>

          {/* Social Icons */}
          <div className="mt-auto">
            <hr />
            <div className="flex space-x-4 mt-4">
              <FaFacebookF className="cursor-pointer w-6 h-6 hover:text-primary transition-all duration-500" />
              <FaLinkedinIn className="cursor-pointer w-6 h-6 hover:text-primary transition-all duration-500" />
              <FaInstagram className="cursor-pointer w-6 h-6 hover:text-primary transition-all duration-500" />
              <FaYoutube className="cursor-pointer w-6 h-6 hover:text-primary transition-all duration-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;

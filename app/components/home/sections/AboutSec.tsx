'use client'
/* import Image from "next/image"; */
import Link from "next/link";
import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
type CounterProps = {
    end: number;
    label: string;
  };
  
  const Counter: React.FC<CounterProps> = ({ end, label }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.5 }
      );
      
      if (ref.current) {
        observer.observe(ref.current);
      }
      
      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, []);
  
    useEffect(() => {
      if (!isVisible) return;
  
      let start = 0;
      const duration = 2000;
      const stepTime = Math.abs(Math.floor(duration / end));
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, stepTime);
      return () => clearInterval(timer);
    }, [isVisible, end]);
  
    return (
      <div ref={ref} className="text-left not-last:border-r not-last:border-[#7D7D7D] w-full">
        <p className="text-lg font-normal text-primary leading-none">{count}+</p>
        <p className="text-gray-600 text-sm">{label}</p>
      </div>
    );
  };
  


const AboutSec = () => {
  return (
    <section className="pt-[60px] lg:pt-[90px] 2xl:pt-[120px] ">
      <div className="container">
        <div className="grid grid-cols-2 gap-[40px]">
          <div>
            <h2 className="text-xl text-primary mb-[100px]"> About Microlights</h2>
            <figure className="h-[750px] overflow-hidden relative">
          <Image src={'/assets/img/home/abtmcs.jpg'} className="absolute w-full h-full  object-center object-cover" alt="" width={900} height={600} />
          </figure>
          </div>
          <div className="pl-[0px] 2xl:pl-[90px]">
            <h3 className="text-lg text-[#7D7D7D]">Comprehensive Lighting Solutions Tailored for Every Space</h3>
            <hr className="mt-[30px] mb-[80px]"/>
            <p>
              In 2002, Microlights Limited, a lighting company based in the West
              of England manufacturing luminaires and related components,
              expanded its presence into the Middle East by founding Microlights
              Dubai. Microlights Dubai then embarked on supplying lighting
              products, value add solutions and designs to retail and commercial
              projects across the Middle East and neighbouring countries.
            </p>
            <p>
              Microlights has been dealing directly with end retailers and
              developing smart lighting solutions for major utilities and others
              for over 22 years, and is proud of the long standing relationships
              it has with many of its clients.
            </p>
           <div className="flex mt-[50px]">
           <Link href={'/'} className="flex gap-[20px] items-center border-t border-primary text-sm text-primary border-solid leaing-none pt-[12px] cursor-pointer group">Read More <FiArrowUpRight className="text-[22px] text-[#7D7D7D] group-hover:scale-125 transition-all ease-in-out duration-500 " />
           </Link>
           </div>
            <div className="grid grid-cols-3 justify-center gap-[30px] text-center mt-[80px]">
          <Counter end={25} label="Years of Expertise" />
          <Counter end={250} label="Projects Completed" />
          <Counter end={100} label="Happy Clients" />
        </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSec;

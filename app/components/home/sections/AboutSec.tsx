"use client";
/* import Image from "next/image"; */
import Link from "next/link";
import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion"
import Image from "next/image";
import parse from 'html-react-parser';
import { Home } from "@/types/Home";

type CounterProps = {
  end: number;
  label: string;
  index: number;
};

const Counter: React.FC<CounterProps> = ({ end, label ,index }) => {
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
    <div
      ref={ref}
      className="text-left not-last:border-r not-last:border-[#7D7D7D] w-full pr-2"
    >
      <p className="text-lg font-normal text-primary leading-none">
        {index === 0 ? `${count}+` : `${count}'s`}
      </p>
      <p className="text-gray-600 text-[14px]">{label}</p>
    </div>
  );
};

const AboutSec = ({ data }: { data: Home }) => {
  return (
    <section className="pb-[60px] lg:pb-[0px] pt-[60px] lg:pt-[90px] 2xl:pt-[120px] ">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[40px]">
          <div>
            <div className="overflow-hidden mb-[30px] lg:mb-[50px] 2xl:mb-[100px]">
              <motion.h2 initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.5 }} className="text-xl text-primary ">

                About Microlights
              </motion.h2>
            </div>
            <motion.figure className="h-[250px] lg:h-[750px] overflow-hidden relative" initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.5 }}>
              <Image
                src={data?.aboutImage}
                className="absolute w-full h-full  object-center object-cover"
                alt={data?.aboutImageAltTag}
                width={900}
                height={600}
              />
            </motion.figure>
          </div>
          <motion.div className="pl-[0px] 2xl:pl-[90px]" initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.5 }}>
            <h3 className="text-lg text-[#7D7D7D]">
              {data?.aboutTitle}
            </h3>
            <hr className="mt-[30px] mb-[30px] lg:xl-[50px] 2xl:mb-[80px]" />
            <div>
              {parse(data?.aboutDescription || "")}
            </div>
            <div className="flex mt-[30px] 2xl:mt-[50px]">
              <Link
                href={"/about-us"}
                className="flex gap-[20px] items-center border-t border-primary text-sm text-primary border-solid leaing-none pt-[12px] cursor-pointer group"
              >
                Read More{" "}
                <FiArrowUpRight className="text-[22px] text-[#7D7D7D] group-hover:scale-125 transition-all ease-in-out duration-500 " />
              </Link>
            </div>
            <div className="grid grid-cols-3 justify-center gap-[15px] lg:gap-[30px] text-center mt-[30px]  md:mt-[20px] xl:mt-[80px]">
              <Counter end={data?.years} label="Years of Expertise" index={0} />
              <Counter end={data?.projects} label="of Projects Completed" index={1} />
              <Counter end={data?.clients} label="of Happy Clients" index={2} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSec;

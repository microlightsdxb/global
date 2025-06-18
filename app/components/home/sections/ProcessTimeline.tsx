'use client'
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { motion } from 'framer-motion';
import { Home } from "@/types/Home";

gsap.registerPlugin(ScrollTrigger);

const ProcessTimeline: React.FC<{ data: Home }> = ({ data }) => {
  const containerRef2 = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // const steps = [
  //   { id: "01", title: "Consultation" },
  //   { id: "02", title: "Lighting Design" },
  //   { id: "03", title: "Product Selection" },
  //   { id: "04", title: "Manage Roll Out" },
  //   { id: "05", title: "Testing" },
  //   { id: "06", title: "Finalization" },
  // ];

  useEffect(() => {
    if (!containerRef2.current || !timelineRef.current) return;

    const ctx = gsap.context(() => {
      const scrollWidth = timelineRef.current?.scrollWidth || 1000;

      gsap.to(timelineRef.current, {
        x: () => `-${scrollWidth / 2}px`, // Adjust movement dynamically
        ease: "none",
        scrollTrigger: {
          trigger: containerRef2.current,
          start: "top top",

          end: "+=2000 top",
          scrub: 1,
          pin: true,
          // markers: true,
          anticipatePin: 1, // Reduce pinning glitches
        },
      });

      ScrollTrigger.refresh(); // Ensure proper calculation on mount
    }, containerRef2);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="mt-[0px] lg:mt-[-90px] -z-10 relative bg-primary pt-[100px] lg:pt-[210px] pb-[60px] lg:pb-[90px] 2xl:pb-[120px] text-white overflow-x-hidden h-[62vh] md:h-screen" ref={containerRef2}

    >
      <figure className="absolute bg-primary w-full h-full inset-0 -z-10">
        <Image src={'/assets/img/banner/process.jpg'} width={1900} height={900} alt="bnr" className="w-full h-full absolute object-center object-cover" />
      </figure>
      <div className="container">
        <div className="overflow-hidden mb-[30px] lg:mb-[80px]" >
          <motion.h2 className="text-xl " initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.5 }}>
            Our Process,<br /> From Vision to Result
          </motion.h2>
        </div>
        <motion.div className="relative w-full" initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.5 }}>
          <div ref={timelineRef} className="flex w-[300%] lg:w-[200%] gap-0 h-[300px]" >
            {data?.process?.map((step, index) => (
              <div

                key={index}
                className={`w-[20%] lg:w-[28%]  h-[120px] lg:h-[150px] text-left relative before:absolute before:content-[] before:h-[1px] before:w-[200%] before:bg-white after:absolute after:content-[] after:h-[20px] after:w-[20px] after:bg-white after:rounded-full ${index % 2 === 0 ? "before:bottom-0 after:bottom-[-10px]" : "mt-[119px] lg:mt-[149px] top-0 pt-[50px] before:top-0 after:top-[-10px]"
                  }`}
              >
                <h4 className="text-xl font-light opacity-30 leading-none mb-[20px]">{"0" + (index + 1)}</h4>
                <h3 className="text-lg mt-2 font-light leading-none">{step.title}</h3>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessTimeline;

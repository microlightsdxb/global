'use client'
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProcessTimeline: React.FC = () => {
  const containerRef2 = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const steps = [
    { id: "01", title: "Consultation" },
    { id: "02", title: "Lighting Design" },
    { id: "03", title: "Planning" },
    { id: "04", title: "Installation" },
    { id: "05", title: "Testing" },
    { id: "06", title: "Finalization" },
  ];

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
          markers: true,
          anticipatePin: 1, // Reduce pinning glitches
        },
      });

      ScrollTrigger.refresh(); // Ensure proper calculation on mount
    }, containerRef2);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      className="mt-[-90px] -z-10 relative bg-primary pt-[210px] pb-[60px] lg:pb-[90px] 2xl:pb-[120px] text-white overflow-x-hidden h-screen"   ref={containerRef2}
    
    >
      <div className="container">
        <div className="overflow-hidden mb-[80px]" >
        <h2 className="text-xl ">
          Our Process,<br /> From Vision to Result
        </h2>
        </div>
        <div className="relative w-full">
          <div ref={timelineRef} className="flex w-[200%] gap-0 h-[300px]">
            {steps.map((step, index) => (
              <div
              key={index}
              className={`w-[16%]  h-[150px] text-left relative before:absolute before:content-[] before:h-[1px] before:w-full before:bg-white after:absolute after:content-[] after:h-[20px] after:w-[20px] after:bg-white after:rounded-full ${
                index % 2 === 0 ? "before:bottom-0 after:bottom-[-10px]" : "mt-[149px] top-0 pt-[50px] before:top-0 after:top-[-10px]"
              }`}
            >
                <h4 className="text-xl font-light opacity-30 leading-none mb-[20px]">{step.id}</h4>
                <h3 className="text-lg mt-2 font-light leading-none">{step.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;

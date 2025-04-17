"use client";
import React,{useEffect,useState,useRef} from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sustainability } from "@/types/Sustainability";

const Longimg = ({data}: {data: Sustainability}) => {

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Ref for the next container (HTMLDivElement type)
  const nextContainerRef = useRef<HTMLDivElement | null>(null);
  const [divWidth, setDivWidth] = useState("100%");

  useEffect(() => {
    const updateDivWidth = () => {
      if (nextContainerRef.current) {
        // Get the bounding rectangle of the next container
        const containerRect = nextContainerRef.current.getBoundingClientRect();

        // Get the computed style of the next container to retrieve margin values
        const computedStyle = window.getComputedStyle(nextContainerRef.current);

        // Calculate the total width including margins (left + width + right)
        const marginLeft = parseFloat(computedStyle.marginLeft);
        const totalWidth = containerRect.width + marginLeft - 15;

        setDivWidth(`${totalWidth}px`);
      }
    };
    // Initial width calculation
    updateDivWidth();

    // Recalculate on window resize
    window.addEventListener("resize", updateDivWidth);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", updateDivWidth);
    };
  }, []); // Empty dependency array ensures this runs once on mount

  const checkWidth = () => {
    if (window.innerWidth < 1024) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  // Run on mount and on resize
  useEffect(() => {
    checkWidth(); // Check width on initial render
    window.addEventListener("resize", checkWidth); // Add event listener

    // Clean up the event listener on unmount
    return () => window.removeEventListener("resize", checkWidth);
  }, []);
  return (
    <section className="relative">
      <div className="container" ref={nextContainerRef}></div>
      <div>
      <div className="bg-[#F1F6F0] lg:h-[100px] xl:h-[150px] 2xl:h-[174px] absolute w-full"></div>

<div     style={{ width: isSmallScreen ? "" : divWidth }}
    className={`ml-auto relative${
      isSmallScreen ? "container mx-auto " : ""
            } custom-class`}>
          <motion.div initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.5 }}>
  <Image src={data.data.introImage} alt="" layout="responsive" width={1000} height={1000}/>
</motion.div>
</div>
      </div>
    </section>

  );
};

export default Longimg;

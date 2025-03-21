"use client";
import { assets } from "@/public/assets/assets";
import React,{useEffect,useState,useRef} from "react";
import Image from "next/image";
const Longimg = ({ }) => {

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
      <div className="bg-[#F1F6F0] lg:h-[200px] xl:h-[250px] 2xl:h-[300px] absolute w-full"></div>

<div     style={{ width: isSmallScreen ? "" : divWidth }}
    className={`ml-auto relative${
      isSmallScreen ? "container mx-auto " : ""
    } custom-class`}>
  <Image src={assets.macrogreenleaf} alt="" layout="responsive" />
</div>
      </div>
    </section>

  );
};

export default Longimg;

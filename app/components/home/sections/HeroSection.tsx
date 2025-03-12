"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
/* import { motion } from "framer-motion"; */
import c01web2 from "@/public/assets/img/home/slide1.jpg";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";



const projects = [
  {
    id: 1,
    title: "Innovate. Illuminate. Inspire.",
    subtitle: "Smart & Sustainable Lighting Solutions",
    client: "MR Properties",
    type: "5 Star Hilton Hotel & Branded Residences",
    description:
      "Perched on the captivating Al Marjan Island, the Hilton 5-star hotel masterfully balances serene beach front luxury with the thrilling allure of a vibrant casino. Nestled beside the existing Hampton by Hilton Al Marjan Island, this architectural marvel offers guests and residents an unparalleled experience that fuses relaxation and entertainment.",
    image: c01web2,
    status: "Completed",
  },
  {
    id: 2,
    title: "Innovate. Illuminate. Inspire.",
    subtitle: "Smart & Sustainable Lighting Solutions",
    client: "MR Properties",
    type: "5 Star Hilton Hotel & Branded Residences",
    description:
      "Perched on the captivating Al Marjan Island, the Hilton 5-star hotel masterfully balances serene beach front luxury with the thrilling allure of a vibrant casino. Nestled beside the existing Hampton by Hilton Al Marjan Island, this architectural marvel offers guests and residents an unparalleled experience that fuses relaxation and entertainment.",
    image: c01web2,
    status: "Completed",
  }
 
];

const HeroSection = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = projects.length;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Create master timeline
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: `${totalSlides * 200}% top`,
          scrub: 1,
          pin: true,
          markers: true,
          onUpdate: (self) => {
            const index = Math.round(self.progress * (totalSlides - 1)) + 1;
            const progress = Math.min(Math.max(self.progress, 0), 1);
            setCurrentSlide(Math.min(index, totalSlides));

            // Animate the progress line
            gsap.to(".progress-line", {
              height: `${(progress * 100)}%`,
              duration: 0.1,
            });
          },


        }
      });

      // Add animations to the timeline
      projects.forEach((_, index) => {
        // Create a simultaneous animation for title fade out, content box slide in, and gradient effect
        masterTl.to(`.slide:nth-child(${index + 1}) figure`, {
            opacity: 0.5,
          duration: 0.8,
            ease: "power2.inOut"
          }, `slide${index}`)
          .fromTo(`.slide:nth-child(${index + 1}) figure img`, 
            { scale: 1 },
            {
              scale: 1.2,
          }, `slide${index}`)
          .to(`.slide:nth-child(${index + 1}) .title`, {
            x: '30px',
            opacity: 0.5,
            duration: 0.8,
          }, `slide${index}`)
       /*    .fromTo(`.slide:nth-child(${index + 1}) .title h1`, {
            x: '-100px',
            opacity: 0.5,
            duration: 0.8,
          }, {
            x: '0px',
            opacity: 0.5,
          }, `slide${index}`) */
        
       /*  */
        /*   .to(`.slide:nth-child(${index + 1}) .content-box`, {
            right: "0",
            duration: 1,
            ease: "power2.inOut"
          }, `slide${index}`) */
        /*   .fromTo(`.slide:nth-child(${index + 1}) .gradient-overlay`, {
            backgroundColor: 'hsla(0%,0%,0%,0)',
            backgroundImage: `
            radial-gradient(at 99% 19%, hsla(0%,0%,0%,0) 0px, transparent 80%),
            radial-gradient(at 0% 100%, hsla(0%,0%,0%,0) 0px, transparent 80%),
            radial-gradient(at 100% 75%, hsla(0%,0%,0%,0) 0px, transparent 30%),
            radial-gradient(at 34% 0%, hsla(0%,0%,0%,0) 0px, transparent 30%)
          `}, {
            backgroundColor: 'hsla(0%,0%,0%,0)',
            backgroundImage: `
            radial-gradient(at 99% 19%, hsla(0%,0%,0%,0.60) 0px, transparent 80%),
            radial-gradient(at 0% 100%, hsla(0%,0%,0%,0) 0px, transparent 80%),
            radial-gradient(at 100% 75%, hsla(0%,0%,0%,0.60) 0px, transparent 80%),
            radial-gradient(at 34% 0%, hsla(0%,0%,0%,0.60) 0px, transparent 80%)
          `,
            duration: 1,
            ease: "power2.inOut"
          }, `slide${index}`);
 */
        // If not the last slide, add horizontal scroll
        if (index < projects.length - 1) {
          masterTl.to(sectionRef.current, {
            x: `-${(index + 1) * 100}vw`,
            duration: 1,
            ease: "none"
          });
        }
      });

      // Initial load animation for the main title and tags
   /*    gsap.from('.slide:first-child .title h1', {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 4.2
      }); */
      
      // Keep the animation for other slides unchanged
     /*  gsap.from('.slide:not(:first-child) .title h1', {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.5
      });

      gsap.from('.slide:first-child .title .flex p', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        delay: 4.7
      });
      gsap.from('.slide:not(:first-child) .title .flex p', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.8
      });
 */
      return () => {
        ScrollTrigger.getAll().forEach(masterTl => masterTl.kill());
      };
    }
  }, [totalSlides]);


  return (
    <section
      className="h-screen relative overflow-hidden bg-primary"
      ref={triggerRef}
      suppressHydrationWarning
    >
      <div className="absolute bottom-[150px] w-full z-10">
        <div className="container flex justify-end">
        <span className="text-[15px] text-white whitespace-nowrap font-light">
            <span className="font-medium "> {`0${currentSlide}`}</span> - {`0${totalSlides}`}
          </span>
        </div>
      </div>
  
      <div className="prject-sec h-full flex flex-wrap" style={{ width: `${projects.length * 100}vw` }} ref={sectionRef}>

        {projects.map((project) => (
          <div key={project.id} className="slide h-full w-screen relative overflow-hidden text-white">
            <figure className="h-full w-full absolute -z-50">
              <Image className="h-full w-full absolute object-cover object-center" src={project.image} alt={project.title} width={2500} height={1000} />
            </figure>
            <div className="h-full w-full -z-40 absolute bg-gradient-to-t from-black to-transparent opacity-70"></div>
    
            <div className="absolute w-full h-full">
              <div className="container h-full">
                <div className="h-full relative">
                  <div
                    className="title absolute bottom-[150px] transition-all ease-in-out flex flex-col"

                  >
                    <div className="overflow-hidden mb-[30px]">
                      <h1 className="text-2xl text-white leading-none font-custom font-normal w-[70%] ">
                        {project.title}
                      </h1>
                    </div>
                    <div className="overflow-hidden mb-[50px]">
                      <p className="text-lg text-white leading-tight font-custom font-light">
                        {project.subtitle}
                      </p>
                    </div>
                    <div className="flex">
                    <Link href={'/'} className="flex gap-[20px] items-center border-t border-white text-sm text-white border-solid leaing-none pt-[12px]">Explore <FiArrowUpRight className="text-[22px] text-white" />
                    </Link></div>
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
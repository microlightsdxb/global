'use client'
import React, { useEffect, useRef } from 'react';
import c01web2 from "@/public/assets/img/home/slide1.jpg";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import Image from 'next/image';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 1,
        title: "Innovate. Illuminate. Inspire.",
        subtitle: "Smart & Sustainable Lighting Solutions",
        client: "MR Properties",
        type: "5 Star Hilton Hotel & Branded Residences",
        description: "Perched on the captivating Al Marjan Island...",
        image: c01web2,
        status: "Completed",
    },
    {
        id: 2,
        title: "Innovate. Illuminate. Inspire.",
        subtitle: "Smart & Sustainable Lighting Solutions",
        client: "MR Properties",
        type: "5 Star Hilton Hotel & Branded Residences",
        description: "Perched on the captivating Al Marjan Island...",
        image: c01web2,
        status: "Completed",
    }
];

const BannerSe = () => {
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        const scrollSections = document.querySelectorAll<HTMLDivElement>(".horizontal-section");

        scrollSections.forEach((section) => {
            const wrapper = section.querySelector<HTMLDivElement>(".wrapper");
            if (!wrapper) return;
            const items = wrapper.querySelectorAll<HTMLDivElement>(".item");

            if (items.length > 0) {
                timelineRef.current = initHorizontalScroll(section, items);
            }
        });

        return () => {
            if (timelineRef.current) {
                timelineRef.current.kill();
                ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            }
        };
    }, []);

    function initHorizontalScroll(section: HTMLDivElement, items: NodeListOf<HTMLDivElement>) {
        items.forEach((item, index) => {
            if (index !== 0) {
                gsap.set(item, { xPercent: 100 });
            }
        });

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                pin: true,
                start: "top top",
                end: () => `+=${items.length * 100}%`,
                scrub: 1,
                invalidateOnRefresh: true,
            },
            defaults: { ease: "none" },
        });

        items.forEach((item, index) => {
            timeline.to(item, {
                scale: 0.9,
                borderRadius: "10px",
            });

            if (items[index + 1]) {
                timeline.to(
                    items[index + 1],
                    {
                        xPercent: 0,
                    },
                    "<"
                );
            }
        });

        return timeline;
    }

    return (
        <section className="h-screen relative overflow-hidden bg-primary horizontal-section">
            <div className="absolute bottom-[150px] w-full z-10">
                <div className="container flex justify-end"></div>
            </div>

            <div className="prject-sec h-full wrapper">
                <div className="h-full flex justify-start items-center relative">
                    {projects.map((project) => (
                        <div key={project.id} className="slide h-full w-screen flex overflow-hidden text-white item absolute">
                            <figure className="h-full w-full absolute ">
                                <Image className="h-full w-full absolute object-cover object-center" src={project.image} alt={project.title} width={2500} height={1000} />
                            </figure>
                            <div className="h-full w-full absolute bg-gradient-to-t from-black to-transparent opacity-70"></div>

                            <div className="absolute w-full h-full">
                                <div className="container h-full">
                                    <div className="h-full relative">
                                        <div className="title absolute bottom-[150px] transition-all ease-in-out flex flex-col">
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
                                                <Link href={'/'} className="flex gap-[20px] items-center border-t border-white text-sm text-white border-solid leaing-none pt-[12px]">
                                                    Explore <FiArrowUpRight className="text-[22px] text-white" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BannerSe;

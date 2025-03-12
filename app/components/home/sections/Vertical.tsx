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

const VerticalSec = () => {
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        const sections = document.querySelectorAll<HTMLDivElement>(".vertical-section .item");

        if (sections.length > 0) {
            timelineRef.current = initVerticalScroll(sections);
        }

        return () => {
            if (timelineRef.current) {
                timelineRef.current.kill();
                ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            }
        };
    }, []);

    function initVerticalScroll(items: NodeListOf<HTMLDivElement>) {
        gsap.set(items, { opacity: 0, y: 100 });

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".vertical-section",
                start: "top center",
                end: "bottom top",
                scrub: 1,
            },
        });

        items.forEach((item, index) => {
            timeline.to(item, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
            }, index * 0.5);
        });

        return timeline;
    }

    return (
        <section className="relative overflow-hidden bg-primary vertical-section">
            <div className="container flex flex-col items-center py-20 space-y-20">
                {projects.map((project) => (
                    <div key={project.id} className="w-full text-white item opacity-0 transform translate-y-20 transition-all">
                        <figure className="relative w-full h-[500px]">
                            <Image className="w-full h-full object-cover" src={project.image} alt={project.title} width={2500} height={1000} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                        </figure>
                        <div className="mt-6 text-center">
                            <h1 className="text-2xl font-custom font-normal">{project.title}</h1>
                            <p className="text-lg font-custom font-light mt-2">{project.subtitle}</p>
                            <div className="mt-4">
                                <Link href={'/'} className="flex justify-center gap-2 items-center border-t border-white text-sm text-white pt-2">
                                    Explore <FiArrowUpRight className="text-[22px] text-white" />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default VerticalSec;

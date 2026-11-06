"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem } from "./navbar-menu";
import { menuItems } from "./menuItems";
import MobileNav from "./MobileNav";
import BoxButton from "./BoxButton";
import { useStore } from "@/app/store/productType";

type MenuItemType = {
  title: string;
  url: string;
  children?: { title: string; url: string }[];
};

const Header = () => {
  const [active, setActive] = useState<string | null>(null);
  const [services, setServices] = useState<{name:string,slug:string}[]>([]);
  const setType = useStore((state)=>state.setType)
  const setScrollToSection = useStore((state)=>state.setScrollToSection)

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

  // Hide on scroll down, show on scroll up
  const [hidden, setHidden] = useState(false);

  // Entrance starts on mount, in the same pass as the hero title's motion
  const [entered, setEntered] = useState(false);
  useEffect(() => setEntered(true), []);

  useEffect(() => {
    const TOP_ZONE = 80;
    const MIN_DELTA = 6;
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY;

      if (y <= TOP_ZONE) {
        setHidden(false);
      } else if (Math.abs(delta) >= MIN_DELTA) {
        setHidden(delta > 0);
      }

      if (Math.abs(delta) >= MIN_DELTA || y <= TOP_ZONE) lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHidden = hidden && !active;

  return (
    <header
      // Translate only while hidden — a transform would break MobileNav's fixed drawer
      className={`${entered ? "v2-header-in" : "v2-header-pre"} lg:py-[22px] fixed top-0 w-full z-50 bg-white shadow-xs transition-[translate] duration-500 ease-in-out ${
        isHidden ? "-translate-y-full" : ""
      }`}
    >
      <MobileNav />
      <div className="container-fluid left-spacing pr-[47px] lg:flex items-center justify-between gap-20 hidden">
        {/* Logo */}
        <div className="logo-sec">
          <Link href="/" onClick={()=>{setScrollToSection('')}}>
          <Image
            src="/assets/img/logo.svg"
            alt="Lighting Solutions Dubai"
            title="Microlights" 
            width={220}
            height={58}
            className="pointer-events-none w-[clamp(180px,calc(180px+(100vw-1024px)*40/896),220px)] h-auto"
          />
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-[60px]">
          <Menu setActive={setActive}>
            {menuItems.map((menuItem: MenuItemType, index) => (
              <MenuItem
                key={index}
                setActive={setActive}
                active={active}
                url={menuItem.url}
                item={menuItem.title}
                nomenu={!menuItem.children?.length}
              >
                {menuItem.title == "Services" && services.map((service: {name:string,slug:string}, subIndex) => (
                  <HoveredLink href={`/services/${service.slug}`} key={subIndex}>
                    <div className="hover:bg-black/5 pl-3 pr-[80px] py-2 rounded-[8px] transition-transform duration-300 hover:scale-105 flex justify-between items-center">
                      <p className="m-0 p-0 text-[16px]">
                        {service.name}
                      </p>
                    </div>
                  </HoveredLink>
                ))}
                {menuItem.title !== "Services" && menuItem.children?.length ? (
                  <div className="grid grid-cols-1">
                    {menuItem.children.map((item, subIndex) => (
                      <HoveredLink href={item.url} key={subIndex} onClick={() => {
                        setType(item.title.split(" ")[0]);
                        if (item.title === "Our Testimonials") {
                          setScrollToSection("testimonials");
                        }
                      }}>
                        <div className="hover:bg-black/5 pl-3 pr-[80px] py-2 rounded-[8px] transition-transform duration-300 hover:scale-105 flex justify-between items-center">
                          <p className="m-0 p-0 text-[16px]">
                            {item.title}
                          </p>
                        </div>
                      </HoveredLink>
                    ))}
                  </div>
                ) : null}
              </MenuItem>
            ))}
          </Menu>

          {/* Contact */}
          <BoxButton href="/contact-us" label="Contact" tone="dark" />
        </div>
      </div>
    </header>
  );
};

export default Header;

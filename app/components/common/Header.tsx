"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { HoveredLink, Menu, MenuItem } from "../ui/navbar-menu";
import { menuItems } from "./menuItems";
import MobileNav from "./MobileNav";

// Define the type for menu items
type MenuItemType = {
  title: string;
  url: string;
  children?: { title: string; url: string }[]; // `children` is optional
};

const Header = () => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <header className="lg:py-[22px] fixed w-full z-10 bg-white shadow-xs">
      <MobileNav />
      <div className="container-fluid left-spacing pr-[47px] lg:flex items-center justify-between gap-20 hidden">
        {/* Logo Section */}
        <div className="logo-sec">
          <Link href="/">
          <Image
            src="/assets/img/logo.svg"
            alt="Logo"
            className="h-[58px] w-auto"
            width={100}
            height={250}
          />
          </Link>
        </div>

        {/* Navigation Menu */}
        <div className="flex items-center gap-[150px]">
          <Menu setActive={setActive}>
            {menuItems.map((menuItem: MenuItemType, index) => (
              <MenuItem
                key={index}
                setActive={setActive}
                active={active}
                url={menuItem.url}
                item={menuItem.title}
                nomenu={!menuItem.children?.length} // If no submenu, set `nomenu=true`
              >
                {/* Render submenus only if `children` exist */}
                {menuItem.children?.length ? (
                  <div className="grid grid-cols-1">
                    {menuItem.children.map((item, subIndex) => (
                      <HoveredLink href={item.url} key={subIndex}>
                        <div className="hover:bg-black/5 pl-3 pr-[80px] py-2 rounded-[8px] transition-transform duration-300 hover:scale-105 flex justify-between items-center">
                          <p className="m-0 p-0 text-[16px] uppercase">
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

          {/* Contact Button */}
          <div className="rghtsd">
            <Link
              href="/"
              className="flex gap-[20px] items-center border-t border-primary text-sm text-primary border-solid leading-none pt-[12px]"
            >
              Contact <FiArrowUpRight className="text-[22px] text-[#7D7D7D]" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

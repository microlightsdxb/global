"use client"

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { HoveredLink, Menu, MenuItem } from "../ui/navbar-menu";
import { menuItems } from "./menuItems";
import MobileNav from "./MobileNav";

const Header = () => {

  const [active, setActive] = useState<string | null>(null);
  
  return (
    <>
    <header className="lg:py-[22px] fixed w-full z-10 bg-white shadow-xs">
    <MobileNav/>
      <div className="container-fluid left-spacing pr-[47px] lg:flex items-center justify-between gap-20 hidden">
        <div className="logo-sec">
          <Image src="/assets/img/logo.svg" alt="" className="h-[58px] w-auto" width={100} height={250} />
        </div>
      <div className="flex items-center gap-[150px]">
        <Menu setActive={setActive}>
        {menuItems.map((menuItem, index) =>
            menuItem.children ? (
              <MenuItem
                setActive={setActive}
                active={active}
                url={menuItem.url}
                item={menuItem.title}
                key={index}>
                <div className="grid grid-cols-1">
                  {/* <ProductItem
                  title="Residential"
                  description=" "
                  href="#"
                  src={"/assets/images/gd-im1.jpg"}
                />
                <ProductItem
                  title="Commercial"
                  description=""
                  href="#"
                  src="/assets/images/gd-im2.jpg"
                /> */}
               {/*    {menuItem.children.map((item, index) => (
                    <HoveredLink href={`${item.url}`} key={index}>
                      <div className="hover:bg-black/5 pl-3 pr-[80px] py-2 rounded-[8px] transition-transform duration-300 hover:scale-105 flex justify-between items-center self-start spckbtn whts">
                        <p className="m-0 p-0 text-[16px] uppercase">
                          {item.title}
                        </p>
                      </div>
                    </HoveredLink>
                  ))}
 */}
                  {/* <HoveredLink href="#">
                  <div>Commercial</div>
                </HoveredLink> */}
                </div>
              </MenuItem>
            ) : (
              <MenuItem
                item={menuItem.title}
                url={menuItem.url || "#"}
                setActive={setActive}
                active={active}
                nomenu={true}
                key={index}>
                <div className="p-4">
                  <Link href="/" className="">{menuItem.title}</Link>
                </div>
              </MenuItem>
            )
          )}

        </Menu>

        <div className="rghtsd">
          <Link href={'/'} className="flex gap-[20px] items-center border-t border-primary text-sm text-primary border-solid leaing-none pt-[12px]">Contact <FiArrowUpRight className="text-[22px] text-[#7D7D7D]" />
          </Link>
          </div>
          </div>
      </div>
    </header>
    </>
  );
};

export default Header;

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiArrowUpRight } from "react-icons/fi";

const Header = () => {
  return (
    <header className="py-[22px] fixed w-full z-10 bg-white shadow-xs">
      <div className="container-fluid left-spacing pr-[47px] flex justify-between items-center ">
        <div className="logo-sec">
          <Image src="/assets/img/logo.svg" alt="" className="h-[58px] w-auto" width={100} height={250} />
        </div>
        <div className="flex gap-[160px]">
          <ul className="flex items-center space-x-[40px] text-xs ">
            <li>
              <Link className="" href={"/"}>
              About

              </Link>
            </li>
            <li>
              <Link href={"/"}>Products
</Link>
            </li>
            <li>
              <Link href={"/"}>Services
</Link>
            </li>
            <li>
              <Link href={"/"}>Industries
</Link>
            </li>
            <li>
              <Link href={"/"}>Projects
</Link>
            </li>
            <li>
              <Link href={"/"}>Sustainability
              </Link>
            </li>
            <li>
              <Link href={"/"}>Blogs
              </Link>
            </li>
          </ul>
          <div className="rghtsd">
          <Link href={'/'} className="flex gap-[20px] items-center border-t border-primary text-sm text-primary border-solid leaing-none pt-[12px]">Contact <FiArrowUpRight className="text-[22px] text-[#7D7D7D]" />
          </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

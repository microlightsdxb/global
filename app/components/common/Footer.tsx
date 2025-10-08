'use client'
import Image from "next/image";
import Link from "next/link";
import { FaLinkedin, FaInstagram, FaFacebookF } from "react-icons/fa";
/* import { BsWhatsapp } from "react-icons/bs"; */
import { FiArrowUpRight } from "react-icons/fi";
import {motion} from 'framer-motion';
import { useStore } from "@/app/store/productType";


const Footer = () => {
  const setType = useStore((state)=>state.setType)
  
  
  return (
    <footer className="pt-[60px] lg:pt-[80px] 2xl:pt-[120px] pb-[40px]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8"   >
          <motion.div className="flex" initial={{opacity: 0, y: -50}}
          whileInView={{opacity: 1, y: 0}}
          transition={{delay: 0, duration: 0.9}}
          viewport={{once: true, amount: 0.8}}
          >
            {/* Quick Links */}
            <div className="w-1/2">
              <p className="text-lg text-primary !mb-4 md:!mb-[35px] leading-none">Quick Links</p>
              <ul className="text-gray-500 mt-4 space-y-2">
                <li className="transition-all ease-in-out duration-500 group hover:translate-x-1">
                  <Link className="text-xs text-[#7D7D7D] group-hover:text-black" href="/about-us">About Microlights</Link>
                </li>
                <li className="transition-all ease-in-out duration-500 group hover:translate-x-1">
                  <Link className="text-xs text-[#7D7D7D] group-hover:text-black" href="/sustainability">Sustainability</Link>
                </li>
                <li className="transition-all ease-in-out duration-500 group hover:translate-x-1">
                  <Link className="text-xs text-[#7D7D7D] group-hover:text-black" href="/projects">Projects</Link>
                </li>
                <li className="transition-all ease-in-out duration-500 group hover:translate-x-1">
                  <Link className="text-xs text-[#7D7D7D] group-hover:text-black" href="/blog">Blog</Link>
                </li>

              </ul>
            </div>

            {/* Products */}
            <div className="w-1/2">
              <p className="text-lg text-primary !mb-4 md:!mb-[35px] leading-none">Products</p>
              <ul className="text-gray-500 mt-4 space-y-2">
                <li className="transition-all ease-in-out duration-500 group hover:translate-x-1" onClick={()=>{setType("Indoor")}}>
                  <Link className="text-xs text-[#7D7D7D] group-hover:text-black" href="/lighting-products">Indoor Lighting</Link>
                </li>
                <li className="transition-all ease-in-out duration-500 group hover:translate-x-1" onClick={()=>{setType("Outdoor")}}>
                  <Link className="text-xs text-[#7D7D7D] group-hover:text-black" href="/lighting-products">Outdoor Lighting</Link>
                </li>
                <li className="transition-all ease-in-out duration-500 group hover:translate-x-1" onClick={()=>{setType("Industrial")}}>
                  <Link className="text-xs text-[#7D7D7D] group-hover:text-black" href="/lighting-products">Industrial Lighting</Link>
                </li>
              </ul>
            </div>
          </motion.div>
          <motion.div className="" initial={{opacity: 0, y: -50}}
          whileInView={{opacity: 1, y: 0}}
          transition={{delay: 0, duration: 0.9}}
          viewport={{once: true, amount: 0.8}}>
            <div className="md:flex gap-3 justify-between items-center bg-primary p-[20px] lg:p-[25px] 2xl:p-[35px] mb-[30px] lg:mb-[90px]">
              <span className="text-lg md:text-md xl:text-lg text-white">Download Brochure</span>
              <div className="flex mt-4 md:mt-0">
              <a
                href="/api/download"
                className="flex gap-[20px] items-center border-t border-white text-sm text-white border-solid leading-none pt-[12px]   transition-colors duration-300 group"
              >
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  Download
                </span>
                <FiArrowUpRight className="text-[22px] text-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </a>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mt-10 border-b pb-[30px]">
              <div className="flex space-x-[10px]">
                <Link href="https://www.linkedin.com/company/microlights/" target="_blank" className="group hover:-translate-y-1 transition-all ease-in-out duration-500 text-white bg-primary rounded-full text-center flex justify-center items-center w-[40px] h-[40px]">
                  <FaLinkedin size={18} className="group-hover:scale-111 transition-all ease-in-out duration-500"/>
                </Link>
                <Link href="https://www.instagram.com/microlightsgroup/" target="_blank" className="group hover:-translate-y-1 transition-all ease-in-out duration-500 text-white bg-primary rounded-full text-center flex justify-center items-center  w-[40px] h-[40px]">
                  <FaInstagram size={18} className="group-hover:scale-111 transition-all ease-in-out duration-500"/>
                </Link>
                <Link href="https://www.facebook.com/MicrolightsGroup" target="_blank" className="group hover:-translate-y-1 transition-all ease-in-out duration-500 text-white bg-primary rounded-full text-center flex justify-center items-center  w-[40px] h-[40px]">
                  <FaFacebookF size={18} className="group-hover:scale-111 transition-all ease-in-out duration-500"/>
                </Link>
              </div>

              <div className="flex space-x-6 mt-4 md:mt-0">
              <Image src={'/assets/img/icons/fticons.svg'} width={150} height={30} className="w-auto" alt="ftr"/>
              </div>
            </div>
            <div className="text-primary/50 text-center mt-6 text-[13px] flex xl:flex-row flex-col justify-between">
              <p style={{marginBottom: "0px"}}>&copy;2025 microlights. All rights reserved </p>
           <div className="flex space-x-4 items-center mt-3 xl:mt-0 justify-center">
                <Link href="/privacy-policy" className=" border-r pr-4 last:border-r-0 last:pr-0 transition-all ease-in-out duration-500 hover:text-black">Privacy Policy</Link>
                <Link href="/terms-and-conditions" className=" border-r pr-4 last:border-r-0 last:pr-0 transition-all ease-in-out duration-500 hover:text-black">Terms & Conditions</Link>
           </div>
            </div>
            {/* sdfv */}
          </motion.div>
        </div>

        {/*   <Link href="#" className="text-green-500 text-3xl mt-4 md:mt-0 fixed">
          <BsWhatsapp />
        </Link> */}
      </div>
    </footer>
  );
};

export default Footer;

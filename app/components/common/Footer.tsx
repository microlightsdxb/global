'use client'
import Image from "next/image";
import Link from "next/link";
import { FaLinkedin, FaInstagram, FaFacebookF } from "react-icons/fa";
/* import { BsWhatsapp } from "react-icons/bs"; */
import { FiArrowUpRight } from "react-icons/fi";
import {motion} from 'framer-motion';


const Footer = () => {
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
              <h3 className="text-lg text-primary mb-[35px] leading-none">Quick Links</h3>
              <ul className="text-gray-500 mt-4 space-y-2">
                <li>
                  <Link className="text-xs text-[#7D7D7D]" href="/about-us">About Microlights</Link>
                </li>
                <li>
                  <Link className="text-xs text-[#7D7D7D]" href="/sustainability">Sustainability</Link>
                </li>
                <li>
                  <Link className="text-xs text-[#7D7D7D]" href="/projects">Projects</Link>
                </li>
                <li>
                  <Link className="text-xs text-[#7D7D7D]" href="/blogs">Blog</Link>
                </li>

              </ul>
            </div>

            {/* Products */}
            <div className="w-1/2">
              <h3 className="text-lg text-primary mb-[35px] leading-none">Products</h3>
              <ul className="text-gray-500 mt-4 space-y-2">
                <li>
                  <Link className="text-xs text-[#7D7D7D]" href="#">Indoor Lighting</Link>
                </li>
                <li>
                  <Link className="text-xs text-[#7D7D7D]" href="#">Outdoor Lighting</Link>
                </li>
                <li>
                  <Link className="text-xs text-[#7D7D7D]" href="#">Industrial Lighting</Link>
                </li>
              </ul>
            </div>
          </motion.div>
          <motion.div className="" initial={{opacity: 0, y: -50}}
          whileInView={{opacity: 1, y: 0}}
          transition={{delay: 0, duration: 0.9}}
          viewport={{once: true, amount: 0.8}}>
            <div className="flex justify-between items-center bg-primary p-[20px] lg:p-[25px] 2xl:p-[35px] mb-[30px] lg:mb-[90px]">
              <span className="text-lg text-white">Download Brochure</span>
              <div className="flex">
                <Link
                  href={"/"}
                  className="flex gap-[20px] items-center border-t border-white text-sm text-white border-solid leaing-none pt-[12px]"
                >
                  Download <FiArrowUpRight className="text-[22px] text-white" />
                </Link>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mt-10 border-b pb-[30px]">
              <div className="flex space-x-[10px]">
                <Link href="#" className="text-white bg-primary rounded-full text-center flex justify-center items-center w-[40px] h-[40px]">
                  <FaLinkedin size={18}/>
                </Link>
                <Link href="#" className="text-white bg-primary rounded-full text-center flex justify-center items-center  w-[40px] h-[40px]">
                  <FaInstagram size={18}/>
                </Link>
                <Link href="#" className="text-white bg-primary rounded-full text-center flex justify-center items-center  w-[40px] h-[40px]">
                  <FaFacebookF size={18}/>
                </Link>
              </div>

              <div className="flex space-x-6 mt-4 md:mt-0">
              <Image src={'/assets/img/icons/fticons.svg'} width={150} height={30} className="w-auto" alt="ftr"/>
              </div>
            </div>
            <div className="text-primary/50 text-center mt-6 text-[13px] flex justify-between">
              <p>&copy;2025 microlights. All rights reserved </p>
           <div className="flex space-x-4 items-center">
                <Link href="/privacy-policy" className=" border-r pr-4 last:border-r-0 last:pr-0">Privacy Policy</Link>
                <Link href="/terms-and-conditions" className=" border-r pr-4 last:border-r-0 last:pr-0">Terms & Conditions</Link>
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

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
    <footer className="pt-[50px] lg:pt-[80px] 2xl:pt-[120px] pb-[40px]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10 lg:gap-10 2xl:gap-25"   >
          <div>
          <motion.div className="" initial={{opacity: 0, y: -50}}
          whileInView={{opacity: 1, y: 0}}
          transition={{delay: 0, duration: 0.9}}
          viewport={{once: true, amount: 0.8}}
          >
            <div>
              <h3 className="text-lg text-primary !mb-4 lg:!mb-[35px] lg:mt-4 XL:mt-8  leading-none">Headquarters</h3>
              <p className="max-w-[45ch]">Al Kuthban Building Offices 106 and 107 P.O. Box 213893 Sheikh Zayed Road Dubai, UAE.</p>
           <div className=" mt-3 lg:mt-6" >
                    <div className="flex gap-2 mb-2">
                      <a href="tel:+97143285488" className="flex !mb-0 gap-2"> <span >Tel:</span> +971 4 328 5488 </a>
                      {/* <p className="flex !mb-0 gap-2"> <span >Mob:</span> +971 56 171 3002 </p>  */}
                    </div>
                    <a href="mailto:info@microlightsgroup.ae" className="flex !mb-0 gap-2"> <span >Email:</span> info@microlightsgroup.ae </a>
                  </div>
            </div> 
            <div className="flex space-x-[10px] py-5 lg:mt-5">
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
              

                 
          </motion.div>
            
          </div>
          <motion.div className="" initial={{opacity: 0, y: -50}}
          whileInView={{opacity: 1, y: 0}}
          transition={{delay: 0, duration: 0.9}}
          viewport={{once: true, amount: 0.8}}>
            <div className="md:flex gap-3 justify-between items-center bg-primary px-[20px] py-3 md:py-1 lg:p-3 2xl:px-[35px] 2xl:py-3 mb-6 lg:mb-8">
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
              <motion.div className="flex" initial={{opacity: 0, y: -50}}
          whileInView={{opacity: 1, y: 0}}
          transition={{delay: 0, duration: 0.9}}
          viewport={{once: true, amount: 0.8}}
          > 
            {/* Quick Links */}
            <div className="w-1/2">
              <p className="text-lg text-primary !mb-4 lg:!mb-[35px] leading-none">Quick Links</p>
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
                <li className="transition-all ease-in-out duration-500 group hover:translate-x-1">
                  <Link className="text-xs text-[#7D7D7D] group-hover:text-black" href="/sitemap">Sitemap</Link>
                </li>

              </ul>
            </div>

            {/* Products */}
            <div className="w-1/2">
              <p className="text-lg text-primary !mb-4 lg:!mb-[35px] leading-none">Products</p>
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
           
            {/* sdfv */}
          </motion.div>
        </div>
            <div className="border-t pt-[30px] text-primary/50 text-center mt-6 md:mt-10 text-[14px] flex xl:flex-row flex-col justify-between">
              <div className="flex flex-col lg:flex-row gap-4 items-center lg:justify-between xl:justify-start">
                <p style={{marginBottom: "0px"}}>&copy;2026 Lighting Solutions Dubai - microlights.com. All rights reserved. | <span className="text-primary/35 text-[14px] ">by</span> <a className="text-primary/35 text-[14px] transition-all ease-in-out duration-500 hover:text-black/60" href="https://www.globalsurf.ae/" target="_blank">Global Surf </a> </p>
                <div className="flex space-x-2 items-center  justify-center">
                      <Link href="/privacy-policy" className=" border-r pr-2 last:border-r-0 last:pr-0 transition-all ease-in-out duration-500 hover:text-black">Privacy Policy</Link>
                      <Link href="/terms-and-conditions" className=" border-r pr-4 last:border-r-0 last:pr-0 transition-all ease-in-out duration-500 hover:text-black">Terms & Conditions</Link>
                </div>
              </div>
               <div className="flex space-x-6 mt-4 xl:mt-0 justify-center  ">
              <Image src={'/assets/img/icons/fticons.svg'} width={150} height={30} className="w-[160px] h-[30px] lg:w-[220px] lg:h-[30px]" alt="ftr"/>
              </div>
            </div>

        {/*   <Link href="#" className="text-green-500 text-3xl mt-4 md:mt-0 fixed">
          <BsWhatsapp />
        </Link> */}
      </div>
    </footer>
  );
};

export default Footer;

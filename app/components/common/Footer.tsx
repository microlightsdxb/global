// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { FaLinkedin, FaInstagram, FaFacebookF } from "react-icons/fa";
// import { FiArrowUpRight } from "react-icons/fi";
// import { motion } from "framer-motion";
// import { useStore } from "@/app/store/productType";
// import BrochureDownloadModal from "@/app/components/common/BrochureDownloadModal";

// const Footer = () => {
//   const setType = useStore((state) => state.setType);

//   return (
//     <footer className="pt-[60px] lg:pt-[80px] 2xl:pt-[120px] pb-[40px]">
//       <div className="container">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <motion.div
//             className="flex"
//             initial={{ opacity: 0, y: -50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0, duration: 0.9 }}
//             viewport={{ once: true, amount: 0.8 }}
//           >
//             {/* Quick Links */}
//             <div className="w-1/2">
//               <p className="text-lg text-primary !mb-4 md:!mb-[35px] leading-none">
//                 Quick Links
//               </p>
//               <ul className="text-gray-500 mt-4 space-y-2">
//                 <li className="transition-all ease-in-out duration-500 group hover:translate-x-1">
//                   <Link
//                     className="text-xs text-[#7D7D7D] group-hover:text-black"
//                     href="/about-us"
//                   >
//                     About Microlights
//                   </Link>
//                 </li>
//                 <li className="transition-all ease-in-out duration-500 group hover:translate-x-1">
//                   <Link
//                     className="text-xs text-[#7D7D7D] group-hover:text-black"
//                     href="/sustainability"
//                   >
//                     Sustainability
//                   </Link>
//                 </li>
//                 <li className="transition-all ease-in-out duration-500 group hover:translate-x-1">
//                   <Link
//                     className="text-xs text-[#7D7D7D] group-hover:text-black"
//                     href="/projects"
//                   >
//                     Projects
//                   </Link>
//                 </li>
//                 <li className="transition-all ease-in-out duration-500 group hover:translate-x-1">
//                   <Link
//                     className="text-xs text-[#7D7D7D] group-hover:text-black"
//                     href="/blog"
//                   >
//                     Blog
//                   </Link>
//                 </li>
//                 <li className="transition-all ease-in-out duration-500 group hover:translate-x-1">
//                   <Link
//                     className="text-xs text-[#7D7D7D] group-hover:text-black"
//                     href="/sitemap"
//                   >
//                     Sitemap
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             {/* Products */}
//             <div className="w-1/2">
//               <p className="text-lg text-primary !mb-4 md:!mb-[35px] leading-none">
//                 Products
//               </p>
//               <ul className="text-gray-500 mt-4 space-y-2">
//                 <li
//                   className="transition-all ease-in-out duration-500 group hover:translate-x-1"
//                   onClick={() => {
//                     setType("Indoor");
//                   }}
//                 >
//                   <Link
//                     className="text-xs text-[#7D7D7D] group-hover:text-black"
//                     href="/lighting-products"
//                   >
//                     Indoor Lighting
//                   </Link>
//                 </li>
//                 <li
//                   className="transition-all ease-in-out duration-500 group hover:translate-x-1"
//                   onClick={() => {
//                     setType("Outdoor");
//                   }}
//                 >
//                   <Link
//                     className="text-xs text-[#7D7D7D] group-hover:text-black"
//                     href="/lighting-products"
//                   >
//                     Outdoor Lighting
//                   </Link>
//                 </li>
//                 <li
//                   className="transition-all ease-in-out duration-500 group hover:translate-x-1"
//                   onClick={() => {
//                     setType("Industrial");
//                   }}
//                 >
//                   <Link
//                     className="text-xs text-[#7D7D7D] group-hover:text-black"
//                     href="/lighting-products"
//                   >
//                     Industrial Lighting
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </motion.div>
//           <motion.div
//             className=""
//             initial={{ opacity: 0, y: -50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0, duration: 0.9 }}
//             viewport={{ once: true, amount: 0.8 }}
//           >
//             <div className="md:flex gap-3 justify-between items-center bg-primary p-[20px] lg:p-[25px] 2xl:p-[35px] mb-[30px] lg:mb-[90px]">
//               <span className="text-lg md:text-md xl:text-lg text-white">
//                 Download Brochure
//               </span>
//               <div className="flex mt-4 md:mt-0">
//                 <BrochureDownloadModal brochureUrl="/api/download">
//                   <button
//                     type="button"
//                     className="flex gap-[20px] items-center border-t border-white text-sm text-white border-solid leading-none pt-[12px] transition-colors duration-300 group"
//                   >
//                     <span className="transition-transform duration-300 group-hover:translate-x-1">
//                       Download
//                     </span>
//                     <FiArrowUpRight className="text-[22px] text-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
//                   </button>
//                 </BrochureDownloadModal>
//               </div>
//             </div>

//             <div className="flex flex-col md:flex-row justify-between items-center mt-10 border-b pb-[30px]">
//               <div className="flex space-x-[10px]">
//                 <Link
//                   href="https://www.linkedin.com/company/microlights/"
//                   target="_blank"
//                   className="group hover:-translate-y-1 transition-all ease-in-out duration-500 text-white bg-primary rounded-full text-center flex justify-center items-center w-[40px] h-[40px]"
//                 >
//                   <FaLinkedin
//                     size={18}
//                     className="group-hover:scale-111 transition-all ease-in-out duration-500"
//                   />
//                 </Link>
//                 <Link
//                   href="https://www.instagram.com/microlightsgroup/"
//                   target="_blank"
//                   className="group hover:-translate-y-1 transition-all ease-in-out duration-500 text-white bg-primary rounded-full text-center flex justify-center items-center  w-[40px] h-[40px]"
//                 >
//                   <FaInstagram
//                     size={18}
//                     className="group-hover:scale-111 transition-all ease-in-out duration-500"
//                   />
//                 </Link>
//                 <Link
//                   href="https://www.facebook.com/MicrolightsGroup"
//                   target="_blank"
//                   className="group hover:-translate-y-1 transition-all ease-in-out duration-500 text-white bg-primary rounded-full text-center flex justify-center items-center  w-[40px] h-[40px]"
//                 >
//                   <FaFacebookF
//                     size={18}
//                     className="group-hover:scale-111 transition-all ease-in-out duration-500"
//                   />
//                 </Link>
//               </div>

//               <div className="flex space-x-6 mt-4 md:mt-0">
//                 <Image
//                   src={"/assets/img/icons/fticons.svg"}
//                   width={150}
//                   height={30}
//                   className="w-auto"
//                   alt="ftr"
//                 />
//               </div>
//             </div>
//             <div className="text-primary/50 text-center mt-6 text-[12px] flex xl:flex-row flex-col justify-between">
//               <p style={{ marginBottom: "0px" }}>
//                 &copy;2026 Lighting Solutions Dubai - microlights.com. All
//                 rights reserved. |{" "}
//                 <span className="text-primary/35 text-[11px] ">by</span>{" "}
//                 <a
//                   className="text-primary/35 text-[11px] transition-all ease-in-out duration-500 hover:text-black/60"
//                   href="https://www.globalsurf.ae/"
//                   target="_blank"
//                 >
//                   GS Digital
//                 </a>{" "}
//               </p>
//               <div className="flex space-x-2 items-center mt-3 xl:mt-0 justify-center">
//                 <Link
//                   href="/privacy-policy"
//                   className=" border-r pr-2 last:border-r-0 last:pr-0 transition-all ease-in-out duration-500 hover:text-black"
//                 >
//                   Privacy Policy
//                 </Link>
//                 <Link
//                   href="/terms-and-conditions"
//                   className=" border-r pr-4 last:border-r-0 last:pr-0 transition-all ease-in-out duration-500 hover:text-black"
//                 >
//                   Terms & Conditions
//                 </Link>
//               </div>
//             </div>
//             {/* sdfv */}
//           </motion.div>
//         </div>

//         {/*   <Link href="#" className="text-green-500 text-3xl mt-4 md:mt-0 fixed">
//           <BsWhatsapp />
//         </Link> */}
//       </div>
//     </footer>
//   );
// };

// export default Footer;

"use client";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedin, FaInstagram, FaFacebookF } from "react-icons/fa";
import { motion } from "framer-motion";
import { useStore } from "@/app/store/productType";
import BrochureDownloadModal from "@/app/components/common/BrochureDownloadModal";
import { FiArrowUpRight } from "react-icons/fi";
import { FaPhone, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import useSWR from "swr";
import { useState, useRef, useEffect } from "react";
import ArrowButton from "./ArrowButton";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

const Footer = () => {
  const setType = useStore((state) => state.setType);
  const { data: contactData } = useSWR(`/api/admin/contact`, fetcher);
  const [activeTab, setActiveTab] = useState(0);
  const [col2Left, setCol2Left] = useState(0);

  const regions = contactData?.data || [];
  const firstArea = regions[activeTab]?.area?.[0];

  const containerRef = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);

useEffect(() => {
  const updateLeft = () => {
    if (window.innerWidth < 1024) {
      setCol2Left(0);
      return;
    }
    if (containerRef.current && col2Ref.current) {
      const containerLeft = containerRef.current.getBoundingClientRect().left;
      const col2LeftFromViewport = col2Ref.current.getBoundingClientRect().left;
      setCol2Left(col2LeftFromViewport - containerLeft - 15);
    }
  };
  updateLeft();
  window.addEventListener("resize", updateLeft);
  return () => window.removeEventListener("resize", updateLeft);
}, [contactData]);

  return (
    <footer className="pt-[60px] lg:pt-[80px] 2xl:pt-[120px] pb-[34px]  border-t border-primary">
      <div className="container" ref={containerRef}>
        {/* Main layout */}
        <div className="flex flex-col xl:flex-row justify-between gap-6 md:gap-8 xl:gap-20 2xl:gap-[131px]">
          {/* Col 1 — Logo + desc + socials */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col gap-5 xl:gap-[30px] shrink-0"
          >
            <Image
              src="/assets/img/logo.svg"
              alt="Lighting Solutions Dubai"
              title="Microlights"
              width={220}
              height={58}
            />
            <p className="text-xs text-[#7D7D7D] leading-[1.764] -tracking-[0.01em] max-w-[280px] 2xl:max-w-[390px] !mb-0">
              35 years of innovative lighting solutions across the GCC, Europe
              and Asia. From concept to installation and beyond.
            </p>
            <div className="flex space-x-[8px]">
              <Link
                href="https://www.linkedin.com/company/microlights/"
                target="_blank"
                className="hover:-translate-y-1 transition-all ease-in-out duration-500 text-white bg-primary rounded-full flex justify-center items-center w-[32px] h-[32px] lg:w-[41px] lg:h-[41px]"
              >
                <FaLinkedin size={16} />
              </Link>
              <Link
                href="https://www.facebook.com/MicrolightsGroup"
                target="_blank"
                className="hover:-translate-y-1 transition-all ease-in-out duration-500 text-white bg-primary rounded-full flex justify-center items-center w-[32px] h-[32px] lg:w-[41px] lg:h-[41px]"
              >
                <FaFacebookF size={16} />
              </Link>
              <Link
                href="https://www.instagram.com/microlightsgroup/"
                target="_blank"
                className="hover:-translate-y-1 transition-all ease-in-out duration-500 text-white bg-primary rounded-full flex justify-center items-center w-[32px] h-[32px] lg:w-[41px] lg:h-[41px]"
              >
                <FaInstagram size={16} />
              </Link>
            </div>
          </motion.div>

          {/* Right section — grid cols-2 with 85px gap */}
          <div className="flex flex-wrap xl:flex-nowrap gap-6 md:gap-8 xl:gap-15 2xl:gap-[85px] mt-[15px]">
            {/* Col 2 — Region tabs + first area only */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="min-w-[220px] max-w-[390px]"
            >
              {/* Region tabs */}
              <div className="flex gap-8 2xl:gap-[56.5px] mb-5 xl:mb-[30px]">
                {regions.map((region: { region: string }, i: number) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveTab(i)}
                    className={`relative text-lg cursor-pointer transition-colors duration-300 -tracking-[0.01em] ${
                      activeTab === i ? "text-black" : "text-black/20"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {activeTab === i && (
                        <div className="bg-black w-[7px] h-[7px] rounded-full" />
                      )}
                      {region.region}
                    </div>
                  </button>
                ))}
              </div>

              {/* First area only */}
              {firstArea && (
                <div>
                  <p className="text-25 font-semibold leading-[1.2] text-black mb-[10px]">
                    {firstArea.name}
                  </p>
                  <p className="text-sm leading-[1.666666] font-semibold -tracking-[0.01em] text-[#7D7D7D] mb-[5px]">
                    {firstArea.type}
                  </p>
                  <p className="text-[17px] text-[#7D7D7D] leading-[1.764] -tracking-[0.01em] mb-[10px]">
                    {firstArea.address}
                  </p>
                  <div className="flex flex-col gap-[10px]">
                    <div className="flex flex-col 2xl:flex-row 2xl:items-center gap-2 2xl:gap-[28px]">
                      {firstArea.telephone && (
                        <div className="flex items-center gap-2">
                          <div className="bg-black w-[30px] h-[30px] rounded-full flex items-center justify-center">
                            <Image
                              src="/assets/img/icons/footer/mobile.svg"
                              alt="Tel"
                              width={13}
                              height={19}
                            />
                          </div>
                          <a
                            href={`tel:${firstArea.telephone}`}
                            className="text-xs text-[#7D7D7D] hover:text-black transition-colors duration-300 -tracking-[0.01em]"
                          >
                            {firstArea.telephone}
                          </a>
                        </div>
                      )}

                      {firstArea.mobile && (
                        <div className="flex items-center gap-2">
                          <div className="bg-black w-[30px] h-[30px] rounded-full flex items-center justify-center">
                            <Image
                              src="/assets/img/icons/footer/tel.svg"
                              alt="Mobile"
                              width={18}
                              height={17}
                            />
                          </div>
                          <a
                            href={`tel:${firstArea.mobile}`}
                            className="text-xs text-[#7D7D7D] hover:text-black transition-colors duration-300 -tracking-[0.01em]"
                          >
                            {firstArea.mobile}
                          </a>
                        </div>
                      )}
                    </div>
                    {firstArea.email && (
                      <div className="flex items-center gap-2">
                        <div className="bg-black w-[30px] h-[30px] rounded-full flex items-center justify-center">
                          <Image
                            src="/assets/img/icons/footer/mail.svg"
                            alt="Mail"
                            width={18}
                            height={14}
                          />
                        </div>
                        <a
                          href={`mailto:${firstArea.email}`}
                          className="text-xs text-[#7D7D7D] hover:text-black transition-colors duration-300 -tracking-[0.01em]"
                        >
                          {firstArea.email}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Col 3 — Quick Links */}
            <motion.div
              ref={col2Ref}
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="min-w-[220px]"
            >
              <p className="text-lg leading-[1.333333] text-black -tracking-[0.01em]">
                Quick Links
              </p>
              <ul className="space-y-2.5 mt-6 xl:mt-[30px]">
                {[
                  { label: "About Microlights", href: "/about-us" },
                  { label: "Sustainability", href: "/sustainability" },
                  { label: "Projects", href: "/projects" },
                  { label: "Blog", href: "/blog" },
                  { label: "Contact Us", href: "/contact-us" },
                  { label: "Sitemap", href: "/sitemap" },
                ].map((item) => (
                  <li
                    key={item.href}
                    className="transition-all ease-in-out duration-500 group hover:translate-x-1"
                  >
                    <Link
                      className="text-xs text-[#7D7D7D] group-hover:text-black -tracking-[0.01em]"
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Col 4 — Products */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="min-w-[220px]"
            >
              <p className="text-lg leading-[1.333333] text-black -tracking-[0.01em]">
                Products
              </p>
              <ul className="space-y-2.5 mt-6 xl:mt-[30px]">
                {[
                  { label: "Indoor Lighting", type: "Indoor" },
                  { label: "Outdoor Lighting", type: "Outdoor" },
                  { label: "Industrial Lighting", type: "Industrial" },
                  { label: "Smart Controls", type: "Smart" },
                ].map((item) => (
                  <li
                    key={item.type}
                    className="transition-all ease-in-out duration-500 group hover:translate-x-1"
                    onClick={() => setType(item.type)}
                  >
                    <Link
                      className="text-xs text-[#7D7D7D] group-hover:text-black -tracking-[0.01em]"
                      href="/lighting-products"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Downloads + bottom bar — ml matches col2 left offset */}
        <div style={{ paddingLeft: col2Left }}>
          <div className="mt-6 lg:mt-10 2xl:mt-16 flex flex-col gap-6 xl:gap-[30px] w-fit">
            <p className="text-lg leading-[1.333333] text-black -tracking-[0.01em] !mb-0">
              Downloads
            </p>
            <BrochureDownloadModal brochureUrl="/api/download">
              <ArrowButton download title="Product Brochure" href="" />
            </BrochureDownloadModal>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col xl:flex-row justify-between border-t border-[#00000059] pt-5 mt-6 lg:mt-10 2xl:mt-20">
          <div className="flex flex-col xl:flex-row gap-3 xl:gap-12.5 xl:items-center">
            <p className="text-black/50 text-[13px] leading-[2.4615384615384617] opacity-50 !mb-0">
              &copy;2026 Lighting Solutions Dubai - microlights.com. All rights
              reserved.{" "}
              <span className="text-black/50 text-[13px] leading-[2.4615384615384617]">by</span>{" "}
              <a
                className="text-black/50 text-[13px] leading-[2.4615384615384617] transition-all ease-in-out duration-500 hover:text-black/60"
                href="https://www.globalsurf.ae/"
                target="_blank"
              >
                GS Digital
              </a>
            </p>

            <div className="flex gap-3 opacity-50">
              <Link
                href="/privacy-policy"
                className="text-[13px] leading-[2.4615384615384617] text-black/50  transition-all ease-in-out duration-500 hover:text-black"
              >
                Privacy Policy
              </Link>
              <span className="text-[#7D7D7D]/60 text-[18px]">|</span>
              <Link
                href="/terms-and-conditions"
                className="text-[13px] leading-[2.4615384615384617] text-black/50 transition-all ease-in-out duration-500 hover:text-black"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>

          <div className="mt-5 xl:mt-0">
              <Image
                src={"/assets/img/icons/fticons.svg"}
                width={220}
                height={30}
                className="w-auto h-[30px]"
                alt="certifications"
              />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

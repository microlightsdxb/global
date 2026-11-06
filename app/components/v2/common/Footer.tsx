"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useStore } from "@/app/store/productType";
import BrochureDownloadModal from "@/app/components/common/BrochureDownloadModal";
import BoxButton from "./BoxButton";
import Reveal, { REVEAL_STAGGER } from "./Reveal";
import { footerData } from "./footerData";

const ContactLink = ({ href, label, icon }: { href: string; label: string; icon: string }) => (
  <a href={href} className="flex items-center gap-[8px] text-footer text-[#7D7D7D] transition-colors duration-300 hover:text-black">
    <span className="flex items-center justify-center w-[30px] h-[30px] shrink-0 rounded-full bg-black">
      <Image src={icon} alt="" width={20} height={20} unoptimized className="block w-[20px] h-[20px] max-w-none pointer-events-none" />
    </span>
    {label}
  </a>
);

const linkClass = "block w-fit text-footer leading-[2.05882353] text-[#7D7D7D] transition-[color,translate] duration-300 ease-out hover:text-black hover:translate-x-[3px]";

const Footer = () => {
  const setType = useStore((state) => state.setType);
  const { contacts } = footerData;

  return (
    <footer className="bg-white pt-[clamp(68px,calc(135*100vw/1920),135px)] pb-[42px]">
      <div className="container">
        <div className="grid grid-cols-1 gap-[40px] sm:grid-cols-2 xl:flex xl:gap-0">
          {/* Brand */}
          <Reveal className="xl:flex-1 xl:min-w-0">
            <Link href="/" aria-label="Microlights home">
              <Image src="/assets/img/logo.svg" alt="Lighting Solutions Dubai" title="Microlights" width={220} height={58} className="pointer-events-none w-[clamp(160px,calc(160px+(100vw-375px)*60/1545),220px)] h-auto" />
            </Link>
            <p className="mt-[30px] max-w-[360px] text-footer text-[#7D7D7D] !mb-0">{footerData.description}</p>

            <div className="mt-[42px] flex flex-col gap-[13px]">
              <div className="flex flex-wrap gap-x-[28px] gap-y-[13px]">
                <ContactLink href={contacts.phone.href} label={contacts.phone.label} icon="/assets/img/icons/footer/contact/phone.svg" />
                <ContactLink href={contacts.mobile.href} label={contacts.mobile.label} icon="/assets/img/icons/footer/contact/phone2.svg" />
              </div>
              <ContactLink href={contacts.email.href} label={contacts.email.label} icon="/assets/img/icons/footer/contact/mail.svg" />
            </div>
          </Reveal>

          {/* Quick Links */}
          <Reveal delay={REVEAL_STAGGER} className="xl:w-[220px] xl:shrink-0">
            <p className="text-subtitle-2 text-black !mb-0">Quick Links</p>
            <ul className="mt-[30px]">
              {footerData.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Products */}
          <Reveal delay={REVEAL_STAGGER * 2} className="xl:w-[220px] xl:shrink-0 xl:ml-[30px]">
            <p className="text-subtitle-2 text-black !mb-0">Products</p>
            <ul className="mt-[30px]">
              {footerData.products.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} onClick={() => setType(link.type)} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Socials & brochure */}
          <Reveal delay={REVEAL_STAGGER * 3} className="flex flex-col justify-between gap-[40px] xl:w-[clamp(360px,calc(521*100vw/1920),521px)] xl:shrink-0 xl:ml-[20px]">
            <BrochureDownloadModal brochureUrl="/api/download">
              <BoxButton
                label="Download Brochure"
                tone="dark"
                icon={<Image src="/assets/img/icons/download.svg" alt="" width={40} height={40} unoptimized className="block w-[40px] h-[40px] max-w-none shrink-0 pointer-events-none transition-[filter] duration-300 group-hover:brightness-0" />}
                fullWidth
                size="large"
              />
            </BrochureDownloadModal>

            <div className="flex gap-[8px] xl:justify-end">
              {footerData.socials.map((social) => {
                const isPlaceholder = social.href === "#";
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    {...(isPlaceholder ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                    aria-label={social.label}
                    className="group flex items-center justify-center w-[41px] h-[41px] rounded-full bg-black transition-transform duration-300 ease-out hover:-translate-y-[4px]"
                  >
                    <Image
                      src={social.icon}
                      alt=""
                      width={15}
                      height={15}
                      unoptimized
                      className="h-[15px] w-auto transition-transform duration-300 ease-out group-hover:scale-110 pointer-events-none"
                    />
                  </a>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* Bottom bar */}
        <Reveal className="mt-[clamp(52px,calc(105*100vw/1920),105px)] border-t border-black/35 pt-[34px] flex flex-col gap-[20px] xl:flex-row xl:items-center xl:gap-0">
          <p className="text-[13px] leading-[2.46153846] tracking-normal text-black/50 opacity-50 !mb-0">
            {footerData.copyright} |{" "}
            <a href="https://www.globalsurf.ae/" target="_blank" rel="noopener noreferrer" className="transition-colors duration-300 hover:text-black/60">
              by GS Digital
            </a>
          </p>

          <div className="flex items-center text-[13px] leading-[2.46153846] tracking-normal text-black/50 opacity-50 xl:ml-[166px]">
            {footerData.legal.map((link, index) => (
              <React.Fragment key={link.label}>
                {index > 0 && <span className="mx-[10px]">|</span>}
                <Link href={link.href} className="transition-colors duration-300 hover:text-black">
                  {link.label}
                </Link>
              </React.Fragment>
            ))}
          </div>

          {/* Certifications */}
          <Image src="/assets/img/icons/fticons.svg" alt="CE, RoHS and CB certified" width={220} height={30} unoptimized className="xl:ml-auto h-[30px] w-auto pointer-events-none" />
        </Reveal>
      </div>
    </footer>
  );
};

export default Footer;

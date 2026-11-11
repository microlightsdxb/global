import Image from "next/image";
import React from "react";
import { footerData } from "./footerData";
// bg-[#7D7D7DB2]
const buttonClass =
  "flex items-center justify-center w-[clamp(42px,calc(50*100vw/1920),50px)] h-[clamp(42px,calc(50*100vw/1920),50px)] rounded-full bg-[#2E7D32] backdrop-blur-[30px] transition-transform duration-300 ease-out hover:-translate-y-[3px]";

const FloatingContact = () => {
  const { phone, whatsapp } = footerData.floating;

  return (
    <div className="fixed right-[clamp(16px,calc(50*100vw/1920),50px)] bottom-[clamp(80px,calc(150*100vw/1920),150px)] z-40 flex flex-col gap-[clamp(10px,calc(15*100vw/1920),15px)]">
      <a href={phone.href} aria-label={phone.label} className={buttonClass}>
        <Image
          src="/assets/img/icons/floating/phone.svg"
          alt=""
          width={27}
          height={27}
          unoptimized
          className="pointer-events-none w-[clamp(23px,calc(27*100vw/1920),27px)] h-[clamp(23px,calc(27*100vw/1920),27px)]"
        />
      </a>
      <a href={whatsapp.href} target="_blank" rel="noopener noreferrer" aria-label={whatsapp.label} className={buttonClass}>
        <Image
          src="/assets/img/icons/floating/whatsapp.svg"
          alt=""
          width={27}
          height={27}
          unoptimized
          className="pointer-events-none w-[clamp(23px,calc(27*100vw/1920),27px)] h-[clamp(23px,calc(27*100vw/1920),27px)]"
        />
      </a>
    </div>
  );
};

export default FloatingContact;

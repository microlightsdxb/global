import Image from "next/image";
import React from "react";
import { footerData } from "./footerData";

const buttonClass =
  "flex items-center justify-center w-[50px] h-[50px] rounded-full bg-[#7D7D7DB2] backdrop-blur-[30px] transition-transform duration-300 ease-out hover:-translate-y-[3px]";

const FloatingContact = () => {
  const { phone, whatsapp } = footerData.floating;

  return (
    <div className="fixed right-[50px] bottom-[150px] z-40 flex flex-col gap-[15px]">
      <a href={phone.href} aria-label={phone.label} className={buttonClass}>
        <Image
          src="/assets/img/icons/floating/phone.svg"
          alt=""
          width={27}
          height={27}
          unoptimized
          className="pointer-events-none w-[27px] h-[27px]"
        />
      </a>
      <a href={whatsapp.href} target="_blank" rel="noopener noreferrer" aria-label={whatsapp.label} className={buttonClass}>
        <Image
          src="/assets/img/icons/floating/whatsapp.svg"
          alt=""
          width={27}
          height={27}
          unoptimized
          className="pointer-events-none w-[27px] h-[27px]"
        />
      </a>
    </div>
  );
};

export default FloatingContact;

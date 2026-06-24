import Image from "next/image";
import React from "react";

const FloatingIcons = () => {
  return (
    <div className="fixed bottom-7 md:bottom-10 lg:bottom-[100px] 2xl:bottom-[150px] right-4 lg:right-[56px] z-50 flex flex-col gap-2 md:gap-[15px]">
      <div className="w-[35px] h-[35px] xl:w-[50px] xl:h-[50px] rounded-full bg-[#7D7D7DB2] backdrop-blur-[30px] flex items-center justify-center cursor-pointer group">
        <Image
          src="/assets/img/icons/phone.svg"
          alt="Call"
          width={27}
          height={27}
          className="group-hover:scale-110 transition-all duration-300 w-[20px] h-[20px] xl:w-[27px] xl:h-[27px]"
        />
      </div>
      <div className="w-[35px] h-[35px] xl:w-[50px] xl:h-[50px] rounded-full bg-[#7D7D7DB2] backdrop-blur-[30px] flex items-center justify-center cursor-pointer group">
        <Image
          src="/assets/img/icons/whatsapp.svg"
          alt="WhatsApp"
          width={27}
          height={27}
          className="group-hover:scale-110 transition-all duration-300 w-[20px] h-[20px] xl:w-[27px] xl:h-[27px]"
        />
      </div>
    </div>
  );
};

export default FloatingIcons;

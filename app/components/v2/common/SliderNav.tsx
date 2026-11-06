import Image from "next/image";
import React from "react";

const Chevron = ({ flip = false }: { flip?: boolean }) => (
  <Image
    src="/assets/img/icons/nav_btn_tip_right.svg"
    alt=""
    width={20}
    height={20}
    unoptimized
    className={`pointer-events-none block w-[clamp(16px,1.042vw,20px)] h-[clamp(16px,1.042vw,20px)] max-w-none ${flip ? "rotate-180" : ""}`}
  />
);

export type SliderNavProps = {
  onPrev: () => void;
  onNext: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
  className?: string;
};

const SliderNav = ({ onPrev, onNext, prevDisabled = false, nextDisabled = false, className = "" }: SliderNavProps) => {
  const button =
    "flex items-center justify-center w-[clamp(40px,2.604vw,50px)] h-[clamp(40px,2.604vw,50px)] cursor-pointer disabled:cursor-not-allowed";

  return (
    <div className={`flex ${className}`}>
      <button type="button" aria-label="Previous" onClick={onPrev} disabled={prevDisabled} className={`${button} bg-[#949494]`}>
        <Chevron flip />
      </button>
      <button type="button" aria-label="Next" onClick={onNext} disabled={nextDisabled} className={`${button} bg-[#7D7D7D]`}>
        <Chevron />
      </button>
    </div>
  );
};

export default SliderNav;

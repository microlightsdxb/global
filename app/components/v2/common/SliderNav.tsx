import Image from "next/image";
import React from "react";

// public/assets/img/icons/nav_btn_tip_right.svg — 20×20 at 1920, flipped for "prev".
const Chevron = ({ flip = false }: { flip?: boolean }) => (
  <Image
    src="/assets/img/icons/nav_btn_tip_right.svg"
    alt=""
    width={20}
    height={20}
    unoptimized // SVG — skip the image optimizer, which rejects SVGs
    className={`block w-[clamp(16px,1.042vw,20px)] h-[clamp(16px,1.042vw,20px)] max-w-none ${flip ? "rotate-180" : ""}`}
  />
);

export type SliderNavProps = {
  onPrev: () => void;
  onNext: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
  className?: string;
};

/**
 * v2 slider prev/next pair — two joined 50×50 (at 1920) squares: prev #949494, next #7D7D7D.
 * Disabled only changes the cursor; colours stay the same.
 * Library-agnostic: wire onPrev/onNext to Swiper (or anything else).
 */
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

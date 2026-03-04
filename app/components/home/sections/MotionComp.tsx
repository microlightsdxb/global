 "use client";
 
import dynamic from "next/dynamic";

export const Motiondiv = dynamic(() =>
  import("framer-motion").then(m => m.motion.div),
  { ssr: false }
);

export const MotionH1 = dynamic(() =>
  import("framer-motion").then(m => m.motion.h1),
  { ssr: false }
);

export const MotionP = dynamic(() =>
  import("framer-motion").then(m => m.motion.p),
  { ssr: false }
);
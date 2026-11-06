"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  /** Seconds before this item starts — use `index * STAGGER` for mapped items */
  delay?: number;
  /** Distance it rises, in px */
  y?: number;
  className?: string;
  as?: "div" | "li" | "span";
};

export const REVEAL_STAGGER = 0.1;

const EASE = [0.22, 1, 0.36, 1] as const;

// Small, soft rise-and-fade the first time the element scrolls into view
const Reveal = ({ children, delay = 0, y = 24, className, as = "div" }: RevealProps) => {
  const reduceMotion = useReducedMotion();
  const Tag = motion[as];

  if (reduceMotion) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
};

export default Reveal;

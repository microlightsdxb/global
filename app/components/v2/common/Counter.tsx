"use client";

import React, { useEffect, useRef, useState } from "react";

type CounterProps = {
  /** Full display string, e.g. "25+", "1000's", "$1,200 saved". The first number counts up; the rest stays as is. */
  value: string;
  /** Animation length in ms */
  duration?: number;
  /** Count up this many steps to the target (starts at target − range, never below 0) */
  range?: number;
  className?: string;
};

const NUMBER_PATTERN = /\d[\d,]*(?:\.\d+)?/;

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

const Counter = ({ value, duration = 2000, range = 20, className = "" }: CounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(NUMBER_PATTERN);

  const raw = match?.[0] ?? "";
  const target = match ? parseFloat(raw.replace(/,/g, "")) : 0;
  const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
  const useGrouping = raw.includes(",");
  const prefix = match ? value.slice(0, match.index) : value;
  const suffix = match ? value.slice((match.index ?? 0) + raw.length) : "";
  const from = Math.max(0, target - range);

  // null = show the final value (server render, no JS, reduced motion)
  const [current, setCurrent] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setCurrent(from);
    let frame = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setCurrent(from + (target - from) * easeOutExpo(progress));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, from, duration]);

  const format = (n: number) =>
    n.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping,
    });

  if (!match) return <span className={className}>{value}</span>;

  const display = current === null ? raw : format(current);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {/* Final value reserves the width so the layout doesn't shift while counting */}
      <span className="relative inline-block">
        <span className="invisible" aria-hidden>
          {raw}
        </span>
        <span className="absolute inset-0" aria-hidden>
          {display}
        </span>
        <span className="sr-only">{raw}</span>
      </span>
      {suffix}
    </span>
  );
};

export default Counter;

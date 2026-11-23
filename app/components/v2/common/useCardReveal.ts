"use client";

import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";

/**
 * Card entrance (ported from unity-excellence News): cards rise in one after another with a slight
 * tilt, the image wipes up while zooming out, then the text follows.
 *
 * Mark up inside the list element:
 *   data-reveal="card"     – each card
 *   data-reveal="media"    – image frame; needs [clip-path:inset(var(--clip,0%)_0_0_0)]
 *   data-reveal="zoom"     – absolute wrapper around the image(s)
 *   data-reveal="content"  – text blocks that follow
 */
export const MEDIA_CLIP = "[clip-path:inset(var(--clip,0%)_0_0_0)]";

const useCardReveal = (listRef: RefObject<HTMLElement | null>) => {
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-reveal="card"]');
      if (!cards.length) return;

      gsap.set(cards, { y: 120, rotate: 3, opacity: 0, transformOrigin: "0% 100%" });
      gsap.set('[data-reveal="media"]', { "--clip": "100%" });
      gsap.set('[data-reveal="zoom"]', { scale: 1.35 });
      gsap.set('[data-reveal="content"]', { y: 30, opacity: 0 });

      const tl = gsap.timeline({ paused: true });
      cards.forEach((card, i) => {
        const at = i * 0.14;
        tl.to(card, { y: 0, rotate: 0, opacity: 1, duration: 1.2, ease: "power4.out", clearProps: "transform,opacity" }, at);

        const media = card.querySelector('[data-reveal="media"]');
        if (media) tl.to(media, { "--clip": "0%", duration: 1.2, ease: "power4.inOut", clearProps: "--clip" }, at);

        const zoom = card.querySelector('[data-reveal="zoom"]');
        if (zoom) tl.to(zoom, { scale: 1, duration: 1.6, ease: "power3.out", clearProps: "transform" }, at);

        const content = card.querySelectorAll('[data-reveal="content"]');
        if (content.length) {
          tl.to(
            content,
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1, clearProps: "transform,opacity" },
            at + 0.45
          );
        }
      });

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          tl.play();
        },
        { threshold: 0.1 }
      );
      observer.observe(list);
      return () => observer.disconnect();
    }, list);

    return () => ctx.revert();
  }, [listRef]);
};

export default useCardReveal;

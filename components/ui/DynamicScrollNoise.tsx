"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";

export function DynamicScrollNoise() {
  const noiseRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isTouchDevice = !window.matchMedia("(pointer: fine)").matches;

    // Mobile / Reduced Motion fallback: static low opacity without scroll listener
    if (shouldReduceMotion || isTouchDevice) {
      if (noiseRef.current) {
        noiseRef.current.style.opacity = "0.035";
      }
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const overlay = noiseRef.current;
    if (!overlay) return;

    // GSAP ScrollTrigger scrubbing opacity from 0.02 at top to 0.07 at footer
    const animation = gsap.fromTo(
      overlay,
      { opacity: 0.02 },
      {
        opacity: 0.07,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.2,
          invalidateOnRefresh: true,
        },
      }
    );

    return () => {
      animation.kill();
      if (animation.scrollTrigger) animation.scrollTrigger.kill();
    };
  }, [shouldReduceMotion]);

  return (
    <div
      ref={noiseRef}
      className="fixed inset-0 pointer-events-none z-30 noise-overlay transition-opacity duration-300"
      style={{ opacity: 0.02 }}
      aria-hidden="true"
    />
  );
}

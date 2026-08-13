"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";

export function ScrollCircuitThread() {
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion || typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const path = pathRef.current;
    if (!path) return;

    // Calculate total SVG path length
    const pathLength = path.getTotalLength();

    // Set initial dasharray and offset
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // Create GSAP ScrollTrigger timeline to scrub stroke-dashoffset across page scroll
    const animation = gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
        invalidateOnRefresh: true,
      },
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      animation.kill();
      if (animation.scrollTrigger) animation.scrollTrigger.kill();
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-y-0 left-3 md:left-8 w-6 pointer-events-none z-30 hidden sm:block opacity-40 mix-blend-screen"
      aria-hidden="true"
    >
      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 24 1000">
        <path
          ref={pathRef}
          d="M 12 0 V 200 L 20 220 V 400 L 4 420 V 600 L 18 620 V 800 L 12 820 V 1000"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

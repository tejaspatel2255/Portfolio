"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Raw position coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for outer follower ring
  const springConfig = { damping: 28, stiffness: 320, mass: 0.3 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (typeof window === "undefined" || shouldReduceMotion) return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    setMounted(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor-label], [data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        const label = cursorTarget.getAttribute("data-cursor-label") || cursorTarget.getAttribute("data-cursor");
        setCursorText(label);
        setIsHovered(true);
        return;
      } else {
        setCursorText(null);
      }

      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("interactive");

      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible, shouldReduceMotion]);

  if (!mounted || shouldReduceMotion || !isVisible) return null;

  const hasLabel = !!cursorText;

  return (
    <>
      {/* Outer Follower Ring / AI System Readout Badge */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center overflow-hidden border border-accent rounded-none shadow-[0_0_12px_rgba(204,255,0,0.2)]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: hasLabel ? "auto" : 28,
          height: hasLabel ? 26 : 28,
          paddingLeft: hasLabel ? 10 : 0,
          paddingRight: hasLabel ? 10 : 0,
          backgroundColor: isHovered ? "var(--color-accent)" : "rgba(14, 14, 16, 0.85)",
          backdropFilter: "blur(4px)",
        }}
        animate={{
          scale: isClicking ? 0.88 : isHovered ? 1.15 : 1,
        }}
        transition={{ type: "spring", stiffness: 450, damping: 25 }}
      >
        {hasLabel ? (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-mono text-[9px] font-bold uppercase tracking-widest text-accent-foreground select-none text-center whitespace-nowrap"
          >
            {cursorText}
          </motion.span>
        ) : (
          <span className="font-mono text-[7px] text-accent/80 font-semibold uppercase tracking-tighter select-none">
            {coords.x},{coords.y}
          </span>
        )}
      </motion.div>

      {/* Inner Pinpoint Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-none bg-accent pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          scale: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
}

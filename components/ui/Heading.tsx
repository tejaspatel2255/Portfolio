"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "display" | "h1" | "h2" | "h3" | "h4" | "body-lg";
  animate?: "words" | "chars" | "fade-up" | "none";
  titleText?: string;
  delay?: number;
}

export function Heading({
  tag = "h2",
  size = "h2",
  animate = "fade-up",
  titleText,
  delay = 0,
  children,
  className,
  ...props
}: HeadingProps) {
  const Component = tag;
  const shouldReduceMotion = useReducedMotion();
  const activeAnimation = shouldReduceMotion ? "none" : animate;

  const sizeStyles = {
    display: "text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tighter leading-[0.9] font-display uppercase",
    h1: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[0.95] font-display uppercase",
    h2: "text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.0] font-display uppercase",
    h3: "text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-[1.1] font-display uppercase",
    h4: "text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight leading-[1.2] font-display uppercase",
    "body-lg": "text-lg sm:text-xl md:text-2xl font-semibold font-body",
  };

  // Staggered letters animation
  if (activeAnimation === "chars" && titleText) {
    const words = titleText.split(" ");
    const container = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.015, delayChildren: delay },
      },
    } as const;
    const child = {
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          damping: 15,
          stiffness: 120,
        },
      },
      hidden: {
        opacity: 0,
        y: 15,
        transition: {
          type: "spring",
          damping: 15,
          stiffness: 120,
        },
      },
    } as const;

    return (
      <Component className={cn(sizeStyles[size], className)} {...props}>
        <motion.span
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="inline-block max-w-full"
        >
          {words.map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block whitespace-nowrap">
              {Array.from(word).map((letter, letterIndex) => (
                <motion.span
                  variants={child}
                  key={letterIndex}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
              {wordIndex < words.length - 1 && (
                <span className="inline-block">&nbsp;</span>
              )}
            </span>
          ))}
        </motion.span>
      </Component>
    );
  }

  // Staggered words animation with editorial split-line reveal
  if (activeAnimation === "words" && titleText) {
    const words = titleText.split(" ");
    const container = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.04, delayChildren: delay },
      },
    } as const;
    const child = {
      visible: {
        opacity: 1,
        y: 0,
        rotate: 0,
        transition: {
          type: "spring",
          damping: 16,
          stiffness: 120,
        },
      },
      hidden: {
        opacity: 0,
        y: 32,
        rotate: 2.5,
        transition: {
          type: "spring",
          damping: 16,
          stiffness: 120,
        },
      },
    } as const;

    return (
      <Component className={cn(sizeStyles[size], className)} {...props}>
        <motion.span
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="inline-flex flex-wrap"
        >
          {words.map((word, index) => (
            <span key={index} className="inline-block overflow-hidden mr-[0.25em] py-1">
              <motion.span variants={child} className="inline-block transform-gpu">
                {word}
              </motion.span>
            </span>
          ))}
        </motion.span>
      </Component>
    );
  }

  // standard fade-up
  if (activeAnimation === "fade-up") {
    return (
      <Component className={cn(sizeStyles[size], className)} {...props}>
        <motion.span
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block w-full"
        >
          {children || titleText}
        </motion.span>
      </Component>
    );
  }

  // no animation
  return (
    <Component className={cn(sizeStyles[size], className)} {...props}>
      {children || titleText}
    </Component>
  );
}

"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
  borderTop?: boolean;
  borderBottom?: boolean;
}

export function SectionWrapper({
  children,
  id,
  className,
  containerClassName,
  animate = true,
  borderTop = false,
  borderBottom = false,
  ...props
}: SectionWrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  const content = animate && !shouldReduceMotion ? (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn("w-full mx-auto max-w-7xl px-6 md:px-12 lg:px-16 z-10 relative", containerClassName)}
    >
      {children}
    </motion.div>
  ) : (
    <div className={cn("w-full mx-auto max-w-7xl px-6 md:px-12 lg:px-16 z-10 relative", containerClassName)}>
      {children}
    </div>
  );

  return (
    <section
      id={id}
      className={cn(
        "relative py-20 md:py-32 overflow-hidden w-full",
        borderTop && "border-t border-border-subtle",
        borderBottom && "border-b border-border-subtle",
        className
      )}
      {...props}
    >
      {/* Decorative Editorial Grid lines */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6 md:px-12 lg:px-16 pointer-events-none flex justify-between z-0">
        <div className="w-px h-full bg-border-subtle/10" />
        <div className="w-px h-full bg-border-subtle/10 hidden md:block" />
        <div className="w-px h-full bg-border-subtle/10 hidden lg:block" />
        <div className="w-px h-full bg-border-subtle/10" />
      </div>

      {content}
    </section>
  );
}

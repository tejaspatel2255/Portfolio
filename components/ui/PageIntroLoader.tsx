"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export function PageIntroLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Skip loader if reduced motion is active or session has already seen intro
    if (shouldReduceMotion || sessionStorage.getItem("hasSeenIntro")) {
      setIsLoading(false);
      return;
    }

    // Fast counter sequence from 00 to 100%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem("hasSeenIntro", "true");
          }, 200);
          return 100;
        }
        return prev + 20;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  if (!isLoading || shouldReduceMotion) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[99999] bg-background border-b-2 border-accent flex flex-col justify-between p-8 md:p-16 select-none font-mono"
        >
          {/* Top Header metadata */}
          <div className="flex justify-between items-center text-xs text-ink-muted">
            <span className="text-accent uppercase tracking-widest">// INITIALIZING SYSTEM</span>
            <span>LOC // SURAT, IN</span>
          </div>

          {/* Center Brand Name & Counter */}
          <div className="flex flex-col gap-4 items-center justify-center">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase text-ink-primary tracking-tighter text-center"
            >
              TEJAS PATEL
            </motion.h1>
            <div className="flex items-center gap-3 text-sm text-ink-muted">
              <span>SYSTEM_READY</span>
              <span className="text-accent font-bold">{progress.toString().padStart(3, "0")}%</span>
            </div>
          </div>

          {/* Bottom Grid Line & Footer */}
          <div className="flex justify-between items-center text-[10px] text-ink-muted border-t border-border-subtle pt-4">
            <span>FULL-STACK &amp; AI ARCHITECT</span>
            <span>2026 // EDITION</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

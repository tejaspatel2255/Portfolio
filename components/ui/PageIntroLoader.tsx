"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export function PageIntroLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const shouldReduceMotion = useReducedMotion();

  const handleSkip = useCallback(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("hasSeenIntro", "true");
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion || (typeof window !== "undefined" && sessionStorage.getItem("hasSeenIntro"))) {
      setIsLoading(false);
      return;
    }

    const linesSequence = [
      "> initializing_profile...",
      "> loading_ai_systems...",
      "> system_ready [100%]",
    ];

    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < linesSequence.length) {
        const nextLine = linesSequence[currentIdx];
        setBootLines((prev) => [...prev, nextLine]);
        currentIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          handleSkip();
        }, 300);
      }
    }, 280);

    // Global skip listeners: click, tap, scroll, or keydown instantly skips intro
    const handleGlobalSkip = () => handleSkip();
    window.addEventListener("click", handleGlobalSkip, { once: true });
    window.addEventListener("keydown", handleGlobalSkip, { once: true });
    window.addEventListener("wheel", handleGlobalSkip, { once: true });
    window.addEventListener("touchstart", handleGlobalSkip, { once: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener("click", handleGlobalSkip);
      window.removeEventListener("keydown", handleGlobalSkip);
      window.removeEventListener("wheel", handleGlobalSkip);
      window.removeEventListener("touchstart", handleGlobalSkip);
    };
  }, [shouldReduceMotion, handleSkip]);

  if (!isLoading || shouldReduceMotion) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } }}
          onClick={handleSkip}
          className="fixed inset-0 z-[99999] bg-background border-b-2 border-accent flex flex-col justify-between p-8 md:p-16 select-none font-mono cursor-pointer"
        >
          {/* Top Header metadata */}
          <div className="flex justify-between items-center text-xs text-ink-muted">
            <span className="text-accent uppercase tracking-widest">// SYSTEM BOOT SEQUENCE</span>
            <span className="hidden sm:inline">CLICK OR TAP TO SKIP [ESC]</span>
            <span>LOC // NADIAD, IN</span>
          </div>

          {/* Center Brand Name & System Boot Terminal */}
          <div className="flex flex-col gap-6 items-center justify-center my-auto">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase text-ink-primary tracking-tighter text-center"
            >
              TEJAS PATEL
            </motion.h1>

            {/* Terminal Boot Log */}
            <div className="border border-border-strong bg-surface/40 p-4 sm:p-6 w-full max-w-md flex flex-col gap-2 font-mono text-xs text-ink-secondary">
              {bootLines.map((line, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className={idx === bootLines.length - 1 ? "text-accent font-bold" : "text-ink-muted"}>
                    {line}
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-1 text-accent">
                <span>&gt;</span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                  className="w-2 h-4 bg-accent inline-block"
                />
              </div>
            </div>
          </div>

          {/* Bottom Grid Line & Footer */}
          <div className="flex justify-between items-center text-[10px] text-ink-muted border-t border-border-subtle pt-4">
            <span>FULL-STACK &amp; AI SYSTEMS ENGINEER</span>
            <span className="text-accent">CLICK / TAP TO ENTER</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

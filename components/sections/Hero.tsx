"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { InteractiveCanvas } from "@/components/ui/InteractiveCanvas";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { WhatsappIcon } from "@/components/ui/Icons";
import { ArrowDown, Eye } from "lucide-react";

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (infoRef.current) {
        gsap.to(infoRef.current, {
          y: -35,
          opacity: 0.88,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 130,
        damping: 18,
      },
    },
  } as const;

  return (
    <section ref={sectionRef} className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden border-b border-border-subtle bg-background">
      {/* Interactive Centerpiece Canvas Background */}
      <InteractiveCanvas />

      {/* Structured Editorial Grid lines */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6 md:px-12 lg:px-16 pointer-events-none flex justify-between z-0">
        <div className="w-px h-full bg-border-subtle/10" />
        <div className="w-px h-full bg-border-subtle/10 hidden md:block" />
        <div className="w-px h-full bg-border-subtle/10 hidden lg:block" />
        <div className="w-px h-full bg-border-subtle/10" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 z-10 relative mt-4 sm:mt-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full"
        >
          {/* Main Info Column */}
          <div ref={infoRef} className="flex flex-col justify-center gap-6 max-w-4xl">
            
            {/* Availability Badge */}
            <motion.div 
              variants={itemVariants} 
              data-cursor="HIRE ME"
              className="inline-flex items-center gap-2 px-3 py-1.5 border border-border-subtle bg-surface/40 text-accent font-mono text-[10px] uppercase tracking-widest self-start backdrop-blur-sm cursor-none"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
              AVAILABLE FOR ROLES &amp; CONTRACTS // INDIA
            </motion.div>

            {/* Giant Title */}
            <motion.div variants={itemVariants} className="flex flex-col select-none">
              <Heading
                tag="h1"
                size="display"
                animate="chars"
                titleText="TEJAS"
                className="text-ink-primary font-black block leading-none"
              />
              <Heading
                tag="span"
                size="display"
                animate="chars"
                titleText="PATEL"
                delay={0.08}
                className="text-ink-primary font-black block leading-none"
              />
            </motion.div>

            {/* Positioning Statement */}
            <motion.div variants={itemVariants}>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold uppercase tracking-tight text-ink-secondary leading-snug">
                Building <span className="text-ink-primary border-b border-border-strong pb-0.5">Full-Stack Products</span> &amp; <span className="text-accent">Applied AI Systems</span>
              </h2>
            </motion.div>

            {/* Bullet Paragraph */}
            <motion.div variants={itemVariants}>
              <p className="text-base sm:text-lg text-ink-muted max-w-2xl leading-relaxed font-light">
                I engineer end-to-end web applications (TypeScript, Next.js, Node) and construct custom agentic AI systems (Python, LLM graphs). Focused on building software that solves user needs with performance and intelligence.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-2">
              <a href="#work" data-cursor="EXPLORE" className="inline-block cursor-none">
                <Button variant="brutalist">
                  View My Work <Eye className="w-4 h-4 ml-1.5 inline-block" />
                </Button>
              </a>
              <WhatsAppButton variant="secondary">
                Chat on WhatsApp <WhatsappIcon className="w-3.5 h-3.5 ml-1.5 inline-block" />
              </WhatsAppButton>
              <a href="/resume.pdf" download="Tejas_Patel_Resume.pdf" data-cursor="CV" className="inline-block cursor-none">
                <Button variant="ghost">
                  Download CV <ArrowDown className="w-4 h-4 ml-1 inline-block" />
                </Button>
              </a>
            </motion.div>

            {/* Sub-meta details */}
            <motion.div variants={itemVariants} className="flex gap-8 items-center text-[10px] font-mono text-ink-muted border-t border-border-subtle pt-6 mt-4">
              <span>LOC // SURAT, INDIA</span>
              <span>EST. 2026</span>
              <span className="text-accent">// SOFTWARE &amp; AI ENGINEER</span>
            </motion.div>

          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute -bottom-8 left-6 md:left-12 lg:left-16 flex items-center gap-2 font-mono text-[9px] text-ink-muted uppercase tracking-widest select-none pointer-events-none">
          <ArrowDown className="w-3 h-3 text-accent animate-bounce" />
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}

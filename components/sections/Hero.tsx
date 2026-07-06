"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { InteractiveCanvas } from "@/components/ui/InteractiveCanvas";
import { ArrowDown, ArrowUpRight, Code, Database, Eye } from "lucide-react";

export function Hero() {
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
    <section className="relative min-h-[95vh] flex items-center justify-center pt-24 pb-12 overflow-hidden border-b border-border-subtle bg-background">
      {/* Interactive Centerpiece Canvas Background */}
      <InteractiveCanvas />

      {/* Structured Editorial Grid lines */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6 md:px-12 lg:px-16 pointer-events-none flex justify-between z-0">
        <div className="w-px h-full bg-border-subtle/10" />
        <div className="w-px h-full bg-border-subtle/10 hidden md:block" />
        <div className="w-px h-full bg-border-subtle/10 hidden lg:block" />
        <div className="w-px h-full bg-border-subtle/10" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 z-10 relative mt-8 sm:mt-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12"
        >
          {/* Main Info Column */}
          <div className="lg:col-span-8 flex flex-col justify-center gap-6">
            
            {/* Availability Badge */}
            <motion.div 
              variants={itemVariants} 
              className="inline-flex items-center gap-2 px-3 py-1.5 border border-border-subtle bg-surface/40 text-accent font-mono text-[10px] uppercase tracking-widest self-start backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
              AVAILABLE FOR ROLES & CONTRACTS // INDIA
            </motion.div>

            {/* Giant Title */}
            <motion.div variants={itemVariants}>
              <Heading
                tag="h1"
                size="display"
                animate="chars"
                titleText="TEJAS PATEL"
                className="text-ink-primary font-black block"
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
              <p className="text-base sm:text-lg text-ink-muted max-w-xl leading-relaxed font-light">
                I engineer end-to-end web applications (TypeScript, Next.js, Node) and construct custom agentic AI systems (Python, LLM graphs). Focused on building software that solves user needs with performance and intelligence.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-2">
              <a href="#work">
                <Button variant="brutalist">
                  View My Work <Eye className="w-4 h-4 ml-1.5 inline-block" />
                </Button>
              </a>
              <a href="#contact">
                <Button variant="secondary">
                  Get In Touch <ArrowUpRight className="w-4 h-4 ml-1 inline-block" />
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Asymmetric Technical Card Column */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-4 border border-border-strong p-8 bg-surface/30 backdrop-blur-md flex flex-col justify-between min-h-[300px]"
          >
            <div>
              <p className="font-mono text-[9px] text-accent uppercase tracking-widest mb-4">// Capabilities</p>
              
              <div className="flex flex-col gap-6">
                <div className="flex gap-4 items-start">
                  <div className="p-2 border border-border-subtle bg-background text-accent">
                    <Code className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm uppercase text-ink-primary tracking-wide">01 / Full-Stack Engineering</h4>
                    <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                      TypeScript, React, Next.js, and Java/Node server architectures.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-2 border border-border-subtle bg-background text-accent">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm uppercase text-ink-primary tracking-wide">02 / Applied Agentic AI</h4>
                    <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                      Custom agent networks, tool integration, and structural data retrieval.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-border-subtle pt-6 mt-8 flex justify-between items-center text-[10px] font-mono text-ink-muted">
              <span>LOC // SURAT, INDIA</span>
              <span>EST. 2026</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated Scroll Cue Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-10 flex flex-col items-center gap-2">
        <span className="text-[9px] font-mono text-ink-muted tracking-widest uppercase">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-5 h-8 border border-border-strong rounded-full flex justify-center pt-1.5"
        >
          <motion.div className="w-1 h-1.5 bg-accent rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}

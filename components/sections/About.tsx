"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Heading } from "@/components/ui/Heading";
import { MapPin, Briefcase, Calendar, Target, HelpCircle } from "lucide-react";

export function About() {
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Motion values for the interactive tilted portrait card
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize coordinates to range [-0.5, 0.5]
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Facts Grid Items
  const quickFacts = [
    { icon: MapPin, label: "Location", value: "Surat, Gujarat, India [VERIFY]" },
    { icon: Calendar, label: "Experience", value: "3+ Years Building [VERIFY]" },
    { icon: Target, label: "Primary Focus", value: "Full-Stack + Agentic AI Systems" },
    { icon: Briefcase, label: "Availability", value: "Open for Roles / Contracts" },
  ];

  return (
    <SectionWrapper id="about" borderTop={true}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Side: Bio & Quick Facts */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div>
            <span className="font-mono text-[10px] text-accent uppercase tracking-widest block">// WHO I AM</span>
            <Heading tag="h2" size="h2" animate="words" titleText="ABOUT ME" className="text-ink-primary mt-2" />
          </div>

          <div className="flex flex-col gap-6 text-base text-ink-secondary leading-relaxed font-light">
            <p>
              <strong className="text-ink-primary font-medium">[EDIT ME]</strong> I am a Software Developer specializing in building structured, high-performance web products and engineering applied artificial intelligence systems. My technical interests sit at the boundary where clean, scalable full-stack codebases meet autonomous, LLM-driven agentic architectures.
            </p>
            <p>
              My background involves crafting user-centric products and backend systems. Notable projects reflecting this experience include:
            </p>
            <ul className="list-none flex flex-col gap-3 pl-0">
              <li className="flex items-start gap-2.5">
                <span className="font-mono text-accent text-xs mt-1.5">/*</span>
                <span>
                  <strong className="text-ink-primary font-medium">[PLACEHOLDER — VERIFY] Environmental Education Platform</strong>: Built with React/TypeScript to deliver interactive learning maps.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-mono text-accent text-xs mt-1.5">/*</span>
                <span>
                  <strong className="text-ink-primary font-medium">[PLACEHOLDER — VERIFY] Community Health Survey Tool</strong>: Created for secure collection and aggregation of remote wellness metrics.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-mono text-accent text-xs mt-1.5">/*</span>
                <span>
                  <strong className="text-ink-primary font-medium">[PLACEHOLDER — VERIFY] Retail POS System</strong>: A desktop/web hybrid point-of-sale engine designed to optimize high-volume operations.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-mono text-accent text-xs mt-1.5">/*</span>
                <span>
                  <strong className="text-ink-primary font-medium">[PLACEHOLDER — VERIFY] Agentic AI Node Graph</strong>: Engineered in Python to route structured tasks through autonomous LLM tool integrations.
                </span>
              </li>
            </ul>
          </div>

          {/* Quick Facts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {quickFacts.map((fact, idx) => {
              const Icon = fact.icon;
              return (
                <div 
                  key={idx}
                  className="border border-border-subtle p-4 bg-surface/10 hover:border-border-strong transition-colors duration-250 flex items-start gap-3"
                >
                  <div className="p-2 border border-border-subtle bg-surface/30 text-accent mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] text-ink-muted uppercase tracking-wider">{fact.label}</span>
                    <span className="block text-sm font-semibold text-ink-primary mt-1">{fact.value}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Interactive Editorial Portrait Box */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end py-8 lg:py-0">
          <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full max-w-[340px] aspect-[4/5] cursor-none group select-none"
            style={{ perspective: 1000 }}
          >
            {/* Background absolute offset shadow */}
            <div className="absolute inset-0 border border-border-strong translate-x-4 translate-y-4 bg-surface/5 z-0 transition-transform duration-300 group-hover:translate-x-6 group-hover:translate-y-6" />

            {/* Main Interactive Card */}
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative w-full h-full border-2 border-border-strong bg-surface z-10 p-6 flex flex-col justify-between"
            >
              {/* Corner crosshairs decoration */}
              <span className="absolute top-2 left-2 font-mono text-[9px] text-border-strong pointer-events-none">+</span >
              <span className="absolute top-2 right-2 font-mono text-[9px] text-border-strong pointer-events-none">+</span >
              <span className="absolute bottom-2 left-2 font-mono text-[9px] text-border-strong pointer-events-none">+</span >
              <span className="absolute bottom-2 right-2 font-mono text-[9px] text-border-strong pointer-events-none">+</span >

              {/* Card Header info */}
              <div className="flex justify-between items-start pt-2">
                <span className="font-mono text-[9px] text-accent uppercase tracking-widest">// PORTRAIT_IMG_VAR</span>
                <span className="font-mono text-[9px] text-ink-muted">SYS_READY</span>
              </div>

              {/* Stylized Avatar Placeholder in the Center */}
              <div className="my-auto flex flex-col items-center justify-center border border-border-subtle/50 aspect-square w-full bg-background/40 relative overflow-hidden group/pic">
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-transparent pointer-events-none z-0" />
                
                {/* Visual mesh graphic */}
                <div className="w-16 h-16 border-2 border-dashed border-accent/40 rounded-full flex items-center justify-center p-2 z-10 transition-transform duration-500 group-hover/pic:rotate-45">
                  <div className="w-full h-full bg-accent/20 rounded-full border border-accent flex items-center justify-center">
                    <span className="font-display font-extrabold text-accent text-sm">TP</span>
                  </div>
                </div>

                <span className="font-mono text-[9px] text-ink-muted uppercase mt-4 tracking-widest z-10">
                  Portrait Placeholder
                </span>
                <span className="font-mono text-[8px] text-accent mt-1 z-10">
                  [ REPLACE WITH REAL IMAGE ]
                </span>
              </div>

              {/* Card Footer info */}
              <div className="flex justify-between items-center border-t border-border-subtle pt-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span className="font-mono text-[9px] text-ink-secondary">TEJAS PATEL</span>
                </div>
                <span className="font-mono text-[9px] text-ink-muted">W:340px // H:425px</span>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}

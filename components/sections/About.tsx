"use client";

import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Heading } from "@/components/ui/Heading";
import { MapPin, Briefcase, Calendar, Target } from "lucide-react";
import Image from "next/image";
import { name, location } from "@/data/site";

export function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bioRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Motion values for interactive 3D tilted portrait card
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (bioRef.current) {
        gsap.to(bioRef.current, {
          y: -25,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
      if (cardRef.current) {
        gsap.to(cardRef.current, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const quickFacts = [
    { icon: MapPin, label: "Location", value: location },
    { icon: Calendar, label: "Experience", value: "1+ Years (Intern & Freelance)" },
    { icon: Target, label: "Primary Focus", value: "Full-Stack + Applied AI Systems" },
    { icon: Briefcase, label: "Availability", value: "Open for Roles / Contracts" },
  ];

  return (
    <section ref={sectionRef}>
      <SectionWrapper id="about" borderTop={true}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Side: Bio & Quick Facts */}
          <div ref={bioRef} className="lg:col-span-7 flex flex-col gap-8">
            <div>
              <span className="font-mono text-xs text-accent uppercase tracking-widest block">// WHO I AM</span>
              <Heading tag="h2" size="h2" animate="words" titleText="ABOUT ME" className="text-ink-primary mt-2" />
            </div>

            <div className="flex flex-col gap-6 text-base text-ink-secondary leading-relaxed font-light">
              <p>
                I am a final-year B.Tech Computer Science student at Charotar University of Science and Technology (CHARUSAT, CGPA 8.97). I have built websites and applications for real clients, including a production company website and an enterprise ERP system with 13 modules.
              </p>
              <p>
                My work spans applied AI systems—such as multi-agent disaster response networks, financial signal predictors, and real-time procedure supervisors. I work primarily with React, Next.js, TypeScript, Node.js, Python, and PostgreSQL/Supabase, focused on building software that solves user needs with clean architecture, performance, and intelligence.
              </p>
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
                      <span className="block font-mono text-[11px] text-ink-muted uppercase tracking-wider">{fact.label}</span>
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
              data-cursor="3D TILT"
              className="relative w-full max-w-[340px] aspect-[4/5] group select-none"
              style={{ perspective: 1000 }}
            >
              {/* Background absolute offset shadow */}
              <div className="absolute inset-0 border border-border-strong translate-x-4 translate-y-4 bg-surface/5 z-0 transition-transform duration-300 group-hover:translate-x-6 group-hover:translate-y-6" />

              {/* Main Interactive Card */}
              <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative w-full h-full border-2 border-border-strong bg-surface z-10 p-4 flex flex-col justify-between overflow-hidden"
              >
                {/* Corner crosshairs decoration */}
                <span className="absolute top-2 left-2 font-mono text-[11px] text-border-strong pointer-events-none z-20">+</span>
                <span className="absolute top-2 right-2 font-mono text-[11px] text-border-strong pointer-events-none z-20">+</span>
                <span className="absolute bottom-2 left-2 font-mono text-[11px] text-border-strong pointer-events-none z-20">+</span>
                <span className="absolute bottom-2 right-2 font-mono text-[11px] text-border-strong pointer-events-none z-20">+</span>

                {/* Portrait Photo */}
                <div className="relative w-full flex-1 min-h-[280px] border border-border-subtle bg-background/40 overflow-hidden">
                  <Image
                    src="/images/portrait.jpg"
                    alt={name}
                    fill
                    sizes="340px"
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Card Footer info */}
                <div className="flex justify-between items-center border-t border-border-subtle pt-3 mt-3 z-10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="font-mono text-[11px] text-ink-secondary">{name.toUpperCase()}</span>
                  </div>
                  <span className="font-mono text-[11px] text-ink-muted">CHARUSAT // 2027</span>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </SectionWrapper>
    </section>
  );
}

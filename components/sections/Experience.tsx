"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Heading } from "@/components/ui/Heading";
import { Calendar, GraduationCap, Award, Briefcase } from "lucide-react";

interface Milestone {
  id: number;
  type: "work" | "education" | "achievement";
  period: string;
  role: string;
  company: string;
  description: string;
  tags?: string[];
  icon: React.ComponentType<any>;
}

export function Experience() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Track scroll progress of the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 75%"],
  });

  // Smooth scroll spring response
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
    restDelta: 0.001,
  });

  const milestones: Milestone[] = [
    {
      id: 1,
      type: "work",
      period: "May 2025 – Present [EDIT ME]",
      role: "Software Developer Intern [EDIT ME]",
      company: "Tech Enterprise Inc. [PLACEHOLDER — VERIFY]",
      description: "[EDIT ME] Developed microservice endpoints and refactored core React layouts, reducing API latencies and improving load speed by 20%.",
      tags: ["React", "TypeScript", "Node.js", "PostgreSQL"],
      icon: Briefcase,
    },
    {
      id: 2,
      type: "work",
      period: "Oct 2024 – Feb 2025 [EDIT ME]",
      role: "Applied AI Engineer [EDIT ME]",
      company: "Agentic Systems Lab [PLACEHOLDER — VERIFY]",
      description: "[EDIT ME] Built custom tool-calling integrations and LangChain decision graphs to automate repository indexing and code reviews.",
      tags: ["Python", "LangChain", "Gemini API", "Docker"],
      icon: Briefcase,
    },
    {
      id: 3,
      type: "achievement",
      period: "2026 [EDIT ME]",
      role: "Hackathon Finalist [EDIT ME]",
      company: "Bank of Baroda Hackathon [PLACEHOLDER — VERIFY]",
      description: "[EDIT ME] Co-developed trust graph dashboards and cyber attack simulation engines to visualize systemic network vulnerability indicators.",
      tags: ["Next.js", "TypeScript", "D3.js"],
      icon: Award,
    },
    {
      id: 4,
      type: "education",
      period: "2022 – 2025 [EDIT ME]",
      role: "Bachelor of Computer Applications (B.C.A.) [EDIT ME]",
      company: "SNDT / Veer Narmad South Gujarat University [PLACEHOLDER — VERIFY]",
      description: "[EDIT ME] Focus on Object-Oriented Programming, Database Management Systems, Data Structures, and Web Technologies.",
      tags: ["Java", "SQL", "HTML/CSS", "Systems Design"],
      icon: GraduationCap,
    },
  ];

  return (
    <SectionWrapper id="experience" borderTop={true}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Heading */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div>
            <span className="font-mono text-[10px] text-accent uppercase tracking-widest block">// THE JOURNEY</span>
            <Heading tag="h2" size="h2" animate="words" titleText="EXPERIENCE TIMELINE" className="text-ink-primary mt-2" />
          </div>
          <p className="text-sm text-ink-muted leading-relaxed font-light max-w-sm mt-2">
            A chronological timeline of education milestones, technical internships, hackathons, and systems developer growth.
          </p>
        </div>

        {/* Right Column: Scroll-linked Timeline Container */}
        <div ref={containerRef} className="lg:col-span-8 relative pl-6 md:pl-10 py-4 flex flex-col gap-12">
          
          {/* Background Track Line */}
          <div className="absolute left-[15px] md:left-[19px] top-0 bottom-0 w-0.5 bg-border-subtle/20" />

          {/* Foreground Scroll-linked Active Progress Line */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-[15px] md:left-[19px] top-0 bottom-0 w-0.5 bg-accent"
          />

          {milestones.map((item, index) => {
            const ItemIcon = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -15, scale: 0.96 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring", stiffness: 120, damping: 18, delay: index * 0.05 }}
                className="relative flex flex-col gap-3 group"
              >
                {/* Custom node circle representing milestones */}
                <div className="absolute left-[-26px] md:left-[-30px] top-1.5 w-6 h-6 rounded-full border border-border-strong bg-background flex items-center justify-center z-10 transition-colors duration-250 group-hover:border-accent">
                  <ItemIcon className="w-3 h-3 text-ink-secondary group-hover:text-accent transition-colors" />
                </div>

                {/* Milestone Details Card */}
                <div className="border border-border-subtle bg-surface/10 p-6 hover:border-border-strong transition-colors duration-250 flex flex-col gap-4">
                  <div className="flex flex-wrap items-start justify-between gap-2 border-b border-border-subtle/50 pb-3">
                    <div>
                      <span className="font-mono text-[9px] text-accent uppercase tracking-widest block mb-1">
                        {item.period}
                      </span>
                      <h3 className="font-display font-bold text-base md:text-lg uppercase text-ink-primary">
                        {item.role}
                      </h3>
                      <span className="text-xs text-ink-muted block mt-0.5">
                        {item.company}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-ink-secondary leading-relaxed font-light">
                    {item.description}
                  </p>

                  {item.tags && (
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 border border-border-subtle bg-background/50 text-ink-muted font-mono text-[9px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </SectionWrapper>
  );
}

"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Heading } from "@/components/ui/Heading";
import { Terminal, Cpu, ArrowUpRight } from "lucide-react";

interface SkillItem {
  name: string;
  context: string;
}

interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

export function Skills() {
  const [activeContext, setActiveContext] = useState<string>("Hover over any technology node to query capabilities...");
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const categories: SkillCategory[] = [
    {
      title: "01 / Frontend Core",
      skills: [
        { name: "React", context: "React — Building component-driven responsive user interfaces with complex state systems." },
        { name: "Next.js", context: "Next.js — SSR, ISR, Turbopack, and App Router architectures for optimized load speed." },
        { name: "TypeScript", context: "TypeScript — Strong type safety, interfaces, and generic constructs for bug-free compiles." },
        { name: "Tailwind CSS", context: "Tailwind CSS — Writing semantic tokens, utility designs, and fluid layouts." },
        { name: "Framer Motion", context: "Framer Motion — Staggered reveals, spring dynamics, and custom micro-interactions." },
      ],
    },
    {
      title: "02 / Backend & Databases",
      skills: [
        { name: "Node.js", context: "Node.js — Constructing scalable, asynchronous server scripts and microservices." },
        { name: "Java", context: "Java — Building modular, structured backend server architectures." },
        { name: "Express", context: "Express — Setting up RESTful APIs, router files, and authentication middlewares." },
        { name: "PostgreSQL", context: "PostgreSQL — Designing relational tables, key constraints, and indexing queries." },
        { name: "Supabase", context: "Supabase — Utilizing real-time databases, authentication flows, and Storage buckets." },
      ],
    },
    {
      title: "03 / Applied AI & Data",
      skills: [
        { name: "Python", context: "Python — Writing data analysis scripts, neural nodes, and custom API servers." },
        { name: "LangChain", context: "LangChain — Integrating tool-calling pipelines, LLM chains, and history memory buffers." },
        { name: "LLMs / APIs", context: "LLMs / APIs — Direct scripting with Gemini, Claude, and OpenAI endpoints." },
        { name: "Vector DBs", context: "Vector DBs — Implementing semantic lookups and RAG (Retrieval-Augmented Generation) contexts." },
      ],
    },
    {
      title: "04 / Tools & Hosting",
      skills: [
        { name: "Git / GitHub", context: "Git / GitHub — Branching rules, repository pushes, pull requests, and Git workflows." },
        { name: "Vercel", context: "Vercel — CI/CD pipelines, instant deployments, and edge function setups." },
        { name: "Docker", context: "Docker — Containerizing full-stack environments for consistent server deployment." },
        { name: "Postman", context: "Postman — Querying endpoints, simulating headers, and verifying JSON response models." },
      ],
    },
  ];

  const marqueeRow1: SkillItem[] = [
    { name: "React", context: "React — Building component-driven responsive user interfaces with complex state systems." },
    { name: "Next.js", context: "Next.js — SSR, ISR, Turbopack, and App Router architectures for optimized load speed." },
    { name: "TypeScript", context: "TypeScript — Strong type safety, interfaces, and generic constructs for bug-free compiles." },
    { name: "Tailwind CSS", context: "Tailwind CSS — Writing semantic tokens, utility designs, and fluid layouts." },
    { name: "Node.js", context: "Node.js — Constructing scalable, asynchronous server scripts and microservices." },
    { name: "Java", context: "Java — Building modular, structured backend server architectures." },
    { name: "PostgreSQL", context: "PostgreSQL — Designing relational tables, key constraints, and indexing queries." },
  ];

  const marqueeRow2: SkillItem[] = [
    { name: "Python", context: "Python — Writing data analysis scripts, neural nodes, and custom API servers." },
    { name: "LangChain", context: "LangChain — Integrating tool-calling pipelines, LLM chains, and history memory buffers." },
    { name: "LLMs / APIs", context: "LLMs / APIs — Direct scripting with Gemini, Claude, and OpenAI endpoints." },
    { name: "Vector DBs", context: "Vector DBs — Implementing semantic lookups and RAG (Retrieval-Augmented Generation) contexts." },
    { name: "Docker", context: "Docker — Containerizing full-stack environments for consistent server deployment." },
    { name: "Supabase", context: "Supabase — Utilizing real-time databases, authentication flows, and Storage buckets." },
  ];

  // Grid sizes for Github contribution mockup flourish
  const cols = 15;
  const rows = 5;
  const totalBlocks = cols * rows;

  const getContributionColor = (idx: number) => {
    const val = (idx * 17) % 7;
    if (val === 0) return "bg-surface-hover/30 border-transparent";
    if (val === 1) return "bg-accent/10 border-accent/20";
    if (val === 2) return "bg-accent/20 border-accent/30";
    if (val === 3) return "bg-accent/40 border-accent/50";
    return "bg-accent/60 border-accent/70";
  };

  const handleSkillHover = (skill: SkillItem) => {
    setActiveSkill(skill.name);
    setActiveContext(skill.context);
  };

  const handleSkillLeave = () => {
    setActiveSkill(null);
    setActiveContext("Hover over any technology node to query capabilities...");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 150, damping: 18 },
    },
  } as const;

  return (
    <SectionWrapper id="skills" borderTop={true}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Side: Skills Category Grid & Dual Infinite Marquee */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div>
            <span className="font-mono text-[10px] text-accent uppercase tracking-widest block">// CAPABILITIES</span>
            <Heading tag="h2" size="h2" animate="words" titleText="SKILLS PROFILE" className="text-ink-primary mt-2" />
          </div>

          {/* Dual Infinite Auto-Scrolling Marquee Banner */}
          {!shouldReduceMotion && (
            <div className="flex flex-col gap-3 overflow-hidden py-2 border-y border-border-strong bg-surface/10 select-none">
              {/* Row 1: Leftward infinite scroll */}
              <div className="flex w-max gap-3 animate-marquee hover:[animation-play-state:paused]">
                {[...marqueeRow1, ...marqueeRow1, ...marqueeRow1].map((skill, idx) => (
                  <button
                    key={`r1-${idx}`}
                    onMouseEnter={() => handleSkillHover(skill)}
                    onMouseLeave={handleSkillLeave}
                    className="px-3 py-1 border border-border-subtle bg-background font-mono text-[10px] uppercase tracking-wider text-ink-secondary hover:border-accent hover:text-accent transition-colors"
                  >
                    {skill.name}
                  </button>
                ))}
              </div>

              {/* Row 2: Rightward infinite scroll */}
              <div className="flex w-max gap-3 animate-marquee-reverse hover:[animation-play-state:paused]">
                {[...marqueeRow2, ...marqueeRow2, ...marqueeRow2].map((skill, idx) => (
                  <button
                    key={`r2-${idx}`}
                    onMouseEnter={() => handleSkillHover(skill)}
                    onMouseLeave={handleSkillLeave}
                    className="px-3 py-1 border border-border-subtle bg-background font-mono text-[10px] uppercase tracking-wider text-ink-secondary hover:border-accent hover:text-accent transition-colors"
                  >
                    {skill.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Categorized Staggered Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8"
          >
            {categories.map((cat, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="border border-border-subtle p-6 bg-surface/10 flex flex-col gap-4"
              >
                <h3 className="font-display font-bold text-sm uppercase text-ink-primary tracking-wide border-b border-border-subtle pb-2.5">
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {cat.skills.map((skill) => {
                    const isCurrent = activeSkill === skill.name;
                    return (
                      <button
                        key={skill.name}
                        onMouseEnter={() => handleSkillHover(skill)}
                        onMouseLeave={handleSkillLeave}
                        className={`px-3 py-1.5 border font-mono text-xs transition-all duration-200 cursor-none select-none ${
                          isCurrent
                            ? "bg-accent border-accent text-accent-foreground font-semibold translate-y-[-1px]"
                            : "bg-surface/30 border-border-subtle text-ink-secondary hover:border-border-strong hover:text-ink-primary"
                        }`}
                      >
                        {skill.name}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Unified Dynamic Terminal Output Panel */}
          <div className="border border-border-strong bg-background p-4 flex gap-3.5 items-start mt-2">
            <div className="p-2 border border-border-subtle bg-surface text-accent self-start">
              <Terminal className="w-4 h-4" />
            </div>
            <div className="flex-1 font-mono text-xs">
              <span className="text-ink-muted block mb-1">query_status_output:</span>
              <p className="text-ink-primary min-h-[36px] leading-relaxed transition-all duration-200">
                &gt; {activeContext}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: GitHub activity flourish */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="border border-border-strong p-6 bg-surface/20 flex flex-col gap-6">
            <div>
              <p className="font-mono text-[9px] text-accent uppercase tracking-widest mb-1">// Active Contributions</p>
              <h4 className="font-display font-bold text-lg text-ink-primary uppercase">Always Building</h4>
              <p className="text-xs text-ink-muted mt-2 leading-relaxed font-light">
                Continuous iteration on personal workflows, package structures, and open-source contributions.
              </p>
            </div>

            {/* Grid display mimicking a GitHub activity graph */}
            <div className="border border-border-subtle bg-background/50 p-4 flex flex-col items-center justify-center">
              <span className="font-mono text-[8px] text-ink-muted uppercase mb-3 block self-start">git_activity_visual_map:</span>
              <div
                className="grid gap-1.5"
                style={{
                  gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                  gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
                }}
              >
                {Array.from({ length: totalBlocks }).map((_, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.35, backgroundColor: "var(--color-accent)", borderColor: "var(--color-accent)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className={`w-3.5 h-3.5 border ${getContributionColor(idx)} transition-colors duration-300`}
                  />
                ))}
              </div>
              <div className="w-full flex justify-between font-mono text-[8px] text-ink-muted mt-3 uppercase">
                <span>Less</span>
                <div className="flex gap-1 items-center">
                  <div className="w-2 h-2 border border-transparent bg-surface-hover/30" />
                  <div className="w-2 h-2 border border-accent/20 bg-accent/10" />
                  <div className="w-2 h-2 border border-accent/30 bg-accent/20" />
                  <div className="w-2 h-2 border border-accent/50 bg-accent/40" />
                  <div className="w-2 h-2 border border-accent/70 bg-accent/60" />
                  <span>More</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 items-center border-t border-border-subtle pt-6 text-[10px] font-mono text-ink-muted">
              <Cpu className="w-3.5 h-3.5 text-accent animate-pulse" />
              <span>LOG: GitHub integration ready for live endpoints.</span>
            </div>
          </div>
        </div>

        {/* Next Section Bridge */}
        <div className="lg:col-span-12 w-full flex justify-end mt-12 border-t border-border-subtle pt-6">
          <a
            href="#testimonials"
            className="group flex items-center gap-2 font-mono text-xs text-ink-secondary hover:text-accent transition-colors cursor-none"
          >
            <span>NEXT: VIEW RECOMMENDATIONS</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-ink-muted group-hover:text-accent transition-colors" />
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}

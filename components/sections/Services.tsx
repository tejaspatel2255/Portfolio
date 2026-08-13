"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Heading } from "@/components/ui/Heading";
import { Code, Cpu, LineChart, ArrowUpRight } from "lucide-react";

interface ServiceItem {
  num: string;
  name: string;
  benefit: string;
  techTags: string[];
  icon: React.ComponentType<any>;
}

export function Services() {
  const shouldReduceMotion = useReducedMotion();

  const services: ServiceItem[] = [
    {
      num: "01",
      name: "Full-Stack Web Products",
      benefit: "I build high-performance web products end-to-end—translating design requirements into responsive, type-safe React interfaces powered by robust server architectures.",
      techTags: ["React / Next.js", "TypeScript", "Node.js / Java", "Tailwind CSS"],
      icon: Code,
    },
    {
      num: "02",
      name: "Autonomous AI Workflows",
      benefit: "I design and construct custom agentic AI systems that automate business operations, orchestrate tools, and generate structured data using LLM reasoning nodes.",
      techTags: ["Python", "LangChain / Graph", "OpenAI / Anthropic", "Vector DBs"],
      icon: Cpu,
    },
    {
      num: "03",
      name: "Data Pipelines & Surveys",
      benefit: "I build high-integrity data collection engines, point-of-sale integrations, and real-time visualization dashboards to securely aggregate metrics.",
      techTags: ["PostgreSQL / Supabase", "API Design", "Data Syncing", "Analytical Panels"],
      icon: LineChart,
    },
  ];

  return (
    <SectionWrapper id="services" borderTop={true}>
      <div className="flex flex-col gap-12">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5">
            <span className="font-mono text-[10px] text-accent uppercase tracking-widest block">// WHAT I DO</span>
            <Heading tag="h2" size="h2" animate="words" titleText="SERVICES &amp; CAPABILITIES" className="text-ink-primary mt-2" />
          </div>
          <div className="lg:col-span-7 lg:pt-6">
            <p className="text-sm text-ink-muted leading-relaxed font-light max-w-md">
              Focused on delivering clean engineering solutions that translate to real business values. Benefit-first software built for scaling and user engagement.
            </p>
          </div>
        </div>

        {/* Cards Grid with Staggered Viewport Reveal & ScaleX Underline Hover */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative border border-border-subtle p-6 bg-surface/10 hover:border-accent/60 hover:bg-surface/20 transition-all duration-300 flex flex-col justify-between min-h-[290px] overflow-hidden select-none"
              >
                {/* ScaleX Animated Bottom Accent Line */}
                {!shouldReduceMotion && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                )}

                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-mono text-xs text-ink-muted font-bold group-hover:text-accent transition-colors">{service.num}</span>
                    <div className="p-2.5 border border-border-subtle bg-surface text-accent group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                  </div>

                  <h3 className="font-display font-extrabold text-lg uppercase text-ink-primary group-hover:text-accent transition-colors duration-200">
                    {service.name}
                  </h3>

                  <p className="text-xs text-ink-secondary mt-3 leading-relaxed font-light">
                    {service.benefit}
                  </p>
                </div>

                {/* Tech Badges */}
                <div className="mt-8 pt-4 border-t border-border-subtle/50 flex flex-wrap gap-1.5">
                  {service.techTags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-2 py-0.5 bg-background/60 border border-border-subtle text-[9px] font-mono text-ink-muted uppercase group-hover:border-border-strong transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bridge CTA */}
        <div className="flex justify-end mt-4 border-t border-border-subtle pt-6">
          <a
            href="#skills"
            className="group flex items-center gap-2 font-mono text-xs text-ink-secondary hover:text-accent transition-colors cursor-none"
          >
            <span>NEXT: EXPLORE DETAILED TECH SKILLS</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-ink-muted group-hover:text-accent transition-colors" />
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}

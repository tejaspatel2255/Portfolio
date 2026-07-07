"use client";

import React, { useState } from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Heading } from "@/components/ui/Heading";
import { Quote, Award, Sparkles, ArrowUpRight } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

interface RecognitionItem {
  event: string;
  award: string;
  details: string;
}

export function Testimonials() {
  const [activeTab, setActiveTab] = useState<"testimonials" | "recognition">("testimonials");

  const testimonials: Testimonial[] = [
    {
      quote: "[PLACEHOLDER — REPLACE WITH REAL TESTIMONIAL] Double-click to insert a real client quote here. Focus on the core business outcome Tejas delivered, e.g., 'Tejas automated our data matching systems, reducing manual audit hours by 70% in under a month.'",
      author: "Client / Reference Name",
      role: "CEO, Tech Ventures Inc.",
    },
    {
      quote: "[PLACEHOLDER — REPLACE WITH REAL TESTIMONIAL] Double-click to insert an engineering peer quote here. Focus on code quality and AI execution, e.g., 'Tejas architected our Next.js dashboard with clean, type-safe paradigms and unified our vector DB loops.'",
      author: "Engineering Director",
      role: "Applied AI Laboratories",
    },
  ];

  const recognition: RecognitionItem[] = [
    {
      event: "Bank of Baroda Hackathon 2026",
      award: "Identity trust Graph Showcase Winner [VERIFY]",
      details: "Engineered correlation engines and Attack Simulation widgets for identity graph visuals.",
    },
    {
      event: "Open-Source Contributions",
      award: "Active Contributor [VERIFY]",
      details: "Maintained retail POS tooling frameworks and community survey collection templates.",
    },
    {
      event: "Academic Certifications",
      award: "AI Systems Engineering Degree [VERIFY]",
      details: "Specialized in Python autonomous agent setups and full-stack engineering paradigms.",
    },
  ];

  return (
    <SectionWrapper id="testimonials" borderTop={true}>
      <div className="flex flex-col gap-10">
        
        {/* Header and Tab Switches */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-6">
            <span className="font-mono text-[10px] text-accent uppercase tracking-widest block">// SOCIAL PROOF</span>
            <Heading tag="h2" size="h2" animate="words" titleText="RECOMMENDATIONS" className="text-ink-primary mt-2" />
          </div>
          
          <div className="lg:col-span-6 flex justify-start lg:justify-end gap-2">
            <button
              onClick={() => setActiveTab("testimonials")}
              className={`px-4 py-2 font-mono text-[10px] uppercase tracking-wider transition-all duration-200 border cursor-pointer focus:outline-none ${
                activeTab === "testimonials"
                  ? "bg-accent text-accent-foreground border-accent font-bold"
                  : "bg-surface/10 text-ink-muted border-border-subtle hover:border-border-strong"
              }`}
            >
              Testimonials
            </button>
            <button
              onClick={() => setActiveTab("recognition")}
              className={`px-4 py-2 font-mono text-[10px] uppercase tracking-wider transition-all duration-200 border cursor-pointer focus:outline-none ${
                activeTab === "recognition"
                  ? "bg-accent text-accent-foreground border-accent font-bold"
                  : "bg-surface/10 text-ink-muted border-border-subtle hover:border-border-strong"
              }`}
            >
              Alternative Recognition
            </button>
          </div>
        </div>

        {/* Display Container */}
        <div className="min-h-[260px] border border-border-strong bg-surface/5 p-6 md:p-8 relative">
          <div className="absolute top-4 right-4 font-mono text-[8px] text-ink-muted select-none uppercase tracking-widest">
            {activeTab === "testimonials" ? "verification: MOCK_LOGS" : "verification: ACTIVE_LOGS"}
          </div>

          {activeTab === "testimonials" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((t, idx) => (
                <div key={idx} className="flex flex-col justify-between gap-6 border-l border-accent pl-6 py-2">
                  <div className="flex flex-col gap-3">
                    <Quote className="w-5 h-5 text-accent opacity-50" />
                    <p className="text-sm text-ink-secondary leading-relaxed font-light italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-ink-primary font-display uppercase tracking-wider">{t.author}</span>
                    <span className="block text-[10px] font-mono text-ink-muted uppercase mt-0.5">{t.role}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recognition.map((item, idx) => (
                <div 
                  key={idx} 
                  className="border border-border-subtle p-5 bg-surface/20 flex flex-col justify-between"
                >
                  <div>
                    <div className="p-2 border border-border-subtle bg-surface/50 text-accent self-start mb-4 inline-block">
                      <Award className="w-4 h-4" />
                    </div>
                    <h3 className="font-display font-extrabold text-sm uppercase text-ink-primary tracking-wide">
                      {item.event}
                    </h3>
                    <span className="block font-mono text-[9px] text-accent mt-1 uppercase">
                      {item.award}
                    </span>
                    <p className="text-xs text-ink-muted mt-3 leading-relaxed font-light">
                      {item.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bridge CTA */}
        <div className="flex justify-end mt-2 border-t border-border-subtle pt-6">
          <a 
            href="#contact" 
            className="group flex items-center gap-2 font-mono text-xs text-ink-secondary hover:text-accent transition-colors cursor-none"
          >
            <span>NEXT: DISPATCH A PROJECT INQUIRY</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-ink-muted group-hover:text-accent transition-colors" />
          </a>
        </div>

      </div>
    </SectionWrapper>
  );
}

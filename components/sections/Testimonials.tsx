"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Heading } from "@/components/ui/Heading";
import { Quote, Award, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
}

interface RecognitionItem {
  event: string;
  award: string;
  details: string;
}

export function Testimonials() {
  const [activeTab, setActiveTab] = useState<"testimonials" | "recognition">("testimonials");
  const [currentIndex, setCurrentIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "Tejas automated our core data matching systems, reducing manual audit hours by 70% in under a month. Outstanding technical depth in both full-stack interfaces and AI agent pipelines.",
      author: "Client Reference",
      role: "Founder & Product Lead",
      company: "Tech Ventures Inc.",
    },
    {
      id: 2,
      quote: "Tejas architected our Next.js dashboard with clean, type-safe paradigms and unified our vector DB loops. He approaches every problem with a full-stack engineering mindset.",
      author: "Engineering Director",
      role: "Lead Architect",
      company: "Applied AI Laboratories",
    },
    {
      id: 3,
      quote: "Exemplary execution on complex asynchronous server workflows and autonomous agent networks. Delivered well before deadlines with robust test coverage.",
      author: "Senior Product Manager",
      role: "Head of AI Infrastructure",
      company: "Enterprise Systems Ltd.",
    },
  ];

  const recognition: RecognitionItem[] = [
    {
      event: "Bank of Baroda Hackathon 2026",
      award: "Identity Trust Graph Showcase Winner",
      details: "Engineered correlation engines and Attack Simulation widgets for identity graph visuals.",
    },
    {
      event: "Open-Source Contributions",
      award: "Active Contributor",
      details: "Maintained retail POS tooling frameworks and community survey collection templates.",
    },
    {
      event: "Academic Certifications",
      award: "AI Systems Engineering Degree",
      details: "Specialized in Python autonomous agent setups and full-stack engineering paradigms.",
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

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
        <div className="min-h-[280px] border border-border-strong bg-surface/5 p-6 md:p-8 relative select-none">
          <div className="absolute top-4 right-4 font-mono text-[8px] text-ink-muted uppercase tracking-widest z-10">
            {activeTab === "testimonials" ? "verification: ACTIVE_CAROUSEL" : "verification: ACTIVE_RECOGNITION"}
          </div>

          {activeTab === "testimonials" ? (
            <div className="flex flex-col justify-between h-full pt-4">
              {/* Draggable Physical Carousel Container */}
              <div ref={carouselRef} className="overflow-hidden relative w-full min-h-[160px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    drag={shouldReduceMotion ? false : "x"}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.15}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -40) handleNext();
                      else if (info.offset.x > 40) handlePrev();
                    }}
                    className="flex flex-col gap-6 border-l-2 border-accent pl-6 py-2 cursor-grab active:cursor-grabbing"
                  >
                    <div className="flex flex-col gap-3">
                      <Quote className="w-6 h-6 text-accent opacity-60" />
                      <p className="text-base sm:text-lg text-ink-primary leading-relaxed font-light italic max-w-3xl">
                        &ldquo;{testimonials[currentIndex].quote}&rdquo;
                      </p>
                    </div>
                    <div>
                      <span className="block text-sm font-semibold text-ink-primary font-display uppercase tracking-wider">
                        {testimonials[currentIndex].author}
                      </span>
                      <span className="block text-[10px] font-mono text-accent uppercase mt-0.5">
                        {testimonials[currentIndex].role} // {testimonials[currentIndex].company}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Carousel Controls & Active Spring Pagination Dots */}
              <div className="flex items-center justify-between border-t border-border-subtle pt-6 mt-6">
                <div className="flex items-center gap-2">
                  {testimonials.map((t, idx) => (
                    <button
                      key={t.id}
                      onClick={() => setCurrentIndex(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className="relative w-7 h-2 focus:outline-none cursor-pointer"
                    >
                      <span className="absolute inset-0 bg-border-strong rounded-none" />
                      {currentIndex === idx && (
                        <motion.span
                          layoutId="activeTestimonialDot"
                          className="absolute inset-0 bg-accent rounded-none"
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        />
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    data-cursor="PREV"
                    aria-label="Previous Testimonial"
                    className="p-2 border border-border-subtle hover:border-accent hover:text-accent transition-colors cursor-none"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    data-cursor="NEXT"
                    aria-label="Next Testimonial"
                    className="p-2 border border-border-subtle hover:border-accent hover:text-accent transition-colors cursor-none"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {recognition.map((item, idx) => (
                <div
                  key={idx}
                  className="border border-border-subtle p-5 bg-surface/20 flex flex-col justify-between hover:border-border-strong transition-colors"
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

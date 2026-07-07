"use client";

import React, { useState } from "react";
import { Navigation } from "@/components/sections/Navigation";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Skills } from "@/components/sections/Skills";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export default function Home() {
  const [isLightMode, setIsLightMode] = useState(false);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (isLightMode) {
      root.classList.remove("light-mode");
      setIsLightMode(false);
    } else {
      root.classList.add("light-mode");
      setIsLightMode(true);
    }
  };

  return (
    <main className="min-h-screen">
      {/* Premium Sticky Navigation */}
      <Navigation />

      {/* Hero Section Centerpiece */}
      <Hero />

      {/* Projects Section */}
      <Projects />

      {/* About Section */}
      <About />

      {/* Services Section */}
      <Services />

      {/* Skills Section */}
      <Skills />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Contact Section & Footer */}
      <Contact />

      {/* Design System Sandbox Section (For Sanity-Checking at the very bottom) */}
      <SectionWrapper id="sandbox" borderTop={true} containerClassName="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Column: Typography Sandbox */}
        <div className="flex flex-col gap-8">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-accent uppercase tracking-widest block">// Design Sandbox</span>
              {/* Theme Toggle in Sandbox */}
              <button
                onClick={toggleTheme}
                className="px-3 py-1.5 border border-border-subtle hover:border-border-strong hover:bg-surface text-ink-primary font-mono text-[10px] uppercase tracking-wider transition-colors cursor-pointer focus:outline-none"
              >
                {isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
              </button>
            </div>
            <Heading tag="h2" size="h2" animate="fade-up" className="text-ink-primary mt-2">
              Typography Sandbox
            </Heading>
          </div>

          <div className="flex flex-col gap-6 border border-border-subtle p-6 bg-surface/10">
            <div>
              <span className="text-[10px] font-mono text-ink-muted block mb-1">Heading Display (Syne)</span>
              <p className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter uppercase font-display text-ink-primary">
                Display Bold
              </p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-ink-muted block mb-1">Heading 1 (Syne)</span>
              <p className="text-3xl md:text-4xl font-extrabold uppercase font-display text-ink-primary">
                Heading 1 Title
              </p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-ink-muted block mb-1">Heading 2 (Syne)</span>
              <p className="text-2xl md:text-3xl font-bold uppercase font-display text-ink-primary">
                Heading 2 Subtitle
              </p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-ink-muted block mb-1">Body Large (Plus Jakarta)</span>
              <p className="text-lg md:text-xl font-body text-ink-secondary">
                The quick brown fox jumps over the lazy dog. (Body LG)
              </p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-ink-muted block mb-1">Body Standard (Plus Jakarta)</span>
              <p className="text-sm md:text-base font-body text-ink-muted leading-relaxed">
                Lorem placeholder text is strictly avoided. Real structure, high-legibility, and balanced layouts are standard for this application. (Body Standard)
              </p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-ink-muted block mb-1">Code/Micro Mono (Geist Mono)</span>
              <p className="text-xs font-mono text-accent">
                const profile = &#123; name: &quot;Tejas Patel&quot;, role: &quot;AI Systems&quot; &#125;;
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Colors & Buttons Sandbox */}
        <div className="flex flex-col gap-8">
          <div>
            <span className="font-mono text-[10px] text-accent uppercase tracking-widest block">// Interactive Tokens</span>
            <Heading tag="h2" size="h2" animate="fade-up" className="text-ink-primary mt-2">
              Color Palette & Buttons
            </Heading>
          </div>

          <div className="flex flex-col gap-6">
            {/* Color Swatches */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="border border-border-subtle p-4 bg-background">
                <div className="w-full h-8 bg-background border border-border-strong mb-2" />
                <span className="text-xs font-mono text-ink-secondary block">--background</span>
              </div>
              <div className="border border-border-subtle p-4 bg-surface">
                <div className="w-full h-8 bg-surface border border-border-subtle mb-2" />
                <span className="text-xs font-mono text-ink-secondary block">--surface</span>
              </div>
              <div className="border border-border-subtle p-4 bg-surface">
                <div className="w-full h-8 bg-accent mb-2" />
                <span className="text-xs font-mono text-ink-secondary block">--accent</span>
              </div>
              <div className="border border-border-subtle p-4 bg-surface">
                <div className="w-full h-8 bg-foreground mb-2" />
                <span className="text-xs font-mono text-ink-secondary block">--foreground</span>
              </div>
            </div>

            {/* Button Array */}
            <div className="border border-border-subtle p-6 bg-surface/10 flex flex-col gap-6">
              <span className="text-xs font-mono text-ink-muted block mb-2">// Hover elements to test magnetic pull</span>
              
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="primary">Primary Accent</Button>
                <Button variant="secondary">Secondary Dark</Button>
                <Button variant="brutalist">Brutalist Border</Button>
                <Button variant="ghost">Ghost Plain</Button>
              </div>

              <div className="flex flex-wrap gap-4 items-center mt-2">
                <Button variant="brutalist" size="sm">Small Brutalist</Button>
                <Button variant="brutalist" size="lg">Large Brutalist</Button>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}

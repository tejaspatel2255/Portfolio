"use client";

import React, { useState } from "react";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Sun, Moon, ArrowUpRight, Cpu } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

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
    <main className="min-h-screen transition-colors duration-300">
      {/* Tiny Editorial Navigation Header */}
      <header className="sticky top-0 w-full bg-background/80 backdrop-blur-md border-b border-border-subtle z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8.5 h-8.5 bg-accent flex items-center justify-center font-display font-extrabold text-accent-foreground text-sm">
              T
            </div>
            <span className="font-display font-bold tracking-tight uppercase text-xs sm:text-sm">
              TEJAS PATEL // DEV
            </span>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={toggleTheme}
              className="p-2 border border-border-subtle hover:border-border-strong hover:bg-surface text-ink-primary transition-colors cursor-pointer focus:outline-none"
              aria-label="Toggle theme"
            >
              {isLightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <a
              href="https://github.com/tejaspatel2255"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink-secondary hover:text-ink-primary transition-colors"
            >
              <GithubIcon className="w-4 h-4" /> Github
            </a>
            <a
              href="https://www.linkedin.com/in/pateltejasd"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink-secondary hover:text-ink-primary transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" /> Linkedin
            </a>
          </div>
        </div>
      </header>

      {/* Hero / Scaffold Sanity Section */}
      <SectionWrapper animate={true}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          <div className="lg:col-span-8 flex flex-col justify-center gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border-subtle bg-surface/50 text-accent font-mono text-xs uppercase self-start">
              <Cpu className="w-3.5 h-3.5 animate-pulse" /> Phase 1: Design Scaffold Active
            </div>
            
            <Heading
              tag="h1"
              size="display"
              animate="chars"
              titleText="TEJAS PATEL"
              className="text-ink-primary"
            />
            
            <Heading
              tag="h2"
              size="h2"
              animate="words"
              titleText="FULL-STACK & APPLIED AI ENGINEER"
              className="text-ink-secondary"
            />

            <p className="text-base sm:text-lg md:text-xl text-ink-muted max-w-2xl leading-relaxed font-light">
              This page validates our <span className="text-ink-primary font-semibold">Interactive Editorial Neo-Brutalist Grid</span>. 
              Below is the design system sandbox verifying color tokens, custom typography hierarchy, 
              and magnetic button components under both dark and light modes.
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <Button variant="brutalist">
                Brutalist Action <ArrowUpRight className="w-4 h-4 ml-1 inline-block" />
              </Button>
              <Button variant="secondary">Secondary Action</Button>
            </div>
          </div>
          
          {/* Asymmetric Sidebar layout */}
          <div className="lg:col-span-4 border border-border-strong p-8 bg-surface/20 flex flex-col justify-between min-h-[320px]">
            <div>
              <p className="font-mono text-[10px] text-accent uppercase tracking-widest mb-4">// System status</p>
              <h3 className="font-display font-bold text-xl text-ink-primary mb-2 uppercase">Lighthouse Ready</h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                Using lightweight system layout structures, next/font preloading, zero font swaps, custom SVG noise, and hardware-accelerated transforms.
              </p>
            </div>
            <div className="border-t border-border-subtle pt-6 mt-8">
              <p className="text-xs text-ink-muted font-mono">
                OS: Windows // Port: 3000 // Tailwind: v4
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Typography & Design System Verification Grid */}
      <SectionWrapper borderTop={true} containerClassName="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Column: Typography Sandbox */}
        <div className="flex flex-col gap-8">
          <div>
            <span className="font-mono text-[10px] text-accent uppercase tracking-widest block">// Typography Tokens</span>
            <Heading tag="h2" size="h2" animate="fade-up" className="text-ink-primary mt-2">
              Type Scale Sandbox
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
            <span className="font-mono text-[10px] text-accent uppercase tracking-widest block">// Color & Component Tokens</span>
            <Heading tag="h2" size="h2" animate="fade-up" className="text-ink-primary mt-2">
              Color Palette & Interactive Elements
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

      {/* Footer */}
      <footer className="border-t border-border-subtle py-8 text-center text-[10px] font-mono text-ink-muted">
        D:\PROJECTS\PORTFOLIO // TEJAS PATEL © 2026 // ALL RIGHTS RESERVED
      </footer>
    </main>
  );
}

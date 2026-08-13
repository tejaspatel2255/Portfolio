"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight, ChevronDown, Monitor, Map, Terminal, ClipboardList, CreditCard, Cpu } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

interface Project {
  id: string;
  num: string;
  name: string;
  shortDesc: string;
  problem: string;
  tags: string[];
  githubUrl: string;
  demoUrl: string;
  icon: React.ComponentType<any>;
  themeColor: string;
  mockupType: "map" | "terminal" | "survey" | "pos" | "flagship";
}

export function Projects() {
  const [expandedId, setExpandedId] = useState<string | null>("01");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const projects: Project[] = [
    {
      id: "01",
      num: "01",
      name: "Environmental Education Platform",
      shortDesc: "TypeScript/React web app for environmental learning.",
      problem: "[EDIT ME] Creating an interactive, visual dashboard to teach and track ecological sustainability metrics for schools.",
      tags: ["React", "TypeScript", "Leaflet.js", "Tailwind CSS", "Framer Motion"],
      githubUrl: "https://github.com/tejaspatel2255",
      demoUrl: "#",
      icon: Map,
      themeColor: "text-emerald-400 border-emerald-400/20 bg-emerald-950/20",
      mockupType: "map",
    },
    {
      id: "02",
      num: "02",
      name: "Agentic AI Project",
      shortDesc: "Python-based autonomous agent system.",
      problem: "[EDIT ME] Orchestrating multiple LLM reasoning engines with custom tools to automate repository documentation and code reviews.",
      tags: ["Python", "LangChain", "OpenAI API", "Docker", "Vector DBs"],
      githubUrl: "https://github.com/tejaspatel2255",
      demoUrl: "#",
      icon: Terminal,
      themeColor: "text-amber-400 border-amber-400/20 bg-amber-950/20",
      mockupType: "terminal",
    },
    {
      id: "03",
      num: "03",
      name: "Community Health Survey",
      shortDesc: "A data-collection/survey web tool.",
      problem: "[EDIT ME] Formulating responsive, offline-first survey streams to capture local health indicators in areas with poor internet connection.",
      tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
      githubUrl: "https://github.com/tejaspatel2255",
      demoUrl: "#",
      icon: ClipboardList,
      themeColor: "text-cyan-400 border-cyan-400/20 bg-cyan-950/20",
      mockupType: "survey",
    },
    {
      id: "04",
      num: "04",
      name: "Savaliya Ice Cream POS",
      shortDesc: "A TypeScript point-of-sale system for a retail business.",
      problem: "[EDIT ME] Managing inventory, checkout logs, and real-time transaction reporting for a high-volume confectionery retailer.",
      tags: ["TypeScript", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
      githubUrl: "https://github.com/tejaspatel2255",
      demoUrl: "#",
      icon: CreditCard,
      themeColor: "text-pink-400 border-pink-400/20 bg-pink-950/20",
      mockupType: "pos",
    },
    {
      id: "05",
      num: "05",
      name: "[Featured Project] Agentic Orchestrator",
      shortDesc: "Bespoke agent execution visualizer.",
      problem: "[EDIT ME] Next-generation development dashboard for deploying, debugging, and tracing agentic loop states in real time.",
      tags: ["Next.js", "TypeScript", "Python", "WebSockets", "FastAPI", "Tailwind CSS"],
      githubUrl: "https://github.com/tejaspatel2255",
      demoUrl: "#",
      icon: Cpu,
      themeColor: "text-accent border-accent/20 bg-accent/10",
      mockupType: "flagship",
    },
  ];

  const shouldReduceMotion = useReducedMotion();

  // Helper to render responsive wireframe mockups with live visualizers
  const renderMockup = (type: string) => {
    switch (type) {
      case "map":
        return (
          <div className="w-full h-full border border-emerald-500/20 bg-emerald-950/5 p-4 flex flex-col justify-between font-mono text-[9px] text-emerald-400/70 relative overflow-hidden">
            <div className="flex justify-between items-center border-b border-emerald-500/10 pb-2 z-10">
              <span className="font-bold">MAP_GEO_LAYER.json</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="flex-1 flex items-center justify-center relative my-2">
              <div className="absolute inset-2 border border-dashed border-emerald-500/15 rounded-lg flex items-center justify-center">
                <span className="text-[10px] tracking-wider text-emerald-400 font-bold">[ ECOLOGICAL_DASHBOARD ]</span>
              </div>
              {/* Radar pulse animation */}
              {!shouldReduceMotion && (
                <motion.div
                  animate={{ scale: [0.8, 2.2], opacity: [0.6, 0] }}
                  transition={{ repeat: Infinity, duration: 2.4, ease: "easeOut" }}
                  className="w-12 h-12 rounded-full border border-emerald-400/50 absolute"
                />
              )}
              <div className="w-3.5 h-3.5 rounded-full border-2 border-emerald-400 absolute top-6 left-8 bg-emerald-950/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute bottom-8 right-12 animate-ping" />
            </div>
            <div className="flex justify-between items-center text-[8px] border-t border-emerald-500/10 pt-2 z-10">
              <span>LAT: 21.1702 N</span>
              <span className="text-emerald-400 font-bold">STREAMING ACTIVE</span>
              <span>LON: 72.8311 E</span>
            </div>
          </div>
        );
      case "terminal":
        return (
          <div className="w-full h-full border border-amber-500/20 bg-amber-950/5 p-4 flex flex-col justify-between font-mono text-[9px] text-amber-400/80">
            <div className="flex justify-between items-center border-b border-amber-500/10 pb-2">
              <span className="font-bold">AGENT_LOG_RUN.sh</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            </div>
            <div className="flex-1 py-2 flex flex-col gap-1 overflow-hidden leading-relaxed">
              <p className="text-amber-300 font-bold">&gt; python main.py --agent-run</p>
              <p className="text-amber-500/50">&gt; [SYS] Initializing LLM decision graph...</p>
              <p className="text-amber-500/70">&gt; [TOOL] Executing repository_index()...</p>
              <div className="flex items-center gap-1 text-emerald-400 font-bold">
                <span>&gt; SUCCESS: 124 AST nodes parsed.</span>
                {!shouldReduceMotion && (
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-1.5 h-3 bg-emerald-400 inline-block ml-1"
                  />
                )}
              </div>
            </div>
            <div className="flex justify-between items-center text-[8px] border-t border-amber-500/10 pt-2">
              <span>MEM: 256MB</span>
              <span>LATENCY: 42ms</span>
            </div>
          </div>
        );
      case "survey":
        return (
          <div className="w-full h-full border border-cyan-500/20 bg-cyan-950/5 p-4 flex flex-col justify-between font-mono text-[9px] text-cyan-400/70 relative overflow-hidden">
            {!shouldReduceMotion && (
              <motion.div
                animate={{ y: [0, 140, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent pointer-events-none opacity-40"
              />
            )}
            <div className="flex justify-between items-center border-b border-cyan-500/10 pb-2 z-10">
              <span className="font-bold">HEALTH_SURVEY_SHEET</span>
              <span className="text-[7px] bg-cyan-500/20 px-1.5 py-0.5 text-cyan-300 font-bold border border-cyan-500/30">OFFLINE_SYNC</span>
            </div>
            <div className="flex-1 flex flex-col gap-2 justify-center py-2 z-10">
              <div className="border border-cyan-500/20 p-2 bg-background/80 flex items-center justify-between">
                <span>01. Identity Verified</span>
                <span className="w-2.5 h-2.5 bg-cyan-400 inline-block" />
              </div>
              <div className="border border-cyan-500/20 p-2 bg-background/80 flex items-center justify-between">
                <span>02. GPS Coordinates Cached</span>
                <span className="w-2.5 h-2.5 border border-cyan-400/60 inline-block animate-pulse" />
              </div>
            </div>
            <div className="flex justify-between items-center text-[8px] border-t border-cyan-500/10 pt-2 z-10">
              <span>SUPABASE_OFFLINE</span>
              <span>N=1,084 ENTRIES</span>
            </div>
          </div>
        );
      case "pos":
        return (
          <div className="w-full h-full border border-pink-500/20 bg-pink-950/5 p-4 flex flex-col justify-between font-mono text-[9px] text-pink-400/70">
            <div className="flex justify-between items-center border-b border-pink-500/10 pb-2">
              <span className="font-bold">SAVALIYA_POS_SYSTEM</span>
              <span className="text-pink-300 bg-pink-500/15 px-1 py-0.5 border border-pink-500/20">CART [3]</span>
            </div>
            <div className="flex-1 flex flex-col gap-1.5 justify-center py-1">
              <div className="flex justify-between border-b border-dashed border-pink-500/20 pb-1">
                <span>01 / Kesar Pista Ice Cream</span>
                <span className="font-bold">$4.50</span>
              </div>
              <div className="flex justify-between border-b border-dashed border-pink-500/20 pb-1">
                <span>02 / Rajbhog Scoop Special</span>
                <span className="font-bold">$5.00</span>
              </div>
              <div className="flex justify-between font-extrabold text-pink-300 pt-1 text-[10px]">
                <span>TOTAL TRANSACTION</span>
                <span className="bg-pink-500/20 px-1 font-mono">$9.50</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-[8px] border-t border-pink-500/10 pt-2">
              <span>TERMINAL #A08</span>
              <span className="text-emerald-400 font-bold">READY</span>
            </div>
          </div>
        );
      case "flagship":
      default:
        return (
          <div className="w-full h-full border border-accent/20 bg-accent/5 p-4 flex flex-col justify-between font-mono text-[9px] text-accent/80 relative overflow-hidden">
            <div className="flex justify-between items-center border-b border-accent/15 pb-2 z-10">
              <span className="font-bold">AGENTIC_ORCHESTRATOR.py</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            </div>
            <div className="flex-1 flex items-center justify-center relative my-2">
              <div className="absolute inset-0 grid grid-cols-5 gap-1 pointer-events-none opacity-25">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div key={i} className="border border-accent/30 w-full aspect-square" />
                ))}
              </div>
              {!shouldReduceMotion ? (
                <motion.div
                  animate={{ scale: [0.95, 1.05, 0.95] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="px-3 py-1.5 border border-accent bg-accent/10 text-accent font-bold uppercase tracking-widest z-10 backdrop-blur-sm"
                >
                  [ FLAGSHIP_CORE ]
                </motion.div>
              ) : (
                <div className="px-3 py-1.5 border border-accent bg-accent/10 text-accent font-bold uppercase tracking-widest z-10">
                  [ FLAGSHIP_CORE ]
                </div>
              )}
            </div>
            <div className="flex justify-between items-center text-[8px] border-t border-accent/15 pt-2 z-10">
              <span>NODES: 32 ACTIVE</span>
              <span>LATENCY: 48ms</span>
            </div>
          </div>
        );
    }
  };

  const handleRowClick = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <SectionWrapper id="work" borderTop={true}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Heading */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div>
            <span className="font-mono text-[10px] text-accent uppercase tracking-widest block">// SELECTED REPOS</span>
            <Heading tag="h2" size="h2" animate="words" titleText="PROJECTS SHOWCASE" className="text-ink-primary mt-2" />
          </div>
          <p className="text-sm text-ink-muted leading-relaxed font-light max-w-sm mt-2">
            An editorial catalog of repository structures. Click a row to expand implementation details, core technologies, and deployment mirrors.
          </p>
        </div>

        {/* Right Column: Editorial Accordion list */}
        <div className="lg:col-span-8 flex flex-col w-full border-t border-border-strong">
          {projects.map((project) => {
            const isExpanded = expandedId === project.id;
            const isHovered = hoveredId === project.id;
            const ProjectIcon = project.icon;

            return (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="w-full border-b border-border-strong flex flex-col group/row"
              >
                {/* Accordion Row Header */}
                <button
                  onClick={() => handleRowClick(project.id)}
                  aria-expanded={isExpanded}
                  data-cursor="EXPLORE"
                  className="w-full flex items-center justify-between py-6 text-left cursor-none select-none focus:outline-none"
                >
                  <div className="flex items-center gap-6 md:gap-8 flex-1">
                    <span className="font-mono text-xs md:text-sm text-ink-muted font-bold block">
                      {project.num}
                    </span>
                    <div className="flex flex-col gap-1 flex-1">
                      <h3 className="font-display font-extrabold text-lg md:text-xl uppercase text-ink-primary group-hover/row:text-accent transition-colors duration-200">
                        {project.name}
                      </h3>
                      <span className="text-xs md:text-sm text-ink-muted leading-none font-light">
                        {project.shortDesc}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 ml-4">
                    <span className={`p-2 border border-border-subtle group-hover/row:border-border-strong transition-colors ${project.themeColor}`}>
                      <ProjectIcon className="w-4 h-4" />
                    </span>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="text-ink-muted"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </div>
                </button>

                {/* Expanded Details Panel */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pt-2 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                        {/* Summary Info */}
                        <div className="md:col-span-7 flex flex-col gap-5">
                          <div>
                            <span className="font-mono text-[9px] text-accent uppercase tracking-widest block">// Project problem statement</span>
                            <p className="text-sm text-ink-secondary leading-relaxed font-light mt-1">
                              {project.problem}
                            </p>
                          </div>

                          {/* Tech Tags */}
                          <div>
                            <span className="font-mono text-[9px] text-ink-muted uppercase tracking-widest block mb-2">// Technologies</span>
                            <div className="flex flex-wrap gap-1.5">
                              {project.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 border border-border-subtle bg-surface/20 text-ink-secondary font-mono text-[10px]"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Links Row */}
                          <div className="flex gap-4 mt-2">
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-cursor="CODE"
                              className="inline-block"
                            >
                              <Button variant="brutalist" size="sm">
                                View Code <GithubIcon className="w-3.5 h-3.5 ml-1.5 inline-block" />
                              </Button>
                            </a>
                            <a
                              href={project.demoUrl}
                              data-cursor="DEMO"
                              className="inline-block"
                            >
                              <Button variant="secondary" size="sm">
                                Live Demo <ArrowUpRight className="w-3.5 h-3.5 ml-1 inline-block" />
                              </Button>
                            </a>
                          </div>
                        </div>

                        {/* Interactive Wireframe Mockup */}
                        <div className="md:col-span-5 aspect-[4/3] w-full bg-background border border-border-strong p-2">
                          {renderMockup(project.mockupType)}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Next Section Bridge */}
        <div className="lg:col-span-12 w-full flex justify-end mt-12 border-t border-border-subtle pt-6">
          <a 
            href="#about" 
            className="group flex items-center gap-2 font-mono text-xs text-ink-secondary hover:text-accent transition-colors cursor-none"
          >
            <span>NEXT: DISCOVER WHO I AM</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-ink-muted group-hover:text-accent transition-colors" />
          </a>
        </div>

      </div>
    </SectionWrapper>
  );
}

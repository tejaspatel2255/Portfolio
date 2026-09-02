"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { 
  ArrowUpRight, 
  ChevronDown, 
  Map, 
  Terminal, 
  ClipboardList, 
  CreditCard, 
  Cpu, 
  Shield, 
  MessageSquare, 
  Calendar, 
  Camera, 
  Code,
  Building2
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

interface Project {
  id: string;
  num: string;
  name: string;
  shortDesc: string;
  problem: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  clientLabel?: string;
  icon: React.ComponentType<any>;
  themeColor: string;
  mockupType: "map" | "terminal" | "survey" | "pos" | "flagship" | "code" | "shield" | "chat" | "calendar" | "camera";
}

export function Projects() {
  const [expandedId, setExpandedId] = useState<string | null>("01");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const personalProjects: Project[] = [
    {
      id: "01",
      num: "01",
      name: "Setu Identity Trust Graph",
      shortDesc: "Graph-based identity correlation & attack simulation engine.",
      problem: "Synthesizing cross-entity identity records, correlating high-risk nodes, and simulating fraud attack propagation vectors in real time. Built for Bank of Baroda Hackathon 2026.",
      tags: ["React", "TypeScript", "D3.js / Graph", "Python", "Tailwind CSS", "FastAPI"],
      githubUrl: "https://github.com/tejaspatel2255",
      demoUrl: "#",
      icon: Shield,
      themeColor: "text-emerald-400 border-emerald-400/20 bg-emerald-950/20",
      mockupType: "shield",
    },
    {
      id: "02",
      num: "02",
      name: "RepoLens AI Repository Analyzer",
      shortDesc: "MERN stack GitHub repository analyzer powered by OpenRouter AI.",
      problem: "Delivering automated codebase audits, architecture summaries, and security vulnerability scans with multi-model AI fallback routines.",
      tags: ["React", "Node.js", "Express", "MongoDB", "Supabase", "OpenRouter API"],
      githubUrl: "https://github.com/tejaspatel2255",
      demoUrl: "#",
      icon: Terminal,
      themeColor: "text-amber-400 border-amber-400/20 bg-amber-950/20",
      mockupType: "terminal",
    },
    {
      id: "03",
      num: "03",
      name: "FlowChat Secure Messaging",
      shortDesc: "Cross-platform Flutter chat app with hardware App Lock & biometrics.",
      problem: "Engineering real-time multi-platform messaging with hardware-backed encryption, background content masking, PIN/biometrics, and group streams.",
      tags: ["Flutter", "Dart", "Supabase", "SQLite", "Biometrics API", "Secure Storage"],
      githubUrl: "https://github.com/tejaspatel2255",
      demoUrl: "#",
      icon: MessageSquare,
      themeColor: "text-cyan-400 border-cyan-400/20 bg-cyan-950/20",
      mockupType: "chat",
    },
    {
      id: "04",
      num: "04",
      name: "Laptop Appointment Booking System",
      shortDesc: "Full-stack diagnostic scheduling & appointment management portal.",
      problem: "Streamlining service slot reservations, hardware diagnostic workflow logs, and real-time customer status notifications.",
      tags: ["AngularJS", "Node.js", "Express", "MongoDB", "Bootstrap"],
      githubUrl: "https://github.com/tejaspatel2255",
      demoUrl: "#",
      icon: Calendar,
      themeColor: "text-purple-400 border-purple-400/20 bg-purple-950/20",
      mockupType: "calendar",
    },
    {
      id: "05",
      num: "05",
      name: "Autonomous Agent CLI & Orchestrator",
      shortDesc: "Terminal-driven LLM multi-agent workflow visualizer & command palette.",
      problem: "Orchestrating tool execution loops, memory graphs, and structured JSON output for autonomous developer agent networks.",
      tags: ["Python", "LangChain", "Next.js", "TypeScript", "WebSockets", "FastAPI"],
      githubUrl: "https://github.com/tejaspatel2255",
      demoUrl: "#",
      icon: Cpu,
      themeColor: "text-accent border-accent/20 bg-accent/10",
      mockupType: "flagship",
    },
    {
      id: "06",
      num: "06",
      name: "EcoLearn Sustainability Dashboard",
      shortDesc: "Interactive environmental education platform & eco-metrics dashboard.",
      problem: "Visualizing carbon offset metrics, interactive map layers, and gamified environmental learning tracks for educational institutions.",
      tags: ["React", "TypeScript", "Leaflet.js", "Tailwind CSS", "Chart.js"],
      githubUrl: "https://github.com/tejaspatel2255",
      demoUrl: "#",
      icon: Map,
      themeColor: "text-emerald-400 border-emerald-400/20 bg-emerald-950/20",
      mockupType: "map",
    },
    {
      id: "07",
      num: "07",
      name: "Smart Face Recognition Attendance System",
      shortDesc: "Computer vision automated attendance logging engine with facial verification.",
      problem: "Automating classroom and office check-ins using deep learning face detection with anti-spoofing verification and real-time log exports.",
      tags: ["Python", "OpenCV", "TensorFlow", "Flask", "SQLite"],
      githubUrl: "https://github.com/tejaspatel2255",
      demoUrl: "#",
      icon: Camera,
      themeColor: "text-pink-400 border-pink-400/20 bg-pink-950/20",
      mockupType: "camera",
    },
    {
      id: "08",
      num: "08",
      name: "Low-Latency Telemetry & Analytics Pipeline",
      shortDesc: "High-throughput event ingestion and real-time dashboard visualizer.",
      problem: "Processing microservice event streams and rendering live WebSocket telemetry metrics with sub-50ms update latency.",
      tags: ["Node.js", "TypeScript", "PostgreSQL", "Redis", "Tailwind CSS"],
      githubUrl: "https://github.com/tejaspatel2255",
      demoUrl: "#",
      icon: Code,
      themeColor: "text-blue-400 border-blue-400/20 bg-blue-950/20",
      mockupType: "code",
    },
    {
      id: "09",
      num: "09",
      name: "Neo-Brutalist Portfolio Engine",
      shortDesc: "High-performance editorial web portfolio engine with AI CLI.",
      problem: "Crafting a 60fps editorial interface with Lenis smooth scroll, GSAP scrub timelines, custom dark tokens, and integrated Agent CLI modal.",
      tags: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "GSAP", "Lenis"],
      githubUrl: "https://github.com/tejaspatel2255/Portfolio",
      demoUrl: "https://github.com/tejaspatel2255/Portfolio",
      icon: Code,
      themeColor: "text-accent border-accent/20 bg-accent/10",
      mockupType: "flagship",
    },
    {
      id: "10",
      num: "10",
      name: "DevPulse Workspace Hub",
      shortDesc: "Minimalist developer task backlog and repository activity visualizer.",
      problem: "Unifying fragmented developer activity logs, commit histories, and task backlogs into a single terminal-inspired command overview.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "GraphQL", "Prisma"],
      githubUrl: "https://github.com/tejaspatel2255",
      demoUrl: "#",
      icon: Terminal,
      themeColor: "text-amber-400 border-amber-400/20 bg-amber-950/20",
      mockupType: "terminal",
    },
  ];

  const clientProjects: Project[] = [
    {
      id: "C1",
      num: "C1",
      name: "Savaliya Ice Cream Retail POS & Store System",
      shortDesc: "Custom retail point-of-sale & real-time inventory management software.",
      problem: "Managing high-volume counter sales transactions, real-time inventory updates, daily revenue reports, and receipt processing for Savaliya Ice Cream.",
      tags: ["TypeScript", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
      clientLabel: "Client Deliverable // Savaliya Ice Cream",
      icon: CreditCard,
      themeColor: "text-pink-400 border-pink-400/20 bg-pink-950/20",
      mockupType: "pos",
    },
    {
      id: "C2",
      num: "C2",
      name: "Community Health Survey & Data Collection Tool",
      shortDesc: "Offline-first health survey data aggregation web application.",
      problem: "Deploying responsive offline survey streams to capture field health metrics in low-connectivity rural zones with automated Supabase cloud sync.",
      tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
      clientLabel: "Client Deliverable // Community Health Org",
      icon: ClipboardList,
      themeColor: "text-cyan-400 border-cyan-400/20 bg-cyan-950/20",
      mockupType: "survey",
    },
  ];

  const reducedMotionPref = useReducedMotion();
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    setShouldReduceMotion(Boolean(reducedMotionPref));
  }, [reducedMotionPref]);

  const renderMockup = (type: Project["mockupType"]) => {
    switch (type) {
      case "shield":
        return (
          <div className="w-full h-full border border-emerald-500/20 bg-emerald-950/10 p-4 flex flex-col justify-between font-mono text-[9px] text-emerald-400/80 relative overflow-hidden">
            <div className="flex justify-between items-center border-b border-emerald-500/20 pb-2 z-10">
              <span className="font-bold">IDENTITY_GRAPH_NODE</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-2 my-2 z-10">
              <div className="border border-emerald-500/30 bg-emerald-950/40 p-2 text-center w-full">
                <span className="block text-[8px] text-emerald-500">SYNTHETIC_SCORE: 0.94</span>
                <span className="font-bold text-emerald-300">ALERT: ATTACK_VECTOR_DETECTED</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-[8px] border-t border-emerald-500/20 pt-2 z-10">
              <span>ENTITIES: 1,420</span>
              <span>CORRELATION: ACTIVE</span>
            </div>
          </div>
        );
      case "chat":
        return (
          <div className="w-full h-full border border-cyan-500/20 bg-cyan-950/10 p-4 flex flex-col justify-between font-mono text-[9px] text-cyan-400/80">
            <div className="flex justify-between items-center border-b border-cyan-500/20 pb-2">
              <span className="font-bold">FLOWCHAT_ENCRYPTED</span>
              <span className="text-cyan-300 bg-cyan-500/20 px-1 py-0.5 border border-cyan-500/30">APP_LOCKED</span>
            </div>
            <div className="flex-1 flex flex-col gap-2 justify-center py-2">
              <div className="self-start bg-cyan-950/40 border border-cyan-500/30 p-2 max-w-[80%]">
                <span>[BIOMETRIC AUTH PASSED]</span>
              </div>
              <div className="self-end bg-cyan-500/20 border border-cyan-400/40 p-2 text-cyan-200 max-w-[80%]">
                <span>Stream encrypted packet #1084</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-[8px] border-t border-cyan-500/20 pt-2">
              <span>STORAGE: AES-256</span>
              <span>PIN: ARMED</span>
            </div>
          </div>
        );
      case "calendar":
        return (
          <div className="w-full h-full border border-purple-500/20 bg-purple-950/10 p-4 flex flex-col justify-between font-mono text-[9px] text-purple-400/80">
            <div className="flex justify-between items-center border-b border-purple-500/20 pb-2">
              <span className="font-bold">DIAGNOSTIC_SCHEDULE</span>
              <span className="text-purple-300 bg-purple-500/20 px-1 py-0.5">SLOT_RESERVED</span>
            </div>
            <div className="flex-1 flex flex-col gap-1.5 justify-center py-2">
              <div className="flex justify-between border-b border-purple-500/20 pb-1">
                <span>10:30 AM / Hardware Check</span>
                <span className="text-emerald-400 font-bold">CONFIRMED</span>
              </div>
              <div className="flex justify-between border-b border-purple-500/20 pb-1">
                <span>02:15 PM / OS Reinstall</span>
                <span className="text-amber-400 font-bold">PENDING</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-[8px] border-t border-purple-500/20 pt-2">
              <span>SLOTS: 14 TODAY</span>
              <span>SYNC: COMPLETE</span>
            </div>
          </div>
        );
      case "camera":
        return (
          <div className="w-full h-full border border-pink-500/20 bg-pink-950/10 p-4 flex flex-col justify-between font-mono text-[9px] text-pink-400/80 relative overflow-hidden">
            <div className="flex justify-between items-center border-b border-pink-500/20 pb-2 z-10">
              <span className="font-bold">VISION_FRAME_CAPTURE</span>
              <span className="text-emerald-400 font-bold">MATCH 99.2%</span>
            </div>
            <div className="flex-1 flex items-center justify-center my-2 z-10 border border-dashed border-pink-500/40 p-2">
              <div className="text-center">
                <span className="block font-bold text-pink-300">[ FACE_DETECTED ]</span>
                <span className="text-[8px] text-pink-500">LOG_ID: #ATT_2026_09</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-[8px] border-t border-pink-500/20 pt-2 z-10">
              <span>OPENCV: 60 FPS</span>
              <span>ANTI-SPOOF: TRUE</span>
            </div>
          </div>
        );
      case "map":
        return (
          <div className="w-full h-full border border-emerald-500/20 bg-emerald-950/5 p-4 flex flex-col justify-between font-mono text-[9px] text-emerald-400/70 relative overflow-hidden">
            <div className="flex justify-between items-center border-b border-emerald-500/10 pb-2 z-10">
              <span className="font-bold">LEAFLET_GEO_NODE</span>
              <span className="text-[8px] bg-emerald-500/20 px-1 text-emerald-300">LIVE_METRICS</span>
            </div>
            <div className="flex-1 flex items-center justify-center relative my-2 z-10">
              <div className="border border-emerald-500/30 p-3 bg-background/80 text-center w-full">
                <span className="block text-[8px] text-emerald-500">ECO_INDEX</span>
                <span className="font-bold text-emerald-300 text-xs">88.4 PKT/HARVEST</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-[8px] border-t border-emerald-500/10 pt-2 z-10">
              <span>LAT: 21.1702 N</span>
              <span>LON: 72.8311 E</span>
            </div>
          </div>
        );
      case "terminal":
        return (
          <div className="w-full h-full border border-amber-500/20 bg-amber-950/5 p-4 flex flex-col justify-between font-mono text-[9px] text-amber-400/70">
            <div className="flex justify-between items-center border-b border-amber-500/10 pb-2">
              <span className="font-bold">REPOLENS_CLI</span>
              <span className="text-[8px] bg-amber-500/20 px-1 text-amber-300">GEMINI_2.5</span>
            </div>
            <div className="flex-1 flex flex-col gap-1 justify-center font-mono py-2">
              <span className="text-amber-500">&gt; querying openrouter API...</span>
              <span className="text-amber-300">&gt; parsing architecture nodes...</span>
              <span className="text-emerald-400 font-bold">&gt; AUDIT_COMPLETE: 0 VULNS</span>
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
              <div className="px-3 py-1.5 border border-accent bg-accent/10 text-accent font-bold uppercase tracking-widest z-10 backdrop-blur-sm">
                [ CORE_ORCHESTRATOR ]
              </div>
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

  const renderProjectRow = (project: Project, idx: number) => {
    const isExpanded = expandedId === project.id;
    const isHovered = hoveredId === project.id;
    const ProjectIcon = project.icon;

    return (
      <motion.div
        key={project.id}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setHoveredId(project.id)}
        onMouseLeave={() => setHoveredId(null)}
        className="w-full border-b border-border-strong flex flex-col group/row relative overflow-hidden"
      >
        {/* Accordion Row Header */}
        <button
          onClick={() => handleRowClick(project.id)}
          aria-expanded={isExpanded}
          data-cursor-label={`PROJECT_${project.num}`}
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
            <span className={`p-2 border border-border-subtle group-hover/row:border-accent transition-colors ${project.themeColor}`}>
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

        {/* Hover Tech Stack Marquee */}
        {isHovered && !isExpanded && !shouldReduceMotion && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden py-1 px-2 bg-accent/5 border-t border-accent/20 font-mono text-[9px] text-accent flex items-center justify-between"
          >
            <span>TECH STACK // {project.tags.join(" • ")}</span>
            <span className="text-[8px] uppercase tracking-wider text-ink-muted">Click to view details</span>
          </motion.div>
        )}

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

                  {/* Links & Badges Row */}
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor-label="VIEW_CODE"
                        className="inline-block"
                      >
                        <Button variant="brutalist" size="sm">
                          View Code <GithubIcon className="w-3.5 h-3.5 ml-1.5 inline-block" />
                        </Button>
                      </a>
                    )}
                    {project.demoUrl && project.demoUrl !== "#" && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor-label="LIVE_DEMO"
                        className="inline-block"
                      >
                        <Button variant="secondary" size="sm">
                          Live Demo <ArrowUpRight className="w-3.5 h-3.5 ml-1 inline-block" />
                        </Button>
                      </a>
                    )}
                    {project.clientLabel && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-accent/30 bg-accent/10 font-mono text-[10px] text-accent uppercase tracking-wider">
                        <Building2 className="w-3 h-3 text-accent" />
                        {project.clientLabel}
                      </span>
                    )}
                  </div>
                </div>

                {/* Interactive Wireframe Mockup */}
                <div className="md:col-span-5 aspect-[4/3] w-full bg-background border border-border-strong p-2 transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_20px_rgba(204,255,0,0.1)]">
                  {renderMockup(project.mockupType)}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <SectionWrapper id="work" borderTop={true}>
      <div className="flex flex-col gap-16">
        
        {/* Personal Projects Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Heading */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div>
              <span className="font-mono text-[10px] text-accent uppercase tracking-widest block">// SELECTED REPOS</span>
              <Heading tag="h2" size="h2" animate="words" titleText="PROJECTS SHOWCASE" className="text-ink-primary mt-2" />
            </div>
            <p className="text-sm text-ink-muted leading-relaxed font-light max-w-sm mt-2">
              An editorial catalog of 10 personal software repositories. Click any row to expand implementation details, core technologies, and deployment mirrors.
            </p>
          </div>

          {/* Right Column: Editorial Accordion list */}
          <div className="lg:col-span-8 flex flex-col w-full border-t border-border-strong">
            {personalProjects.map((project, idx) => renderProjectRow(project, idx))}
          </div>
        </div>

        {/* Client Work Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start border-t border-border-subtle pt-12">
          {/* Left Column: Client Work Heading */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div>
              <span className="font-mono text-[10px] text-accent uppercase tracking-widest block">// CLIENT DELIVERABLES</span>
              <Heading tag="h2" size="h2" animate="words" titleText="CLIENT WORK" className="text-ink-primary mt-2" />
            </div>
            <p className="text-sm text-ink-muted leading-relaxed font-light max-w-sm mt-2">
              Bespoke commercial software deliverables engineered for retail businesses and community organizations.
            </p>
          </div>

          {/* Right Column: Client Accordion list */}
          <div className="lg:col-span-8 flex flex-col w-full border-t border-border-strong">
            {clientProjects.map((project, idx) => renderProjectRow(project, idx))}
          </div>
        </div>

        {/* Next Section Bridge */}
        <div className="w-full flex justify-end border-t border-border-subtle pt-6">
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

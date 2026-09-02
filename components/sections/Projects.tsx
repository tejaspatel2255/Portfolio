"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { 
  ArrowUpRight, 
  ChevronDown, 
  TrendingUp, 
  Terminal, 
  CreditCard, 
  Wallet, 
  Radio, 
  BarChart2, 
  Activity, 
  Scale, 
  Leaf, 
  Package, 
  Users, 
  Building2,
  Cpu
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
  mockupType: string;
}

export function Projects() {
  const [expandedId, setExpandedId] = useState<string | null>("01");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const personalProjects: Project[] = [
    {
      id: "01",
      num: "01",
      name: "AI-Powered Paper Trading Web App",
      shortDesc: "Virtual Indian stock market (NSE/BSE) trading simulator with AI signal engine.",
      problem: "Virtual Indian stock market (NSE/BSE) trading simulator with ₹10,00,000 of virtual capital, real-time quotes and charts, and an AI signal engine (Random Forest) predicting Buy/Hold/Sell calls.",
      tags: ["React (Vite)", "Tailwind CSS", "Recharts", "FastAPI (Python)", "Supabase (Postgres)", "scikit-learn"],
      githubUrl: "https://github.com/tejaspatel2255/AI-Powered-Paper-Trading-Web-App",
      demoUrl: "https://ai-powered-paper-trading-web-app.vercel.app/",
      icon: TrendingUp,
      themeColor: "text-emerald-400 border-emerald-400/20 bg-emerald-950/20",
      mockupType: "trading",
    },
    {
      id: "02",
      num: "02",
      name: "CodeLens AI",
      shortDesc: "Full-stack AI code-intelligence platform with live memory visualizer.",
      problem: "Step-by-step execution tracing with a live memory visualizer, a defect scanner with 1-click fix, an automated test generator, a multi-language transpiler, and a context-aware AI chat assistant.",
      tags: ["React 18", "Vite", "Tailwind CSS", "Framer Motion", "Node.js/Express", "Supabase", "Groq (Llama 3.3 70B)"],
      githubUrl: "https://github.com/tejaspatel2255/CodeLens-AI",
      demoUrl: "https://code-lens-ai-gray.vercel.app/",
      icon: Terminal,
      themeColor: "text-amber-400 border-amber-400/20 bg-amber-950/20",
      mockupType: "codelens",
    },
    {
      id: "03",
      num: "03",
      name: "POS Web App (Universal Multi-Tenant SaaS POS)",
      shortDesc: "Multi-tenant SaaS point-of-sale platform with offline-first billing.",
      problem: "Multi-tenant SaaS point-of-sale platform with offline-first billing (IndexedDB + Service Worker/PWA), role-based access control, real-time sales dashboards, and per-store brand/theme customization.",
      tags: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "Zustand", "TanStack Query", "Supabase"],
      githubUrl: "https://github.com/tejaspatel2255/POS-Web-App",
      demoUrl: "https://pos-web-app-murex.vercel.app/",
      icon: CreditCard,
      themeColor: "text-cyan-400 border-cyan-400/20 bg-cyan-950/20",
      mockupType: "pos",
    },
    {
      id: "04",
      num: "04",
      name: "FinanceFlow — AI-Powered Personal Finance Dashboard",
      shortDesc: "Personal finance tracker with cashflow analytics & multi-model AI fallback.",
      problem: "Personal finance tracker with interactive cashflow analytics, natural-language queries about your spending, branded PDF statement exports, and a multi-model AI fallback chain for summaries.",
      tags: ["React", "Vite", "Tailwind CSS", "Recharts", "Node.js/Express", "Supabase", "OpenRouter (Gemini/Llama)"],
      githubUrl: "https://github.com/tejaspatel2255/FinanceFlow-with-AI-insights",
      demoUrl: "https://finance-flow-with-ai-insights.vercel.app/",
      icon: Wallet,
      themeColor: "text-purple-400 border-purple-400/20 bg-purple-950/20",
      mockupType: "finance",
    },
    {
      id: "05",
      num: "05",
      name: "CrisisSwarm — Multi-Agent Disaster Response",
      shortDesc: "Multi-agent disaster response system (Microsoft Build AI Hackathon 2026).",
      problem: "Multi-agent disaster-response system where six specialized agents (Commander, Triage, Resource, Routing, Comms, Reporter) share one situation brief and coordinate casualty triage, resource allocation, and public alerts in real time.",
      tags: ["Python", "Groq (Llama 3.3)", "Streamlit", "Docker"],
      githubUrl: "https://github.com/tejaspatel2255/Mircosoft-crisisswarm",
      demoUrl: "https://mircosoft-crisisswarm-4tt3i7yffmkwvdn6w9kiv7.streamlit.app/",
      icon: Radio,
      themeColor: "text-accent border-accent/20 bg-accent/10",
      mockupType: "disaster",
    },
    {
      id: "06",
      num: "06",
      name: "Market Analysis — AI Stock Analysis Platform",
      shortDesc: "AI market analyst chat agent for Indian & global market intelligence.",
      problem: "AI market analyst chat agent for real-time insight on Indian and global markets, presented in a glassmorphic \"cosmic night\" interface.",
      tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Python", "FastAPI", "LangChain"],
      githubUrl: "https://github.com/tejaspatel2255/Market-Analysis",
      icon: BarChart2,
      themeColor: "text-blue-400 border-blue-400/20 bg-blue-950/20",
      mockupType: "market",
    },
    {
      id: "07",
      num: "07",
      name: "HealthCompanion — AI Triage Assistant",
      shortDesc: "Educational AI health-triage companion with structured PDF summaries.",
      problem: "Educational AI health-triage companion that asks clarifying questions, accepts optional vitals input, and exports a structured PDF summary — built explicitly as an educational tool, not a diagnostic one.",
      tags: ["React (CRA)", "Tailwind CSS", "jsPDF", "FastAPI", "Groq (Llama 3)", "Web Speech API"],
      githubUrl: "https://github.com/tejaspatel2255/HealthCompanion-AI-Triage-Assistant",
      icon: Activity,
      themeColor: "text-rose-400 border-rose-400/20 bg-rose-950/20",
      mockupType: "health",
    },
    {
      id: "08",
      num: "08",
      name: "Bitcoin Prediction & AI Insight App",
      shortDesc: "Ensemble ML forecasting platform (Prophet + LSTM + Random Forest) for BTC.",
      problem: "Ensemble ML forecasting platform (Prophet + LSTM + Random Forest) for Bitcoin price trends, paired with AI-generated market reports on an interactive Streamlit dashboard.",
      tags: ["Python", "FastAPI", "Streamlit", "TensorFlow", "scikit-learn", "Prophet", "Supabase", "OpenRouter"],
      githubUrl: "https://github.com/tejaspatel2255/Bitcoin-Prediction",
      icon: TrendingUp,
      themeColor: "text-amber-400 border-amber-400/20 bg-amber-950/20",
      mockupType: "bitcoin",
    },
    {
      id: "09",
      num: "09",
      name: "Explainable AI — Loan Approval Decision System",
      shortDesc: "Credit-decision support system with SHAP/LIME default risk auditing.",
      problem: "Credit-decision support system that predicts loan default risk with SHAP/LIME/counterfactual explanations, cross-group fairness auditing, and governance artifacts (model cards, audit logs) for regulatory compliance.",
      tags: ["Python", "scikit-learn", "XGBoost", "SHAP/LIME", "FastAPI", "Streamlit"],
      githubUrl: "https://github.com/tejaspatel2255/Explainable-AI-Loan-Approval_Decision",
      icon: Scale,
      themeColor: "text-indigo-400 border-indigo-400/20 bg-indigo-950/20",
      mockupType: "xai",
    },
    {
      id: "10",
      num: "10",
      name: "EcoLearn — Gamified Environmental Education Platform",
      shortDesc: "Role-based environmental learning platform with AI eco-tutor.",
      problem: "Role-based (Student / Teacher / Admin) environmental education platform with interactive lessons, real-world eco-challenges, badges, leaderboards, and an AI eco-tutor for hint-only guidance.",
      tags: ["Next.js", "React 19", "TypeScript", "Tailwind CSS v4", "Framer Motion", "Express", "MongoDB", "Gemini API"],
      githubUrl: "https://github.com/tejaspatel2255/ecolearn",
      demoUrl: "https://ecolearn-frontend-delta.vercel.app/",
      icon: Leaf,
      themeColor: "text-emerald-400 border-emerald-400/20 bg-emerald-950/20",
      mockupType: "ecolearn",
    },
  ];

  const clientProjects: Project[] = [
    {
      id: "C1",
      num: "C1",
      name: "Blazze Overseas LLP",
      shortDesc: "Export site for premium spices, grains & pulses with WhatsApp enquiry flow.",
      problem: "Marketing and export site for a premium spices, grains, and pulses exporter — product catalog by category, certifications (ISO/FSSAI/APEDA), and a WhatsApp-first multi-country enquiry flow.",
      tags: ["Next.js", "Tailwind CSS", "Framer Motion", "WhatsApp Integration"],
      demoUrl: "https://blaze-overseas-llp.vercel.app/",
      clientLabel: "Client Deliverable // Blazze Overseas LLP",
      icon: Package,
      themeColor: "text-amber-400 border-amber-400/20 bg-amber-950/20",
      mockupType: "blazze",
    },
    {
      id: "C2",
      num: "C2",
      name: "Family Registry (Blood Group Collection App)",
      shortDesc: "Multi-role Flutter app for digitizing family blood-group records.",
      problem: "Multi-role (Admin / Operator / Head of Family) Flutter app for digitizing family blood-group records via a guided 4-step registration form, with international phone support and offline-resilient draft saving.",
      tags: ["Flutter (Dart)", "Supabase (Postgres + Auth)", "Storage", "Provider", "GoRouter"],
      githubUrl: "https://github.com/tejaspatel2255/family-registry",
      clientLabel: "Client Deliverable // Family Registry",
      icon: Users,
      themeColor: "text-rose-400 border-rose-400/20 bg-rose-950/20",
      mockupType: "family",
    },
  ];

  const reducedMotionPref = useReducedMotion();
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    setShouldReduceMotion(Boolean(reducedMotionPref));
  }, [reducedMotionPref]);

  const renderMockup = (type: string) => {
    switch (type) {
      case "trading":
        return (
          <div className="w-full h-full border border-emerald-500/20 bg-emerald-950/10 p-4 flex flex-col justify-between font-mono text-[9px] text-emerald-400/80 relative overflow-hidden">
            <div className="flex justify-between items-center border-b border-emerald-500/20 pb-2 z-10">
              <span className="font-bold">NIFTY50_PAPER_TRADER</span>
              <span className="text-emerald-300 bg-emerald-500/20 px-1 py-0.5">CAPITAL: ₹10,00,000</span>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-1.5 my-2 z-10">
              <div className="flex justify-between border-b border-emerald-500/10 pb-1">
                <span>SIGNAL ENGINE: RANDOM_FOREST</span>
                <span className="text-emerald-400 font-bold">BUY CALL 88.4%</span>
              </div>
              <div className="flex justify-between text-emerald-300">
                <span>RECHARTS CANE_STICK</span>
                <span>PROFIT: +₹42,150</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-[8px] border-t border-emerald-500/20 pt-2 z-10">
              <span>SUPABASE RLS</span>
              <span>LIVE QUOTES: ACTIVE</span>
            </div>
          </div>
        );
      case "codelens":
        return (
          <div className="w-full h-full border border-amber-500/20 bg-amber-950/10 p-4 flex flex-col justify-between font-mono text-[9px] text-amber-400/80 relative overflow-hidden">
            <div className="flex justify-between items-center border-b border-amber-500/20 pb-2 z-10">
              <span className="font-bold">CODELENS_TRACER.ts</span>
              <span className="text-amber-300 bg-amber-500/20 px-1 py-0.5">GROQ LLAMA-3.3</span>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-1 my-2 z-10">
              <span className="text-amber-500">&gt; Memory trace node #04...</span>
              <span className="text-amber-300">&gt; 1-click defect fix suggested</span>
              <span className="text-emerald-400 font-bold">&gt; Transpiler: TS -&gt; Python</span>
            </div>
            <div className="flex justify-between items-center text-[8px] border-t border-amber-500/20 pt-2 z-10">
              <span>MEMORY VISUALIZER</span>
              <span>LATENCY: 14ms</span>
            </div>
          </div>
        );
      case "finance":
        return (
          <div className="w-full h-full border border-purple-500/20 bg-purple-950/10 p-4 flex flex-col justify-between font-mono text-[9px] text-purple-400/80">
            <div className="flex justify-between items-center border-b border-purple-500/20 pb-2">
              <span className="font-bold">FINANCEFLOW_AI</span>
              <span className="text-purple-300 bg-purple-500/20 px-1 py-0.5">CASHFLOW</span>
            </div>
            <div className="flex-1 flex flex-col gap-1.5 justify-center py-2">
              <div className="flex justify-between border-b border-purple-500/20 pb-1">
                <span>NL Query: &quot;Monthly Spend&quot;</span>
                <span className="text-emerald-400 font-bold">-$1,420</span>
              </div>
              <div className="flex justify-between text-purple-300">
                <span>PDF Statement Export</span>
                <span className="font-bold">OPENROUTER SYNC</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-[8px] border-t border-purple-500/20 pt-2">
              <span>FALLBACK CHAIN</span>
              <span>GEMINI / LLAMA</span>
            </div>
          </div>
        );
      case "disaster":
        return (
          <div className="w-full h-full border border-accent/20 bg-accent/5 p-4 flex flex-col justify-between font-mono text-[9px] text-accent/80 relative overflow-hidden">
            <div className="flex justify-between items-center border-b border-accent/15 pb-2 z-10">
              <span className="font-bold">CRISIS_SWARM_ORCH</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            </div>
            <div className="flex-1 flex items-center justify-center relative my-2">
              <div className="text-center px-3 py-1.5 border border-accent bg-accent/10 text-accent font-bold uppercase tracking-widest z-10">
                [ 6 AGENTS ACTIVE ]
              </div>
            </div>
            <div className="flex justify-between items-center text-[8px] border-t border-accent/15 pt-2 z-10">
              <span>MS BUILD HACKATHON</span>
              <span>GROQ LLAMA-3.3</span>
            </div>
          </div>
        );
      case "market":
        return (
          <div className="w-full h-full border border-blue-500/20 bg-blue-950/10 p-4 flex flex-col justify-between font-mono text-[9px] text-blue-400/80">
            <div className="flex justify-between items-center border-b border-blue-500/20 pb-2">
              <span className="font-bold">MARKET_ANALYST_AI</span>
              <span className="text-blue-300 bg-blue-500/20 px-1 py-0.5">FASTAPI</span>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-1 my-2">
              <span className="text-blue-300">&gt; Cosmic Night Glassmorphism</span>
              <span className="text-emerald-400 font-bold">&gt; LangChain query agent ready</span>
            </div>
            <div className="flex justify-between items-center text-[8px] border-t border-blue-500/20 pt-2">
              <span>GLOBAL &amp; NSE DATA</span>
              <span>STREAM: ACTIVE</span>
            </div>
          </div>
        );
      case "health":
        return (
          <div className="w-full h-full border border-rose-500/20 bg-rose-950/10 p-4 flex flex-col justify-between font-mono text-[9px] text-rose-400/80">
            <div className="flex justify-between items-center border-b border-rose-500/20 pb-2">
              <span className="font-bold">HEALTH_TRIAGE_AI</span>
              <span className="text-rose-300 bg-rose-500/20 px-1 py-0.5">EDUCATIONAL</span>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-1 my-2">
              <span>Clarifying vitals prompt...</span>
              <span className="text-emerald-400 font-bold">jsPDF summary generated</span>
            </div>
            <div className="flex justify-between items-center text-[8px] border-t border-rose-500/20 pt-2">
              <span>GROQ LLAMA-3</span>
              <span>SPEECH API</span>
            </div>
          </div>
        );
      case "bitcoin":
        return (
          <div className="w-full h-full border border-amber-500/20 bg-amber-950/10 p-4 flex flex-col justify-between font-mono text-[9px] text-amber-400/80">
            <div className="flex justify-between items-center border-b border-amber-500/20 pb-2">
              <span className="font-bold">BTC_ENSEMBLE_ML</span>
              <span className="text-amber-300 bg-amber-500/20 px-1 py-0.5">STREAMLIT</span>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-1 my-2">
              <span>Models: Prophet + LSTM + RF</span>
              <span className="text-emerald-400 font-bold">OpenRouter report ready</span>
            </div>
            <div className="flex justify-between items-center text-[8px] border-t border-amber-500/20 pt-2">
              <span>TENSORFLOW</span>
              <span>GEMINI FLASH</span>
            </div>
          </div>
        );
      case "xai":
        return (
          <div className="w-full h-full border border-indigo-500/20 bg-indigo-950/10 p-4 flex flex-col justify-between font-mono text-[9px] text-indigo-400/80">
            <div className="flex justify-between items-center border-b border-indigo-500/20 pb-2">
              <span className="font-bold">EXPLAINABLE_AI_XAI</span>
              <span className="text-indigo-300 bg-indigo-500/20 px-1 py-0.5">SHAP / LIME</span>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-1 my-2">
              <span>Default risk XGBoost tree...</span>
              <span className="text-emerald-400 font-bold">Fairness audit: PASS</span>
            </div>
            <div className="flex justify-between items-center text-[8px] border-t border-indigo-500/20 pt-2">
              <span>MODEL CARDS</span>
              <span>REGULATORY OK</span>
            </div>
          </div>
        );
      case "ecolearn":
        return (
          <div className="w-full h-full border border-emerald-500/20 bg-emerald-950/10 p-4 flex flex-col justify-between font-mono text-[9px] text-emerald-400/80">
            <div className="flex justify-between items-center border-b border-emerald-500/20 pb-2">
              <span className="font-bold">ECOLEARN_GAMIFIED</span>
              <span className="text-emerald-300 bg-emerald-500/20 px-1 py-0.5">GEMINI TUTOR</span>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-1 my-2">
              <span>Student / Teacher Portal</span>
              <span className="text-emerald-400 font-bold">Leaderboard Socket.io</span>
            </div>
            <div className="flex justify-between items-center text-[8px] border-t border-emerald-500/20 pt-2">
              <span>NEXT.JS 19</span>
              <span>MONGODB SYNC</span>
            </div>
          </div>
        );
      case "blazze":
        return (
          <div className="w-full h-full border border-amber-500/20 bg-amber-950/10 p-4 flex flex-col justify-between font-mono text-[9px] text-amber-400/80">
            <div className="flex justify-between items-center border-b border-amber-500/20 pb-2">
              <span className="font-bold">BLAZZE_OVERSEAS_LLP</span>
              <span className="text-amber-300 bg-amber-500/20 px-1 py-0.5">EXPORTER</span>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-1 my-2">
              <span>Catalog: Spices &amp; Grains</span>
              <span className="text-emerald-400 font-bold">ISO / APEDA Verified</span>
            </div>
            <div className="flex justify-between items-center text-[8px] border-t border-amber-500/20 pt-2">
              <span>NEXT.JS + TAILWIND</span>
              <span>WHATSAPP FLOW</span>
            </div>
          </div>
        );
      case "family":
        return (
          <div className="w-full h-full border border-rose-500/20 bg-rose-950/10 p-4 flex flex-col justify-between font-mono text-[9px] text-rose-400/80">
            <div className="flex justify-between items-center border-b border-rose-500/20 pb-2">
              <span className="font-bold">FAMILY_BLOOD_REGISTRY</span>
              <span className="text-rose-300 bg-rose-500/20 px-1 py-0.5">FLUTTER</span>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-1 my-2">
              <span>4-Step Guided Registration</span>
              <span className="text-emerald-400 font-bold">Supabase Draft Sync</span>
            </div>
            <div className="flex justify-between items-center text-[8px] border-t border-rose-500/20 pt-2">
              <span>INTL PHONE SUPPORT</span>
              <span>OFFLINE READY</span>
            </div>
          </div>
        );
      case "pos":
      default:
        return (
          <div className="w-full h-full border border-cyan-500/20 bg-cyan-950/10 p-4 flex flex-col justify-between font-mono text-[9px] text-cyan-400/80">
            <div className="flex justify-between items-center border-b border-cyan-500/20 pb-2">
              <span className="font-bold">SAAS_POS_BILLING</span>
              <span className="text-cyan-300 bg-cyan-500/20 px-1 py-0.5">OFFLINE PWA</span>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-1 my-2">
              <span>Multi-Tenant Store Engine</span>
              <span className="text-emerald-400 font-bold">IndexedDB + RLS</span>
            </div>
            <div className="flex justify-between items-center text-[8px] border-t border-cyan-500/20 pt-2">
              <span>ZUSTAND STATE</span>
              <span>TANSTACK QUERY</span>
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
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor-label="LIVE_DEMO"
                        className="inline-block"
                      >
                        <Button variant="secondary" size="sm">
                          {project.githubUrl ? "Live Demo" : "Visit Site"} <ArrowUpRight className="w-3.5 h-3.5 ml-1 inline-block" />
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
              Bespoke commercial software deliverables engineered for retail businesses and export clients.
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

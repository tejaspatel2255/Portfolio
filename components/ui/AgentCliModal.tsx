"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, CornerDownLeft } from "lucide-react";

interface LogEntry {
  id: string;
  type: "input" | "output" | "system" | "success" | "error";
  text: string;
}

export function AgentCliModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [isExecuting, setIsExecuting] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [logs, setLogs] = useState<LogEntry[]>([
    { id: "1", type: "system", text: "TEJAS PATEL // COMMAND PALETTE & AI AGENT CLI v2.4.0" },
    { id: "2", type: "system", text: "Type 'help' for commands (e.g., 'work', 'skills', 'contact', 'copy email', 'resume', 'run agent')." },
  ]);

  // Console.log easter-egg hint on initial page load
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log(
        "%c⚡ [TEJAS PATEL // AI SYSTEMS PORTFOLIO]\nPress Ctrl+K or ~ to launch the Command Palette & Autonomous AI Agent CLI.",
        "color: #C8FF44; font-family: monospace; font-size: 12px; font-weight: bold; background: #0E0E10; padding: 6px 12px; border: 1px solid #C8FF44;"
      );
    }
  }, []);

  // Global keydown listeners for Ctrl+K, Cmd+K, or ~
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "`" || e.key === "~") {
        if (document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
          e.preventDefault();
          setIsOpen((prev) => !prev);
        }
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input on modal open & auto scroll logs
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const addLog = (type: LogEntry["type"], text: string) => {
    setLogs((prev) => [...prev, { id: Math.random().toString(), type, text }]);
  };

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      addLog("success", `Navigated to section #${sectionId}`);
      setTimeout(() => setIsOpen(false), 400);
    } else {
      addLog("error", `Section #${sectionId} not found.`);
    }
  };

  const handleCommandSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd || isExecuting) return;

    // Record in input history
    setHistory((prev) => [cmd, ...prev]);
    setHistoryIdx(-1);
    addLog("input", `> ${cmd}`);
    setInputVal("");

    const lowerCmd = cmd.toLowerCase();

    if (lowerCmd === "clear") {
      setLogs([]);
      return;
    }

    if (lowerCmd === "exit" || lowerCmd === "close") {
      setIsOpen(false);
      return;
    }

    if (lowerCmd === "help") {
      addLog("output", "AVAILABLE COMMANDS:");
      addLog("output", "  work / projects    — Jump to Selected Repos Showcase");
      addLog("output", "  about              — Jump to Bio & Architecture details");
      addLog("output", "  services           — Jump to Core Offerings grid");
      addLog("output", "  skills             — Jump to Technical Marquee section");
      addLog("output", "  contact            — Jump to Query Dispatcher form");
      addLog("output", "  copy email         — Copy email address to clipboard");
      addLog("output", "  resume / view resume — Open CV / Resume PDF");
      addLog("output", "  run agent          — Trigger autonomous LLM reasoning loop simulation");
      addLog("output", "  status             — Print system diagnostics & memory latency");
      addLog("output", "  clear / exit       — Clear logs or close palette modal");
      return;
    }

    // Section Navigation Commands
    if (lowerCmd === "work" || lowerCmd === "projects") {
      scrollToSection("work");
      return;
    }
    if (lowerCmd === "about") {
      scrollToSection("about");
      return;
    }
    if (lowerCmd === "services") {
      scrollToSection("services");
      return;
    }
    if (lowerCmd === "skills") {
      scrollToSection("skills");
      return;
    }
    if (lowerCmd === "contact") {
      scrollToSection("contact");
      return;
    }
    if (lowerCmd === "testimonials") {
      scrollToSection("testimonials");
      return;
    }

    // Action Commands
    if (lowerCmd === "copy email" || lowerCmd === "email") {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText("placeholder_email@gmail.com");
        addLog("success", "SUCCESS: Email 'placeholder_email@gmail.com' copied to clipboard.");
      } else {
        addLog("output", "Email: placeholder_email@gmail.com");
      }
      return;
    }

    if (lowerCmd === "resume" || lowerCmd === "view resume") {
      window.open("/resume.pdf", "_blank");
      addLog("success", "Opened /resume.pdf in a new tab.");
      return;
    }

    if (lowerCmd === "status") {
      addLog("system", "SYSTEM_DIAGNOSTICS:");
      addLog("output", "  Framework: Next.js 16 / React 19 / TypeScript");
      addLog("output", "  Animation Engine: GSAP ScrollTrigger + Lenis Smooth Scroll");
      addLog("output", "  Memory Buffer: 256MB allocated");
      addLog("output", "  Latency: 38ms average across agent nodes");
      addLog("success", "  All agentic subroutines operating at 100% efficiency.");
      return;
    }

    if (lowerCmd === "run agent" || lowerCmd === "agent") {
      setIsExecuting(true);
      addLog("system", "[AGENT_START] Initializing multi-node reasoning loop...");

      const steps = [
        { type: "output" as const, text: "[STEP 1/4] Parsing repository AST nodes and code state...", delay: 400 },
        { type: "output" as const, text: "[STEP 2/4] Querying Vector Database for semantic context matches...", delay: 900 },
        { type: "output" as const, text: "[STEP 3/4] Synthesizing tool calls & autonomous execution graph...", delay: 1400 },
        { type: "success" as const, text: "[STEP 4/4] SUCCESS: Autonomous task completed in 42ms with 0 errors.", delay: 1900 },
      ];

      for (const step of steps) {
        await new Promise((res) => setTimeout(res, step.delay));
        addLog(step.type, step.text);
      }

      setIsExecuting(false);
      return;
    }

    // Default fallback
    addLog("error", `Command not recognized: '${cmd}'. Type 'help' for available commands.`);
  };

  const handleKeyDownHistory = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0 && historyIdx < history.length - 1) {
        const nextIdx = historyIdx + 1;
        setHistoryIdx(nextIdx);
        setInputVal(history[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const prevIdx = historyIdx - 1;
        setHistoryIdx(prevIdx);
        setInputVal(history[prevIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputVal("");
      }
    }
  };

  return (
    <>
      {/* Discreet Persistent Floating Trigger Pill (Bottom Left) */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open Command Palette & Agent CLI"
        data-cursor-label="CLI_PALETTE"
        className="fixed bottom-6 left-6 z-40 px-3.5 py-2 border border-border-strong bg-background/95 backdrop-blur-md font-mono text-[10px] uppercase text-accent tracking-wider flex items-center gap-2 hover:border-accent hover:shadow-[0_0_15px_rgba(204,255,0,0.15)] transition-all cursor-none select-none"
      >
        <Terminal className="w-3.5 h-3.5 text-accent animate-pulse" />
        <span className="hidden sm:inline">&gt; AGENT_CLI</span>
        <span className="bg-accent/15 px-1.5 py-0.5 text-[8px] text-accent border border-accent/30 font-bold">[Ctrl+K]</span>
      </button>

      {/* Command Palette Modal Dialog Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl border-2 border-border-strong bg-background shadow-2xl flex flex-col overflow-hidden max-h-[80vh]"
            >
              {/* Terminal Title Bar */}
              <div className="bg-surface border-b border-border-strong px-4 py-3 flex items-center justify-between font-mono text-xs select-none">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                  <span className="font-bold text-ink-primary">TEJAS_PATEL_COMMAND_PALETTE.sh</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[9px] text-ink-muted hidden sm:inline">ESC TO CLOSE</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:text-accent text-ink-muted transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Logs & Command Window */}
              <div className="p-4 sm:p-6 flex-1 overflow-y-auto font-mono text-xs leading-relaxed space-y-2 max-h-[50vh] bg-background/90">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className={`flex items-start gap-2 ${
                      log.type === "input"
                        ? "text-ink-primary font-bold"
                        : log.type === "system"
                        ? "text-accent font-semibold"
                        : log.type === "success"
                        ? "text-emerald-400 font-semibold"
                        : log.type === "error"
                        ? "text-rose-400 font-semibold"
                        : "text-ink-secondary font-light"
                    }`}
                  >
                    <span>{log.text}</span>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Input Form Bar */}
              <form onSubmit={handleCommandSubmit} className="border-t border-border-strong bg-surface p-3 flex items-center gap-2">
                <span className="font-mono text-accent text-xs font-bold pl-2">&gt;</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDownHistory}
                  disabled={isExecuting}
                  placeholder={isExecuting ? "Executing command..." : "Type command e.g. 'work', 'skills', 'copy email', 'resume', 'run agent'"}
                  className="flex-1 bg-transparent font-mono text-xs text-ink-primary focus:outline-none placeholder:text-ink-muted/50 cursor-text"
                />
                <button
                  type="submit"
                  disabled={isExecuting}
                  className="px-3 py-1.5 border border-border-strong bg-background hover:border-accent hover:text-accent font-mono text-[10px] uppercase text-ink-primary flex items-center gap-1 transition-colors"
                >
                  <span>EXEC</span>
                  <CornerDownLeft className="w-3 h-3" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

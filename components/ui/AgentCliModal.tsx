"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, CornerDownLeft } from "lucide-react";
import { useLenis } from "@/components/ui/AnimationProvider";

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
  
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const nextIdRef = useRef(3);
  const lenis = useLenis();

  const [logs, setLogs] = useState<LogEntry[]>([
    { id: "1", type: "system", text: "TEJAS PATEL // COMMAND PALETTE & AI AGENT CLI" },
    { id: "2", type: "system", text: "Type 'help' for commands (e.g., 'work', 'about', 'skills', 'experience', 'contact', 'copy email', 'resume')." },
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

  // Modal open/close: focus input & lock scroll via Lenis
  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
      setTimeout(() => inputRef.current?.focus(), 100);
      return () => {
        lenis?.start();
      };
    }
  }, [isOpen, lenis]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const addLog = (type: LogEntry["type"], text: string) => {
    const id = String(nextIdRef.current++);
    setLogs((prev) => [...prev, { id, type, text }]);
  };

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      if (lenis) {
        lenis.scrollTo(target);
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
      addLog("success", `Navigated to section #${sectionId}`);
      setTimeout(() => setIsOpen(false), 400);
    } else {
      addLog("error", `Section #${sectionId} not found.`);
    }
  };

  const handleCommandSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    // Record in input history
    setHistory((prev) => [cmd, ...prev]);
    setHistoryIdx(-1);
    addLog("input", `> ${cmd}`);
    setInputVal("");

    const lowerCmd = cmd.toLowerCase();

    if (lowerCmd === "clear") {
      setLogs([]);
      inputRef.current?.focus();
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
      addLog("output", "  experience         — Jump to Experience Timeline section");
      addLog("output", "  contact            — Jump to Query Dispatcher form");
      addLog("output", "  copy email         — Copy email address to clipboard");
      addLog("output", "  resume / view resume — Open CV / Resume PDF");
      addLog("output", "  clear / exit       — Clear logs or close palette modal");
      inputRef.current?.focus();
      return;
    }

    // Section Navigation Commands
    if (lowerCmd === "work" || lowerCmd === "projects") {
      scrollToSection("work");
      inputRef.current?.focus();
      return;
    }
    if (lowerCmd === "about") {
      scrollToSection("about");
      inputRef.current?.focus();
      return;
    }
    if (lowerCmd === "services") {
      scrollToSection("services");
      inputRef.current?.focus();
      return;
    }
    if (lowerCmd === "skills") {
      scrollToSection("skills");
      inputRef.current?.focus();
      return;
    }
    if (lowerCmd === "experience") {
      scrollToSection("experience");
      inputRef.current?.focus();
      return;
    }
    if (lowerCmd === "contact") {
      scrollToSection("contact");
      inputRef.current?.focus();
      return;
    }

    // Action Commands
    if (lowerCmd === "copy email" || lowerCmd === "email") {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        try {
          await navigator.clipboard.writeText("placeholder_email@gmail.com");
          addLog("success", "SUCCESS: Email 'placeholder_email@gmail.com' copied to clipboard.");
        } catch {
          addLog("output", "Email: placeholder_email@gmail.com");
        }
      } else {
        addLog("output", "Email: placeholder_email@gmail.com");
      }
      inputRef.current?.focus();
      return;
    }

    if (lowerCmd === "resume" || lowerCmd === "view resume") {
      window.open("/resume.pdf", "_blank");
      addLog("success", "Opened /resume.pdf in a new tab.");
      inputRef.current?.focus();
      return;
    }

    // Default fallback
    addLog("error", `Command not recognized: '${cmd}'. Type 'help' for available commands.`);
    inputRef.current?.focus();
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
        className="fixed bottom-6 left-6 z-40 px-3.5 py-2 border border-border-strong bg-background/95 backdrop-blur-md font-mono text-[10px] uppercase text-accent tracking-wider flex items-center gap-2 hover:border-accent hover:shadow-[0_0_15px_rgba(204,255,0,0.15)] transition-all select-none"
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
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
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
              <div
                data-lenis-prevent
                className="p-4 sm:p-6 flex-1 overflow-y-auto font-mono text-xs leading-relaxed space-y-2 max-h-[50vh] bg-background/90"
              >
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
                  aria-label="Command input"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDownHistory}
                  placeholder="Type command e.g. 'work', 'skills', 'experience', 'contact', 'copy email', 'resume'"
                  className="flex-1 bg-transparent font-mono text-xs text-ink-primary focus:outline-none placeholder:text-ink-muted/50 cursor-text"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 border border-border-strong bg-background hover:border-accent hover:text-accent font-mono text-[10px] uppercase text-ink-primary flex items-center gap-1 transition-colors cursor-pointer"
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

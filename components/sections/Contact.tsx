"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/ui/Icons";
import { Mail, ArrowUpRight, Send, Loader2 } from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const shouldReduceMotion = useReducedMotion();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Simulate form submission delay
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <SectionWrapper id="contact" borderTop={true} containerClassName="pb-0 lg:pb-0">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Side: Call to Action Details */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div>
            <span className="font-mono text-[10px] text-accent uppercase tracking-widest block">// CONVERSION</span>
            <Heading tag="h2" size="h2" animate="words" titleText="GET IN TOUCH" className="text-ink-primary mt-2" />
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tighter text-ink-primary leading-none">
              LET&apos;S BUILD <br />
              SOMETHING <br />
              <span className="text-accent">INTELLIGENT.</span>
            </h3>
            <p className="text-sm text-ink-secondary leading-relaxed font-light mt-2 max-w-sm">
              I am open to full-time engineering positions, contract roles, and agentic AI consultations. Let&apos;s talk about your next project.
            </p>
          </div>

          {/* Direct CTA List */}
          <div className="flex flex-col gap-3 mt-2">
            {/* WhatsApp - Primary Option */}
            <a
              href="https://wa.me/[INSERT_WHATSAPP_NUMBER]?text=Hello%20Tejas%2C%20I%20visited%20your%20portfolio%20and%20would%20love%20to%20connect%21"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="CHAT"
              className="group/cta border border-border-strong p-4 bg-accent/5 hover:border-accent hover:bg-accent/10 transition-all duration-200 flex items-center justify-between cursor-none select-none"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 border border-border-strong bg-accent text-accent-foreground">
                  <WhatsappIcon className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-mono text-[8px] text-ink-muted uppercase tracking-wider">INSTANT CONTACT</span>
                  <span className="block text-sm font-semibold text-ink-primary mt-0.5">Chat on WhatsApp [INSERT_WHATSAPP_NUMBER]</span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-ink-muted group-hover/cta:text-accent transition-colors" />
            </a>

            {/* Email - Secondary Option */}
            <a
              href="mailto:placeholder_email@gmail.com"
              data-cursor="EMAIL"
              className="group/cta border border-border-subtle p-4 bg-surface/10 hover:border-border-strong hover:bg-surface/20 transition-all duration-200 flex items-center justify-between cursor-none select-none"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 border border-border-subtle bg-surface text-accent">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-mono text-[8px] text-ink-muted uppercase tracking-wider">EMAIL DIRECT</span>
                  <span className="block text-sm font-semibold text-ink-primary mt-0.5">placeholder_email@gmail.com</span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-ink-muted group-hover/cta:text-accent transition-colors" />
            </a>

            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://www.linkedin.com/in/pateltejasd"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="LINKEDIN"
                className="group/cta border border-border-subtle p-4 bg-surface/10 hover:border-border-strong hover:bg-surface/20 transition-all duration-200 flex items-center justify-between cursor-none select-none"
              >
                <div className="flex items-center gap-2.5">
                  <LinkedinIcon className="w-4.5 h-4.5 text-accent" />
                  <span className="font-mono text-[10px] text-ink-primary uppercase tracking-wider font-bold">LinkedIn</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-ink-muted group-hover/cta:text-accent transition-colors" />
              </a>

              <a
                href="https://github.com/tejaspatel2255"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="GITHUB"
                className="group/cta border border-border-subtle p-4 bg-surface/10 hover:border-border-strong hover:bg-surface/20 transition-all duration-200 flex items-center justify-between cursor-none select-none"
              >
                <div className="flex items-center gap-2.5">
                  <GithubIcon className="w-4.5 h-4.5 text-accent" />
                  <span className="font-mono text-[10px] text-ink-primary uppercase tracking-wider font-bold">GitHub</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-ink-muted group-hover/cta:text-accent transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Brutalist Form with Tactile Focus States & Animated SVG Checkmark */}
        <div className="lg:col-span-7 border border-border-strong p-6 md:p-8 bg-surface/20">
          <p className="font-mono text-[9px] text-accent uppercase tracking-widest mb-6">// Query Dispatcher Form</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Input Row Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-mono text-[10px] text-ink-muted uppercase tracking-wider">
                01 / Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                className="w-full bg-background border border-border-subtle p-3 text-sm text-ink-primary placeholder:text-ink-muted/50 focus:border-accent focus:shadow-[0_0_15px_rgba(204,255,0,0.15)] focus:outline-none transition-all duration-200 cursor-none"
              />
            </div>

            {/* Input Row Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-mono text-[10px] text-ink-muted uppercase tracking-wider">
                02 / Your Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. john@company.com"
                className="w-full bg-background border border-border-subtle p-3 text-sm text-ink-primary placeholder:text-ink-muted/50 focus:border-accent focus:shadow-[0_0_15px_rgba(204,255,0,0.15)] focus:outline-none transition-all duration-200 cursor-none"
              />
            </div>

            {/* Input Row Message */}
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-mono text-[10px] text-ink-muted uppercase tracking-wider">
                03 / Message Detail
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your project, timeline, or position requirements..."
                className="w-full bg-background border border-border-subtle p-3 text-sm text-ink-primary placeholder:text-ink-muted/50 focus:border-accent focus:shadow-[0_0_15px_rgba(204,255,0,0.15)] focus:outline-none transition-all duration-200 resize-none cursor-none"
              />
            </div>

            {/* Submit Action */}
            <div className="flex flex-col gap-4 mt-2">
              <Button
                variant="brutalist"
                type="submit"
                disabled={status === "submitting"}
                data-cursor-label="DISPATCH_QUERY"
                className="justify-center items-center py-3.5 flex gap-2 font-bold w-full cursor-none"
              >
                {status === "submitting" ? (
                  <>
                    Sending Query... <Loader2 className="w-4 h-4 animate-spin text-accent" />
                  </>
                ) : status === "success" ? (
                  <span className="flex items-center gap-2 text-accent">
                    Query Sent!
                    <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                ) : (
                  <>
                    Send Message <Send className="w-4 h-4 ml-1 inline-block" />
                  </>
                )}
              </Button>

              {/* Status Alert logs */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="border border-emerald-500/30 bg-emerald-950/20 p-4 flex gap-3 items-start font-mono text-[10px] text-emerald-400"
                  >
                    <div>
                      <span className="block font-bold">// STATUS: DISPATCH SUCCESS [MOCK]</span>
                      <p className="mt-1 text-emerald-400/80 leading-relaxed">
                        Message simulated successfully! Connect `Contact.tsx` to Formspree, Resend, or a Next.js Server Action to route live emails.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>
      </div>

      {/* Styled Footer Block */}
      <footer className="border-t border-border-subtle mt-16 md:mt-24 py-12 flex flex-col sm:flex-row justify-between items-center gap-6 font-mono text-[10px] text-ink-muted">
        <div className="flex flex-col gap-1 items-center sm:items-start text-center sm:text-left">
          <span>© 2026 TEJAS PATEL // PORTFOLIO</span>
          <span>ALL RIGHTS RESERVED // V1.0.0</span>
        </div>

        {/* Stack Credits */}
        <div className="text-center sm:text-right flex flex-col gap-1 items-center sm:items-end">
          <span>DESIGNED &amp; DEVELOPED BY TEJAS PATEL</span>
          <span>NEXT.JS // TAILWIND V4 // GSAP // LENIS</span>
        </div>
      </footer>
    </SectionWrapper>
  );
}

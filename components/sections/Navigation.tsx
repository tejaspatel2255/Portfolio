"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { WhatsappIcon } from "@/components/ui/Icons";
import { useMagnetic } from "@/lib/magnetic";

const NAV_LINKS = [
  { label: "Work", href: "#work", id: "work" },
  { label: "About", href: "#about", id: "about" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Testimonials", href: "#testimonials", id: "testimonials" },
  { label: "Contact", href: "#contact", id: "contact" },
];

function NavItem({ link, isActive }: { link: typeof NAV_LINKS[0]; isActive: boolean }) {
  const { position, handleMouseMove, handleMouseLeave } = useMagnetic(0.2);

  return (
    <motion.a
      key={link.label}
      href={link.href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      data-cursor-label="NAVIGATE"
      className={cn(
        "relative text-xs uppercase tracking-widest font-mono font-bold px-3 py-1.5 transition-colors cursor-none select-none",
        isActive ? "text-accent" : "text-ink-secondary hover:text-ink-primary"
      )}
    >
      {link.label}
      {isActive && (
        <motion.span
          layoutId="activeNavIndicator"
          className="absolute inset-0 border border-accent/40 bg-accent/10 -z-10"
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
        />
      )}
    </motion.a>
  );
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("work");
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Background backdrop triggers after 20px
      setIsScrolled(currentScrollY > 20);

      // Hide/Reveal scroll tracking
      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Section Observer for active section tracking
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.id);
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <motion.nav
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b",
          isScrolled
            ? "bg-background/85 backdrop-blur-md border-border-subtle py-3.5"
            : "bg-transparent border-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between">
          {/* Brand Wordmark */}
          <a href="#" data-cursor="HOME" className="flex items-center gap-3 group select-none cursor-none">
            <div className="w-8.5 h-8.5 bg-accent flex items-center justify-center font-display font-extrabold text-accent-foreground text-xs tracking-tighter transition-transform duration-300 group-hover:rotate-6">
              TP
            </div>
            <span className="font-display font-bold tracking-tight uppercase text-xs sm:text-sm text-ink-primary">
              TEJAS PATEL
            </span>
          </a>

          {/* Desktop Nav Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {NAV_LINKS.map((link) => (
              <NavItem key={link.id} link={link} isActive={activeSection === link.id} />
            ))}
          </div>

          {/* Desktop Contact CTA */}
          <div className="hidden md:block">
            <WhatsAppButton variant="brutalist" size="sm">
              Let&apos;s Chat <WhatsappIcon className="w-3.5 h-3.5 ml-1.5 inline-block" />
            </WhatsAppButton>
          </div>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-ink-primary hover:bg-surface border border-border-subtle hover:border-border-strong transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Backdrop & Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Blurry Backdrop Clicker */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Slide-in container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 right-0 w-full sm:max-w-md bg-background border-l border-border-strong z-[45] flex flex-col justify-between p-8 pt-28 shadow-2xl md:hidden"
            >
              {/* Asymmetric decorative grid line */}
              <div className="absolute inset-y-0 left-8 w-px bg-border-subtle/10 pointer-events-none z-0" />

              {/* Menu lists */}
              <div className="flex flex-col gap-6 z-10">
                <p className="font-mono text-[10px] text-accent uppercase tracking-widest mb-2">// Navigation</p>
                {NAV_LINKS.map((link, idx) => (
                  <motion.div
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 25 }}
                    transition={{ delay: idx * 0.04 + 0.08 }}
                    key={link.label}
                  >
                    <a
                      href={link.href}
                      onClick={handleLinkClick}
                      className={cn(
                        "font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-tighter transition-colors block",
                        activeSection === link.id ? "text-accent" : "text-ink-primary hover:text-accent"
                      )}
                    >
                      {link.label}
                    </a>
                  </motion.div>
                ))}
              </div>

              {/* Socials & CTA Footer */}
              <div className="flex flex-col gap-6 border-t border-border-subtle pt-8 z-10">
                <WhatsAppButton variant="brutalist" className="w-full text-center py-4">
                  Chat on WhatsApp <WhatsappIcon className="w-4 h-4 ml-1.5 inline-block" />
                </WhatsAppButton>

                <div className="flex items-center justify-between text-[10px] font-mono text-ink-muted">
                  <span>© 2026 TEJAS PATEL</span>
                  <div className="flex gap-4">
                    <a
                      href="https://github.com/tejaspatel2255"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-ink-primary p-1 transition-colors"
                    >
                      <GithubIcon className="w-4.5 h-4.5" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/pateltejasd"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-ink-primary p-1 transition-colors"
                    >
                      <LinkedinIcon className="w-4.5 h-4.5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

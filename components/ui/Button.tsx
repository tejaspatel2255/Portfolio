"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "brutalist" | "ghost";
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", magnetic = true, children, ...props }, ref) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const [coords, setCoords] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!magnetic || !buttonRef.current) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      // Limit range to 30% of offset
      setCoords({ x: x * 0.3, y: y * 0.3 });
    };

    const handleMouseLeave = () => {
      setCoords({ x: 0, y: 0 });
    };

    const variantStyles = {
      primary: "bg-accent text-accent-foreground font-semibold border border-transparent hover:bg-opacity-95 hover:scale-[1.01] transition-transform duration-200",
      secondary: "bg-surface text-ink-primary border border-border-subtle hover:bg-surface-hover hover:border-border-strong hover:scale-[1.01] transition-transform duration-200",
      brutalist: "bg-background text-ink-primary border border-border-strong shadow-[4px_4px_0px_0px_var(--color-accent)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_var(--color-accent)] transition-all duration-200",
      ghost: "bg-transparent text-ink-secondary hover:text-ink-primary hover:bg-surface",
    };

    const sizeStyles = {
      sm: "px-4 py-2 text-xs uppercase tracking-wider font-semibold",
      md: "px-6 py-3.5 text-xs uppercase tracking-widest font-bold",
      lg: "px-8 py-4.5 text-sm uppercase tracking-widest font-bold",
    };

    const MotionContent = (
      <motion.span
        animate={{ x: coords.x, y: coords.y }}
        transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.1 }}
        className="flex items-center justify-center gap-2 w-full h-full"
      >
        {children}
      </motion.span>
    );

    return (
      <button
        ref={(el) => {
          buttonRef.current = el;
          if (typeof ref === "function") ref(el);
          else if (ref) ref.current = el;
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "relative overflow-hidden rounded-none font-display uppercase transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-accent/50 cursor-pointer active:scale-98 select-none",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {magnetic ? MotionContent : children}
      </button>
    );
  }
);

Button.displayName = "Button";

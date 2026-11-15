"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMagnetic } from "@/lib/magnetic";

type ButtonBaseProps = {
  variant?: "primary" | "secondary" | "brutalist" | "ghost";
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  download?: string | boolean;
};

export type ButtonProps = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps>;

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      magnetic = true,
      href,
      target,
      rel,
      download,
      children,
      ...props
    },
    ref
  ) => {
    const { position, handleMouseMove, handleMouseLeave } = useMagnetic(0.3);

    const variantStyles = {
      primary: "bg-accent text-accent-foreground font-semibold border border-transparent hover:brightness-95 hover:scale-[1.01] transition-transform duration-200",
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
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.1 }}
        className="flex items-center justify-center gap-2 w-full h-full"
      >
        {children}
      </motion.span>
    );

    const commonClasses = cn(
      "relative inline-flex items-center justify-center overflow-hidden rounded-none font-display uppercase transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-accent/50 cursor-pointer active:scale-98 select-none",
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel}
          download={download}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={commonClasses}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {magnetic ? MotionContent : children}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={commonClasses}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {magnetic ? MotionContent : children}
      </button>
    );
  }
);

Button.displayName = "Button";

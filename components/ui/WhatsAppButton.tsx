"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "./Button";
import { WhatsappIcon } from "./Icons";
import { cn } from "@/lib/utils";
import { whatsappNumber } from "@/data/site";

interface WhatsAppButtonProps {
  className?: string;
  variant?: "primary" | "secondary" | "brutalist" | "ghost";
  size?: "sm" | "md" | "lg";
  message?: string;
  children?: React.ReactNode;
}

export function WhatsAppButton({
  className,
  variant = "primary",
  size = "md",
  message = "Hello Tejas, I visited your portfolio and would love to connect!",
  children,
}: WhatsAppButtonProps) {
  const shouldReduceMotion = useReducedMotion();
  const encodedMessage = encodeURIComponent(message);
  const href = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  return (
    <motion.span
      data-cursor="CHAT"
      animate={shouldReduceMotion ? {} : { scale: [1, 1.025, 1] }}
      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      whileTap={{ scale: 0.95 }}
      className={cn("inline-block select-none", className)}
    >
      <Button
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        variant={variant}
        size={size}
      >
        {children || (
          <>
            WhatsApp <WhatsappIcon className="w-3.5 h-3.5 ml-1.5 inline-block" />
          </>
        )}
      </Button>
    </motion.span>
  );
}

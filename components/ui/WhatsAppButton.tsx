"use client";

import React from "react";
import { Button } from "./Button";
import { WhatsappIcon } from "./Icons";
import { cn } from "@/lib/utils";

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
  // Placeholder WhatsApp number. USER must replace this.
  const whatsappNumber = "[INSERT_WHATSAPP_NUMBER]"; 
  
  const encodedMessage = encodeURIComponent(message);
  const href = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("inline-block cursor-none", className)}
    >
      <Button variant={variant} size={size}>
        {children || (
          <>
            WhatsApp <WhatsappIcon className="w-3.5 h-3.5 ml-1.5 inline-block" />
          </>
        )}
      </Button>
    </a>
  );
}

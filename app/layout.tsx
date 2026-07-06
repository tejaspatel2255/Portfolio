import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import AnimationProvider from "@/components/ui/AnimationProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tejas Patel | Software Developer & AI Systems Engineer",
  description:
    "Portfolio of Tejas Patel, a software developer specializing in full-stack web development and applied AI (agentic systems).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${plusJakarta.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground selection:bg-accent selection:text-accent-foreground font-body overflow-x-hidden">
        <div className="noise-overlay" />
        <CustomCursor />
        <AnimationProvider>{children}</AnimationProvider>
      </body>
    </html>
  );
}

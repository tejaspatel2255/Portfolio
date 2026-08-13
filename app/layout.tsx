import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import AnimationProvider from "@/components/ui/AnimationProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { PageIntroLoader } from "@/components/ui/PageIntroLoader";

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
  title: {
    default: "Tejas Patel | Software & AI Systems Engineer",
    template: "%s | Tejas Patel",
  },
  description:
    "Full-stack product developer specializing in high-performance web systems (React, TypeScript) and applied AI/agentic loops (Python, LangChain).",
  keywords: [
    "Tejas Patel",
    "Software Engineer",
    "AI Systems Engineer",
    "Agentic AI",
    "Full Stack Developer",
    "React Portfolio",
    "Next.js Portfolio",
    "Python Developer",
  ],
  authors: [{ name: "Tejas Patel", url: "https://github.com/tejaspatel2255" }],
  creator: "Tejas Patel",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/tejaspatel2255",
    title: "Tejas Patel | Software & AI Systems Engineer",
    description:
      "Full-stack product developer specializing in high-performance web systems (React, TypeScript) and applied AI/agentic loops (Python, LangChain).",
    siteName: "Tejas Patel Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tejas Patel | Software & AI Systems Engineer",
    description:
      "Full-stack product developer specializing in high-performance web systems (React, TypeScript) and applied AI/agentic loops (Python, LangChain).",
    creator: "@pateltejasd",
  },
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
        <PageIntroLoader />
        <ScrollProgressBar />
        <CustomCursor />
        <AnimationProvider>{children}</AnimationProvider>
      </body>
    </html>
  );
}

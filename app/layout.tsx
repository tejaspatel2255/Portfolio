import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import AnimationProvider from "@/components/ui/AnimationProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { AgentCliModal } from "@/components/ui/AgentCliModal";
import { siteConfig } from "@/data/site";

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
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "I engineer end-to-end web applications (TypeScript, Next.js, Node) and construct custom agentic AI systems (Python, LLM graphs). Focused on building software that solves user needs with performance and intelligence.",
  keywords: [
    siteConfig.name,
    "Software Engineer",
    "AI Systems Engineer",
    "Agentic AI",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Python Developer",
    siteConfig.location,
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.githubUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/favicon.svg", sizes: "180x180", type: "image/svg+xml" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.siteUrl,
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description:
      "I engineer end-to-end web applications (TypeScript, Next.js, Node) and construct custom agentic AI systems (Python, LLM graphs). Focused on building software that solves user needs with performance and intelligence.",
    siteName: `${siteConfig.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description:
      "I engineer end-to-end web applications (TypeScript, Next.js, Node) and construct custom agentic AI systems (Python, LLM graphs).",
    creator: "@pateltejasd",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": siteConfig.name,
  "jobTitle": siteConfig.role,
  "url": siteConfig.siteUrl,
  "sameAs": [
    siteConfig.githubUrl,
    siteConfig.linkedinUrl
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Nadiad",
    "addressRegion": "Gujarat",
    "addressCountry": "India"
  },
  "knowsAbout": [
    "Full-Stack Web Development",
    "TypeScript",
    "Next.js",
    "React",
    "Python",
    "Agentic AI Systems",
    "LLM Graph Architectures",
    "FastAPI"
  ]
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full bg-background text-foreground selection:bg-accent selection:text-accent-foreground font-body overflow-x-hidden">
        <ScrollProgressBar />
        <CustomCursor />
        <AgentCliModal />
        <AnimationProvider>{children}</AnimationProvider>
      </body>
    </html>
  );
}

# Tejas Patel // Personal Portfolio

A bespoke, high-performance personal portfolio website for **Tejas Patel** (Software Developer & AI Systems Engineer). 

This site is built from scratch to look and feel like a premium design-agency product rather than a template, utilizing a structured **Interactive Editorial Neo-Brutalist Grid** theme.

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4 (Custom Design Tokens)
- **Animation**: Framer Motion (Micro-interactions) + GSAP & ScrollTrigger (Scroll animations)
- **Smooth Scroll**: Lenis Scroll Engine
- **Icons**: Lucide React + Bespoke Inline SVGs for brand assets
- **Deployment**: Vercel

---

## 🎨 Design Constitution (Phase 1 Foundation)

1. **Visual Theme**: *Interactive Editorial Neo-Brutalist Grid* — high-contrast Obsidian dark background (`#0E0E10`), cream display typography (`#F3F3F5`), and a high-voltage **Acid Lime** (`#C8FF44`) accent color.
2. **Typography**: **Syne** (Google Fonts) for bold, wide, geometric headings and **Plus Jakarta Sans** (Google Fonts) for highly legible body copy.
3. **Tactile Micro-interactions**:
   - **Custom Follow Cursor**: A spring-loaded outer ring that expands, fills, and inverts colors (`difference` mix-blend mode) over interactive elements, paired with a high-precision center dot.
   - **Magnetic Buttons**: Pulls text labels towards the cursor on hover. Supports primary, secondary, ghost, and offset shadow *brutalist* styles.
   - **Grid Lines**: Asymmetric 12-column grid visual boundaries in the background that align content architecturally.
   - **SVG Noise Overlay**: A fine, hardware-accelerated film grain overlay that adds a premium material quality to the solid colors.

---

## 📂 Project Structure

```bash
├── app/
│   ├── globals.css          # Tailwind v4 import, custom @theme tokens & global SVG grain
│   ├── layout.tsx           # Global loading of fonts, AnimationProvider, and CustomCursor
│   └── page.tsx             # Design System Sandbox (Type Scales, buttons, theme toggle)
├── components/
│   ├── sections/            # Page sections (to be implemented in later phases)
│   └── ui/                  # Reusable design system primitives
│       ├── AnimationProvider.tsx # GSAP & Lenis smooth scroll synchronization
│       ├── Button.tsx            # Custom magnetic / brutalist buttons
│       ├── CustomCursor.tsx      # Smooth spring mouse-follower
│       ├── Heading.tsx           # Staggered typography reveals (words/characters)
│       └── Icons.tsx             # Custom inline SVGs (GitHub, LinkedIn)
├── lib/
│   └── utils.ts             # Tailwind class merging helper (cn)
├── public/                  # Static assets
└── package.json             # Scripts & dependencies
```

---

## 🚀 Getting Started

First, install the dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the dev server.

To run a production build and sanity check compilation/TypeScript types:

```bash
npm run build
```

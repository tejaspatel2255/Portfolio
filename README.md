# Tejas Patel // Personal Portfolio (v1.0.0)

A bespoke, high-performance personal portfolio website for **Tejas Patel** (Software Developer & AI Systems Engineer). 

This site is built from scratch using Next.js, React, and Tailwind CSS. It is structured around an **Interactive Editorial Neo-Brutalist Grid** design language.

---

## 🛠️ Tech Stack & Architecture

- **Core**: Next.js 16.2 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4 (Custom semantic tokens + theme variables)
- **Animation**: Framer Motion (Spring micro-interactions) + GSAP & ScrollTrigger (Fluid scroll timelines)
- **Smooth Scroll**: Lenis Scroll Engine
- **Icons**: Lucide React + Bespoke inline SVG path library
- **Deployment**: Vercel

---

## 🎨 Interactive Editorial & Polish (Phases 1-7)

1. **Visual Theme**: Obsidian dark background (`#0E0E10`), cream display typography (`#F3F3F5`), and a high-voltage **Acid Lime** (`#C8FF44`) accent color. Includes support for a light mode theme toggle (Cobalt Blue accent).
2. **Typography**: **Syne** (Google Fonts) for geometric display headings and **Plus Jakarta Sans** (Google Fonts) for body copy.
3. **Hardware-Accelerated Noise**: A fine SVG noise filter overlay creates a tactile, physical film-grain appearance.
4. **Motion QA (Accessibility)**: Supports `prefers-reduced-motion` media queries globally.
   - **Canvas Particle Network**: Halts physics loops, hover triggers, and canvas updates. The node mesh and grids draw once statically to consume 0% CPU.
   - **Custom Follow Cursor**: Unmounts the spring-lag element completely and reverts to default mouse options.
   - **Headings & Sections**: Text reveals, staggered reveals, and scroll slide-up translations are bypassed to display static tags instantly.
   - **Lenis Smooth Scroll**: Disabled, reverting to default native browser scroll.
5. **Keyboard Accessibility**: Focus states override default browser outlines with a high-contrast offset outline mapping to the theme's active accent color (`focus-visible`).

---

## 📂 Project Structure

```bash
├── app/
│   ├── globals.css          # Tailwind imports, theme variables, and global focus states
│   ├── layout.tsx           # SEO metadata, next/font loaders, and core wrappers
│   └── page.tsx             # Homepage sequence (Navigation, Hero, About, Skills, Projects, Experience, Contact, Sandbox)
├── components/
│   ├── sections/            # Portfolio Sections
│   │   ├── Navigation.tsx   # Sticky header with mobile overlay menu & active indices
│   │   ├── Hero.tsx         # Node network canvas backdrop and action triggers (View work, CV)
│   │   ├── About.tsx        # Bio blocks, quick facts chips, and 3D-tilt image frame
│   │   ├── Skills.tsx       # Pill list with interactive terminal panel & Git commits graph
│   │   ├── Projects.tsx     # Accordion showcase with interactive wireframe visual panels
│   │   ├── Experience.tsx   # Vertical timeline with scroll-triggered node reveals
│   │   └── Contact.tsx      # Query dispatcher form, status logs, and footer details
│   └── ui/                  # Reusable Design Primitives
│       ├── AnimationProvider.tsx # Lenis smooth scroll and GSAP trigger binders
│       ├── Button.tsx            # Magnetic primary, secondary, brutalist, and ghost buttons
│       ├── CustomCursor.tsx      # Spring-lag mouse-following ring & precision dot
│       ├── Heading.tsx           # Split characters, split words, and fade-up reveals
│       ├── InteractiveCanvas.tsx # 2D physics node canvas layout
│       └── Icons.tsx             # Custom SVG asset path library (Github, Linkedin, etc.)
├── public/                  # PDF Resume and static assets
└── package.json             # Scripts & configurations
```

---

## 📋 Consolidated Customization Index (Action Required)

To make the site your own before launching, replace the placeholders listed below:

1. **Resume File**: Place your CV file inside `public/` and name it exactly `resume.pdf`.
2. **About Bio (`components/sections/About.tsx`)**:
   - Replace the description text inside the `About` component starting on line 35.
   - Verify/edit the quick facts chips (e.g. Surat location, years of experience).
   - Drop your profile photo path in the portrait frame.
3. **Projects Details (`components/sections/Projects.tsx`)**:
   - Update repository titles, descriptions, `githubUrl`, and live `demoUrl` properties.
4. **Experience Chronology (`components/sections/Experience.tsx`)**:
   - Swap the date ranges, role names, and bullet items with your university/hackathon records.
5. **Contact Methods (`components/sections/Contact.tsx`)**:
   - Update the `mailto:placeholder_email@gmail.com` link.
   - Configure a form handler endpoint (like [Formspree](https://formspree.io/) or [Resend](https://resend.com/)) in the form submission callback to receive active emails.

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

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

To run a production build and check type validation:

```bash
npm run build
```

---

## 🚢 Deployment

### 1. Push to GitHub
```bash
git add .
git commit -m "feat: finalize portfolio features and release version 1.0.0"
git push origin main
```

### 2. Deploy on Vercel
1. Log in to your [Vercel Dashboard](https://vercel.com).
2. Click **Add New** → **Project**.
3. Select your imported `Portfolio` GitHub repository.
4. Keep the default Next.js build settings and click **Deploy**. Vercel will automatically host your live page and provide a preview URL.

# Tejas Patel // Personal Portfolio (v1.0.0)

A bespoke, high-performance personal portfolio website for **Tejas Patel** (Software & Applied AI Systems Engineer). Built around an **Interactive Editorial Neo-Brutalist Grid** design language.

---

## 🛠️ Tech Stack & Architecture

- **Core**: Next.js 16 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 (Custom semantic tokens + theme variables)
- **Animation**: Framer Motion (Spring micro-interactions) + GSAP ScrollTrigger (Fluid scroll timelines)
- **Smooth Scroll**: Lenis Smooth Scroll Engine (Synced frame-by-frame with GSAP ticker)
- **Signature Feature**: Autonomous AI Agent CLI & Command Palette (`Ctrl + K` or `~`)
- **Icons**: Lucide React + Bespoke inline SVG path library
- **Deployment**: Vercel

---

## ⚡ Motion & Performance Architecture

1. **Lenis + GSAP Frame Synchronization**: Lenis smooth scrolling is bound directly to GSAP's ticker (`ScrollTrigger.update`), ensuring 60fps animations stay locked to scroll velocity without scroll-jacking.
2. **Autonomous AI Agent CLI**: Press `Ctrl + K` or `~` anywhere on the site (or click `> AGENT_CLI [Ctrl+K]`) to launch an interactive terminal command palette. Supports commands like `run agent`, `status`, `skills`, `projects`, and `contact`.
3. **Off-Screen Canvas Optimization**: Background particle networks (`InteractiveCanvas.tsx`) utilize `IntersectionObserver` to pause animation loops when off-screen, consuming 0% background CPU/GPU resources.
4. **Touch & Pointer Fine Safety**: Custom cursor rings and magnetic button pull logic check `(pointer: fine)`. Touch-screen mobile devices fall back to native tap target feedback.
5. **Accessibility & Reduced Motion**: Fully compliant with `prefers-reduced-motion`. Canvas loops, parallax scrubbers, and infinite marquees fall back to static representations.

---

## 📂 Project Structure

```bash
├── app/
│   ├── globals.css          # Tailwind imports, theme variables, and marquee keyframes
│   ├── layout.tsx           # SEO metadata, font loaders, Agent CLI modal, and progress bar
│   └── page.tsx             # Main layout sequence (Nav, Hero, About, Services, Skills, Projects, Testimonials, Contact)
├── components/
│   ├── sections/            # Portfolio Sections
│   │   ├── Navigation.tsx   # Scroll-aware navbar with active section sliding pill
│   │   ├── Hero.tsx         # Interactive 3D mouse tilt card + canvas particle web
│   │   ├── About.tsx        # Bio & 3D card with GSAP scrub depth parallax
│   │   ├── Services.tsx     # Services grid with scaleX draw-on hover underlines
│   │   ├── Skills.tsx       # Dual infinite scrolling marquees + terminal query output
│   │   ├── Projects.tsx     # Editorial accordion with viewport reveals & wireframe mockups
│   │   ├── Testimonials.tsx # Physics swipeable carousel with spring pagination dots
│   │   └── Contact.tsx      # Tactile input focus glows & animated checkmark submit
│   └── ui/                  # Reusable UI Primitives
│       ├── AgentCliModal.tsx    # Interactive Autonomous AI Agent CLI terminal modal
│       ├── AnimationProvider.tsx # Lenis smooth scroll and GSAP trigger binders
│       ├── Button.tsx            # Magnetic primary, secondary, brutalist, and ghost buttons
│       ├── CustomCursor.tsx      # Spring-lag mouse-following ring & precision dot
│       ├── Heading.tsx           # Split characters, split words, and fade-up reveals
│       ├── InteractiveCanvas.tsx # 2D physics node canvas layout with off-screen pause
│       ├── PageIntroLoader.tsx   # Session-based brutalist curtain loader
│       ├── ScrollProgressBar.tsx # Sticky top edge scroll progress bar
│       └── WhatsAppButton.tsx    # Ambient breathing pulse & tactile press feedback
├── lib/
│   ├── magnetic.ts          # Shared spring-based magnetic position hook
│   └── utils.ts             # Tailwind class merging helper
└── package.json             # Scripts & dependencies
```

---

## 🔒 Security & Privacy Notice

- **No Hardcoded Secrets**: All source files have been scanned to verify zero API keys, private credentials, or environment secrets exist in the repository index.
- **Environment Variables**: Use `.env.local` for local secrets. `.env*` pattern files are ignored in `.gitignore`.

---

## 🚀 Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to test the site locally.

To run a production build and type check:

```bash
npm run build
```

---

## 🚢 Deployment

### 1. Push to GitHub
```bash
git add .
git commit -m "feat: complete portfolio motion polish and security verification"
git push origin main
```

### 2. Deploy on Vercel
1. Log in to [Vercel](https://vercel.com).
2. Import your `Portfolio` repository.
3. Keep default Next.js build settings and click **Deploy**.

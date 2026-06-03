<div align="center">

#  nabilamhaouch.dev — Portfolio

**The résumé was boring. So I built this instead.**

[![](https://capsule-render.vercel.app/api?type=rect&color=111111&height=50&text=→%20nabilamhaouch.dev&fontSize=20&fontColor=00d4ff)](https://www.nabilamhaouch.dev)

![React](https://img.shields.io/badge/React_18-61DAFB?style=flat-square&logo=react&logoColor=black) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) ![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=threedotjs&logoColor=white) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=flat-square&logo=framer&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)

</div>

---

## Overview

This portfolio goes beyond listing skills and experience. It features a fully animated 3D scene, scroll-driven interactions, a custom glitch design system, and a dedicated section with playable mini-games themed around my tech stack — all built from scratch.

Bilingual (🇬🇧 EN / 🇫🇷 FR), responsive across all screen sizes, and designed with a dark cyber-terminal aesthetic.

---

## Features

- **3D Interactive Scene** — React Three Fiber avatar at a full dev setup, rotating on scroll via `useFrame` + framer-motion
- **Glitch Design System** — Consistent cyan/magenta RGB-split glitch effect on all interactive elements (navbar, links, buttons)
- **Terminal Intro** — `$ whoami` prompt with animated role selector and letter-by-letter glitch name effect
- **Scroll Animations** — Reveal animations, scroll-driven 3D model rotation, custom animated mouse indicator
- **4 Playable Mini-Games** — Snake (with tech-stack logos as food), TypeRush, Stack Catcher, Commit Breaker — all themed around real portfolio technologies
- **Auto-calculated Experience Duration** — Ongoing positions update duration automatically without manual edits
- **Bilingual** — Full EN/FR translation including UI, bio, and game text (game names stay in English)
- **Fully Responsive** — Mobile, tablet, and desktop — mobile shows optimized Stack Catcher game only

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, TypeScript, Vite |
| **3D / Canvas** | Three.js, React Three Fiber, @react-three/drei |
| **Animation** | Framer Motion, CSS keyframes |
| **Styling** | SCSS Modules, CSS custom properties |
| **Icons** | Font Awesome, Google Material Symbols, Devicons CDN |
| **i18n** | Custom context-based translation system |

---

## Project Structure

```
src/
├── components/
│   ├── Avatars/          # 3D model components (Setup, Avatar)
│   ├── Canvas/           # Three.js canvas wrappers
│   ├── Common/           # Shared UI (GlitchName, MouseScroll...)
│   ├── Games/            # Snake, TypeRush, StackCatcher, CommitBreaker
│   └── Sections/         # Page sections (Intro, Experience, Projects, Details)
├── data/                 # Experience & project data
├── i18n/                 # EN/FR translations
├── styles/               # SCSS — global + per-component
└── context/              # Language context
```

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/nabilsaiyan/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## Sections

| # | Section | Description |
|---|---|---|
| 1 | **Intro** | Terminal prompt, animated name, rotating 3D setup |
| 2 | **Experience** | Vertical timeline with auto-calculated durations |
| 3 | **Projects** | Two featured projects with 3D device mockups |
| 4 | **Details** | Bio, contact, and 4 interactive tech-themed games |

---

## Contact

- **Email** — [nabil.amhaouch.dev@gmail.com](mailto:nabil.amhaouch.dev@gmail.com)
- **LinkedIn** — [nabil-amhaouch](https://www.linkedin.com/in/nabil-amhaouch)
- **GitHub** — [nabilsaiyan](https://github.com/nabilsaiyan)

---

<div align="center">
  <sub>Built with React, Three.js & too much caffeine ☕</sub>
</div>

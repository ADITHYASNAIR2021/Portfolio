# Portfolio Upgrade Plan

Owner: Adithya S Nair · Created 2026-06-10

Scope decisions (locked):
- **3D = tasteful accents** — R3F hero centerpiece + 3D tilt cards, GSAP scroll polish. Lazy-loaded, `prefers-reduced-motion` aware, mobile falls back to current SVG. **No theatre.js.**
- **CMS = free + OSS** — Sanity dropped (proprietary). Use **Keystatic** (git-based, no DB, MIT) for editable content. See Phase 2.
- **Polish = done** — GSAP hero parallax + 3D tilt project cards, mobile-optimized (3D off, no overflow).

Stack: Next 16.2.2 · React 19.2.4 · Tailwind v4 · framer-motion v12 · cobe.
⚠️ `AGENTS.md`: Next 16 has breaking changes — read `node_modules/next/dist/docs/` before writing Next-specific code (route handlers, dynamic params, metadata).

---

## Phase 0 — Docs lock-in (verify, don't assume)

- Read local Next 16 docs for: App Router catch-all routes, route segment config, `generateStaticParams`, metadata, client components.
- Pin versions: `@react-three/fiber@^9`, `@react-three/drei@^9`/`^10`, `three`, `gsap@^3` (+ `@gsap/react`), `next-sanity@^11`, `sanity`, `@sanity/vision`, `@portabletext/react`.
- Confirm R3F v9 ↔ React 19.2 (compatible 19.0–19.2 per pmndrs).
- Output: "Allowed APIs" list + anti-patterns (no SSR of R3F canvas; dynamic import `{ ssr:false }`).

## Phase 1 — Content truth (no deps, ship-safe)

Edit existing components only. Site stays correct even if later phases never land.
- `Projects.tsx`: add **Vidyapath** as featured #1 (Next.js 14, Supabase, multi-model AI Groq/Gemini, RAG, HMAC-JWT, Zustand). Add **SWC File Generation from MRI** to other.
- New `Certificates.tsx`: Computer Vision, Cybersecurity Essentials, Data Visualisation, DL for Images+Text w/ PyTorch, cert repo link. Wire into `page.tsx`.
- New `Languages` block (English pro / Malayalam native / Hindi working) — fold into Contact or Leadership.
- `Skills.tsx`: sync to resume — add CrewAI, TensorFlow, Embeddings, Claude Skills, Model Monitoring; remove invented Java/SQL.
- `About.tsx`: add mentoring/leading-teams ambition line; fix stack chips (drop PostgreSQL→correct infra).
- New `ProjectIllustrations` entries for Vidyapath + SWC.

Verify: `npm run build` passes, preview renders new sections.

## Phase 2 — CMS (free + open-source, replaces Sanity)

Sanity has a free tier but is proprietary/hosted. Decision: use a **free + OSS** option.

**Recommendation: Keystatic** (MIT, Thinkmill).
- Content stored as JSON/Markdown **in this repo** — no database, no hosting cost, no lock-in.
- Local mode = zero infra; GitHub mode = free editing from a deployed `/keystatic` dashboard.
- Next.js-native, TypeScript schema, embeds like Sanity Studio.
- Setup: `npm i @keystatic/core @keystatic/next` → `keystatic.config.ts` (collections: project, experience, certificate, language, skillGroup, leadership; singleton: about/settings) → `app/keystatic/[[...params]]/page.tsx` + `app/api/keystatic/[...params]/route.ts` → read content with `createReader`. Components import the reader instead of hardcoded arrays (keep arrays as typed fallback).
- GitHub mode later: free GitHub OAuth app (CLIENT_ID/SECRET in env) — no paid account.

**If a real DB is wanted instead:** Payload CMS 3 (Next-native, free self-host, needs SQLite/Postgres) or Supabase (already used in Vidyapath; free tier Postgres). Heavier than Keystatic for a portfolio.

Verify: `/keystatic` loads, edit a project → file in repo changes → reflects on site.

## Phase 3 — Motion layer (GSAP)

- `npm i gsap @gsap/react`
- Register `ScrollTrigger`. Scroll-pinned section reveals, timeline-synced experience, counter trigger refinement.
- Respect `prefers-reduced-motion`; keep framer-motion for component-level, GSAP for scroll-orchestration.

Verify: smooth scroll, no jank, reduced-motion disables.

## Phase 4 — 3D layer (R3F, tasteful)

- `npm i three @react-three/fiber @react-three/drei && npm i -D @types/three`
- `Hero3D.tsx`: mouse-reactive neural/particle point-cloud centerpiece. `dynamic(() => ..., { ssr:false })`, `<Suspense>` fallback = current CPU SVG. Brand colors (cyan #00d4ff / violet #8b5cf6).
- Featured project cards: subtle 3D tilt/parallax (drei or CSS-perspective).
- Mobile + reduced-motion → SVG fallback. Lazy-load below the fold.

Verify: bundle delta acceptable, 60fps desktop, mobile fallback, no hydration errors.

## Phase 5 — Verify & polish

- `npm run build` + lint clean.
- Lighthouse (perf/a11y), bundle-size check, mobile, dark default intact.
- Reduced-motion full pass.

---

## Anti-patterns to avoid
- ❌ threlte (Svelte-only — using R3F instead).
- ❌ SSR-ing R3F `<Canvas>` (dynamic import ssr:false).
- ❌ theatre.js (excluded by decision; pre-release risk).
- ❌ Inventing Next 16 APIs — verify against local docs first.
- ❌ Committing Sanity tokens (.env only).

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { CpuArchitecture } from "@/components/ui/cpu-architecture";

const roles = [
  "AI Engineer",
  "RAG Specialist",
  "LLM Developer",
  "Medical AI Builder",
  "Python Engineer",
];

/** Cycles through role strings with a slide animation */
function TextCycle({ items }: { items: string[] }) {
  const [index, setIndex] = useState(0);
  const longestItem = items.reduce((a, b) => (a.length > b.length ? a : b), "");

  useEffect(() => {
    const t = setInterval(
      () => setIndex((p) => (p + 1) % items.length),
      2600
    );
    return () => clearInterval(t);
  }, [items.length]);

  return (
    <span className="relative inline-block">
      <span className="invisible font-mono" aria-hidden="true">
        {longestItem}
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="absolute inset-0 text-accent"
        >
          {items[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* ── AuroraBackground (21st.dev component) ── */}
      <AuroraBackground
        className="absolute inset-0 z-0"
        showRadialGradient
      />

      {/* Dot-grid overlay + edge vignette */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 dot-grid opacity-15" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 60% 40%, transparent 28%, #06080d 84%), linear-gradient(to bottom, #06080d 0%, transparent 12%, transparent 80%, #06080d 100%)",
          }}
        />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex items-center w-full">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

            {/* Left — primary text */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-muted text-sm font-mono mb-7 tracking-wide"
              >
                Kerala, India &mdash; currently at Doctreen
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Adithya{" "}
                <span className="gradient-text">S Nair</span>
              </motion.h1>

              {/* Animated text cycle */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.32 }}
                className="flex items-center gap-1.5 text-lg font-mono mb-7 tracking-wide"
              >
                <span className="text-muted select-none">~/</span>
                <TextCycle items={roles} />
                <span
                  className="text-accent/70 select-none"
                  style={{ animation: "blink 1.1s step-end infinite" }}
                >
                  _
                </span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="text-secondary text-base md:text-lg max-w-lg mb-10 leading-relaxed"
              >
                I build LLM pipelines, RAG systems, and vision analysis tools
                for medical AI &mdash; DICOM imaging, multi-provider LLMs, and
                FastAPI services in production.
              </motion.p>

              {/* Liquid glass CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.58 }}
                className="flex flex-wrap gap-4 mb-9"
              >
                <a
                  href="#projects"
                  className="liquid-glass-btn liquid-glass-btn-primary group"
                >
                  View My Work
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
                <a
                  href="#contact"
                  className="liquid-glass-btn liquid-glass-btn-secondary"
                >
                  Get In Touch
                </a>
              </motion.div>

              {/* Open-to-work badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.82 }}
                className="flex items-center gap-2"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald" />
                </span>
                <span className="text-muted text-xs font-mono">
                  Open to new roles
                </span>
              </motion.div>
            </div>

            {/* Right — CPU Architecture visual (desktop only) */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="hidden md:flex flex-col items-center justify-center"
            >
              {/* CPU diagram */}
              <div className="relative w-full max-w-sm">
                {/* Glow behind the SVG */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 50%, rgba(0,212,255,0.08) 0%, transparent 70%)",
                    filter: "blur(30px)",
                  }}
                />
                <CpuArchitecture
                  text="AI"
                  className="opacity-80 w-full h-auto"
                  animateText
                  animateLines
                  animateMarkers
                />
              </div>

              {/* Mini context labels below the diagram */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="grid grid-cols-2 gap-2 w-full max-w-sm mt-3"
              >
                {[
                  { label: "Currently at", value: "Doctreen" },
                  { label: "Specialty",    value: "Medical AI" },
                  { label: "Stack",        value: "LLMs · RAG · DICOM" },
                  { label: "Location",     value: "Kerala, India" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="glass border border-white/5 rounded-xl p-3 hover:border-accent/15 transition-colors"
                  >
                    <p className="text-muted text-[9px] font-mono uppercase tracking-widest mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-foreground text-xs font-medium">
                      {item.value}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Bottom stats bar ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="relative z-10 border-t border-white/5"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center gap-x-8 gap-y-2">
          <span className="font-mono text-xs text-muted">
            ~2 yrs production experience
          </span>
          <span className="text-border hidden sm:block">&middot;</span>
          <span className="font-mono text-xs text-muted">
            Medical AI &middot; LLMs &middot; RAG
          </span>
          <span className="text-border hidden sm:block">&middot;</span>
          <span className="font-mono text-xs text-muted">
            FastAPI &middot; Python &middot; DICOM
          </span>
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionWrapper from "./SectionWrapper";
import { aboutStack as skills } from "@/content/portfolio";

export default function About() {
  return (
    <SectionWrapper id="about" title="About Me" index="01">
      <div className="grid md:grid-cols-5 gap-12 items-start">

        {/* ── Left: text + bento facts ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="md:col-span-3 space-y-5"
        >
          <p className="text-secondary leading-relaxed text-base md:text-lg">
            Most of what I do is make LLMs useful in{" "}
            <span className="text-accent">production</span> — not demo-useful,
            but actually-reliable useful. For close to two years that meant
            building and maintaining the AI core of a{" "}
            <span className="text-foreground font-medium">medical reporting platform</span>{" "}
            at Doctreen, where the margin for error is low and the edge cases
            are everywhere.
          </p>
          <p className="text-secondary leading-relaxed">
            The day-to-day involved LLM pipeline design, RAG workflows, and
            vision analysis for DICOM medical imaging across 10+ modalities. We
            used multiple providers &mdash; OpenAI, HuggingFace, Nebius, OVH
            &mdash; each with their own tradeoffs, and I&apos;ve learned more
            about evaluation methodology than I expected when I started.
          </p>
          <p className="text-secondary leading-relaxed">
            Separately, I spent 1.5 years running the{" "}
            <span className="text-foreground font-medium">ACM Student Chapter</span>{" "}
            at Amritapuri as Chairperson &mdash; organising hackathons,
            mentoring students in AI&nbsp;/&nbsp;ML, and eventually coordinating
            the ICPC Asia West Regional Finals, which turned out to be a very
            different kind of systems problem.
          </p>
          <p className="text-secondary leading-relaxed">
            I&apos;m looking for what comes next &mdash; harder engineering
            problems, a different domain, or a role with more ownership. The
            quiet ambition is to keep building AI that delivers when it matters,
            and to grow into{" "}
            <span className="text-foreground font-medium">mentoring and leading engineering teams</span>.
            If you&apos;ve read this far and something looks interesting,
            I&apos;m easy to reach.
          </p>

          {/* ── Bento Grid quick facts ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bento-grid pt-2"
          >
            {/* Location */}
            <div className="bento-cell bento-cell-accent flex items-center gap-3">
              <span className="text-accent shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              <div>
                <p className="text-muted text-[10px] font-mono uppercase tracking-wider">Location</p>
                <p className="text-foreground text-sm font-medium">Kerala, India</p>
              </div>
            </div>

            {/* Focus */}
            <div className="bento-cell bento-cell-accent flex items-center gap-3">
              <span className="text-accent shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </span>
              <div>
                <p className="text-muted text-[10px] font-mono uppercase tracking-wider">Focus</p>
                <p className="text-foreground text-sm font-medium">Medical AI / LLMs</p>
              </div>
            </div>

            {/* Education — full width */}
            <div className="bento-cell bento-cell-wide bento-cell-violet flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-violet shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </span>
                <div>
                  <p className="text-muted text-[10px] font-mono uppercase tracking-wider">Education</p>
                  <p className="text-foreground text-sm font-medium">B.Tech CS &mdash; AI &amp; ML</p>
                </div>
              </div>
              <span className="text-muted text-xs font-mono hidden sm:block">Amrita, Amritapuri</span>
            </div>

            {/* CGPA */}
            <div className="bento-cell flex items-center gap-3">
              <span className="text-accent shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </span>
              <div>
                <p className="text-muted text-[10px] font-mono uppercase tracking-wider">CGPA</p>
                <p className="text-foreground text-sm font-medium">8.48 / 10</p>
              </div>
            </div>

            {/* Open to work */}
            <div className="bento-cell flex items-center justify-center gap-2">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald" />
              </span>
              <span className="text-foreground text-xs font-mono">Open to work</span>
            </div>

            {/* Currently building */}
            <div className="bento-cell bento-cell-wide flex items-center gap-3">
              <span className="text-amber shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              <div>
                <p className="text-muted text-[10px] font-mono uppercase tracking-wider">Currently Building</p>
                <p className="text-foreground text-sm font-medium">
                  Vidyapath &mdash;{" "}
                  <span className="text-secondary font-normal text-xs">
                    multi-school LMS platform with AI-assisted teaching tools
                  </span>
                </p>
              </div>
            </div>

            {/* Skills chip row */}
            <div className="bento-cell bento-cell-wide">
              <p className="text-muted text-[10px] font-mono uppercase tracking-wider mb-2.5">Stack</p>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-0.5 text-[11px] font-mono text-accent/80 bg-accent/5 border border-accent/10 rounded-full hover:border-accent/25 hover:text-accent transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Right: professional photo ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="md:col-span-2 relative flex justify-center"
        >
          {/* Outer glow */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background:
                "radial-gradient(ellipse at 60% 30%, rgba(0,212,255,0.10) 0%, transparent 70%)",
            }}
          />

          <motion.div
            whileHover={{ rotate: -1, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative w-full max-w-[280px]"
          >
            {/* Decorative offset boxes */}
            <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border border-accent/10 z-0" />
            <div className="absolute -bottom-2 -right-2 w-full h-full rounded-2xl border border-accent/5 z-0" />

            {/* Photo card */}
            <div
              className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-accent/20 group"
              style={{
                boxShadow:
                  "0 25px 60px -10px rgba(0,212,255,0.10), 0 10px 30px -5px rgba(0,0,0,0.5)",
              }}
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src="/images/adithya.jpg"
                  alt="Adithya S Nair"
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="280px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06080d] via-transparent to-transparent" />
              </div>

              {/* Name overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="glass-strong rounded-xl p-4 border border-white/5">
                  <p
                    className="text-foreground font-semibold text-base"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    Adithya S Nair
                  </p>
                  <p className="text-accent text-xs font-mono mt-0.5">
                    AI Engineer &middot; ex-Doctreen
                  </p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
                    <span className="text-muted text-xs font-mono">
                      Open to new roles
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

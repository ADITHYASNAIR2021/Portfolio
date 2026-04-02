"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionWrapper from "./SectionWrapper";

const quickFacts = [
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Location",
    value: "Kerala, India",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    label: "Focus",
    value: "Medical AI / LLMs",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
    label: "Education",
    value: "B.Tech CS AI/ML",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    label: "CGPA",
    value: "8.48 / 10",
  },
];

export default function About() {
  return (
    <SectionWrapper id="about" title="About Me" index="01">
      <div className="grid md:grid-cols-5 gap-12 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="md:col-span-3 space-y-5"
        >
          {/* Highlight bar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg glass border border-accent/10 mb-6"
          >
            <span className="text-accent text-lg">⚡</span>
            <p className="text-sm text-secondary font-mono">
              ~2 years building production AI systems at{" "}
              <span className="text-accent">Doctreen</span>
            </p>
          </motion.div>

          <p className="text-secondary leading-relaxed text-base md:text-lg">
            I&apos;m an AI Engineer with close to two years of production
            experience building and maintaining core components of a{" "}
            <span className="text-accent">medical AI platform</span> — spanning
            LLM pipeline design, RAG workflows, prompt engineering, model
            evaluation, and FastAPI backend services.
          </p>
          <p className="text-secondary leading-relaxed">
            At{" "}
            <span className="text-foreground font-medium">Doctreen</span>, I
            work on AI-driven medical report generation, integrating multiple LLM
            providers (OpenAI, HuggingFace, Nebius, OVH) and designing vision
            analysis pipelines for DICOM medical imaging across 10+ modalities.
          </p>
          <p className="text-secondary leading-relaxed">
            Beyond engineering, I led the{" "}
            <span className="text-foreground font-medium">
              ACM Student Chapter
            </span>{" "}
            at Amritapuri as Chairperson — organising national-level hackathons,
            mentoring 200+ members in AI/ML, and coordinating the ICPC Asia West
            Regional Finals.
          </p>
          <p className="text-secondary leading-relaxed">
            I&apos;m driven by a quiet ambition to build AI systems that truly
            deliver when it matters — and eager to keep learning, contributing,
            and growing.
          </p>

          {/* Quick facts — glass cards */}
          <div className="grid grid-cols-2 gap-3 pt-4">
            {quickFacts.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-3 px-4 py-3 rounded-lg glass border border-white/5 hover:border-accent/20 transition-colors group"
              >
                <span className="text-accent group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <div>
                  <p className="text-muted text-[10px] font-mono uppercase tracking-wider">
                    {item.label}
                  </p>
                  <p className="text-foreground text-sm">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Professional Photo */}
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
                "radial-gradient(ellipse at 60% 30%, rgba(0,212,255,0.12) 0%, transparent 70%)",
            }}
          />

          {/* Card container */}
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
                  "0 25px 60px -10px rgba(0,212,255,0.12), 0 10px 30px -5px rgba(0,0,0,0.5)",
              }}
            >
              {/* Photo */}
              <div className="relative aspect-[3/4]">
                <Image
                  src="/images/adithya.jpg"
                  alt="Adithya S Nair"
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="280px"
                  priority
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06080d] via-transparent to-transparent" />
              </div>

              {/* Name card overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="glass-strong rounded-xl p-4 border border-white/5">
                  <p
                    className="text-foreground font-semibold text-base"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    Adithya S Nair
                  </p>
                  <p className="text-accent text-xs font-mono mt-0.5">
                    AI Engineer @ Doctreen
                  </p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
                    <span className="text-muted text-xs font-mono">
                      Available for opportunities
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

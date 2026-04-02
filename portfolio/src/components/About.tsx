"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionWrapper from "./SectionWrapper";

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

          {/* Quick facts */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            {[
              { label: "Location", value: "Kerala, India" },
              { label: "Focus", value: "Medical AI / LLMs" },
              { label: "Education", value: "B.Tech CS AI/ML" },
              { label: "CGPA", value: "8.48 / 10" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-2">
                <span className="text-accent font-mono text-xs mt-1">▹</span>
                <div>
                  <p className="text-muted text-xs font-mono uppercase tracking-wider">
                    {item.label}
                  </p>
                  <p className="text-foreground text-sm">{item.value}</p>
                </div>
              </div>
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
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-2xl"
            style={{
              background: "radial-gradient(ellipse at 60% 30%, rgba(0,212,255,0.12) 0%, transparent 70%)",
            }}
          />

          {/* Card container */}
          <div className="relative w-full max-w-[280px]">
            {/* Decorative bg offset box */}
            <div
              className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border border-accent/15 z-0"
            />
            <div
              className="absolute -bottom-2 -right-2 w-full h-full rounded-2xl border border-accent/10 z-0"
            />

            {/* Photo card */}
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-accent/20 group"
              style={{ boxShadow: "0 25px 60px -10px rgba(0,212,255,0.12), 0 10px 30px -5px rgba(0,0,0,0.5)" }}
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
                {/* Subtle gradient overlay at bottom for name card */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06080d] via-transparent to-transparent" />
              </div>

              {/* Name card overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="bg-[#06080d]/80 backdrop-blur-md rounded-xl p-4 border border-white/5">
                  <p className="text-foreground font-semibold text-base" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    Adithya S Nair
                  </p>
                  <p className="text-accent text-xs font-mono mt-0.5">AI Engineer @ Doctreen</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-muted text-xs font-mono">Available for opportunities</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

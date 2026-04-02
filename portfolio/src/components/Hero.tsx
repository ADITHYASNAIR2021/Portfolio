"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ParticleNetwork from "./ParticleNetwork";

const roles = [
  "AI Engineer",
  "LLM Pipeline Architect",
  "RAG Systems Builder",
  "Medical AI Developer",
  "Community Leader",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayed === current) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else if (isDeleting) {
      timeout = setTimeout(
        () => setDisplayed((prev) => prev.slice(0, -1)),
        30
      );
    } else {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        60
      );
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particle network background */}
      <ParticleNetwork />

      {/* Radial gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#06080d] z-[1]" />
      
      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.06, 0.1, 0.06],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full blur-[120px] z-0"
        style={{ background: "radial-gradient(ellipse, rgba(0,212,255,0.15) 0%, transparent 70%)" }}
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.04, 0.08, 0.04],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/3 right-1/4 w-[600px] h-[400px] rounded-full blur-[100px] z-0"
        style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 70%)" }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="font-mono text-accent text-sm md:text-base mb-6 tracking-widest uppercase">
            &gt; Hello, world. I&apos;m &mdash;
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Adithya{" "}
          <span className="gradient-text">
            S Nair
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="h-10 md:h-12 flex items-center justify-center mb-8"
        >
          <span className="font-mono text-xl md:text-2xl text-secondary">
            {displayed}
          </span>
          <span className="font-mono text-xl md:text-2xl text-accent cursor-blink ml-0.5">
            |
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-secondary text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Building AI systems that truly deliver when it matters.
          <br className="hidden md:block" />
          <span className="text-muted">
            From medical AI platforms to multi-agent systems.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#projects"
            className="group relative px-8 py-3.5 bg-gradient-to-r from-accent/15 to-violet/15 border border-accent/40 text-accent font-mono text-sm hover:border-accent hover:from-accent/25 hover:to-violet/25 transition-all duration-300 rounded-lg glow overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              View My Work
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </a>
          <a
            href="#contact"
            className="group px-8 py-3.5 border border-border text-secondary font-mono text-sm hover:border-accent/50 hover:text-accent transition-all duration-300 rounded-lg"
          >
            <span className="flex items-center justify-center gap-2">
              Get In Touch
              <svg className="w-4 h-4 group-hover:translate-y-px transition-transform opacity-0 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </a>
        </motion.div>

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-12 inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/5"
        >
          <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
          <span className="text-muted text-xs font-mono">Open to opportunities</span>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-5 h-8 border border-accent/30 rounded-full flex justify-center"
          >
            <motion.div className="w-1 h-2 bg-accent rounded-full mt-1.5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent/5 rounded-full blur-[120px] z-0" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="font-mono text-accent text-sm md:text-base mb-6 tracking-widest uppercase">
            &gt; initializing portfolio...
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
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-violet">
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
            className="px-8 py-3 bg-accent/10 border border-accent text-accent font-mono text-sm hover:bg-accent/20 transition-all rounded glow"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-border text-secondary font-mono text-sm hover:border-accent hover:text-accent transition-all rounded"
          >
            Get In Touch
          </a>
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

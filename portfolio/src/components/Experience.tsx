"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const experiences = [
  {
    role: "AI Engineer",
    company: "Doctreen",
    location: "Montpellier, France (Remote)",
    period: "Jun 2025 — Present",
    description: [
      "Develop and maintain AI features for a medical report generation platform, integrating LLMs (OpenAI, HuggingFace, Nebius, OVH) with prompt engineering and RAG to improve diagnostic accuracy.",
      "Design and optimise vision analysis pipelines for DICOM medical imaging across 10+ modalities, with model evaluation against radiologist ground-truth data.",
      "Build internal tooling and data processing workflows — including a token-efficient serialisation format that cut costs.",
      "Implement CI/CD pipelines and model monitoring to ensure reliable deployments and catch performance regressions.",
    ],
    tech: [
      "Python",
      "FastAPI",
      "LLM APIs",
      "RAG",
      "Docker",
      "CI/CD",
    ],
  },
  {
    role: "AI Research Intern",
    company: "Doctreen",
    location: "Montpellier, France (Remote)",
    period: "Jan 2025 — Jun 2025",
    description: [
      "Contributed to the foundational development of an AI-assisted medical report system.",
      "Implemented security guardrails and input validation to harden the system against prompt injection and adversarial inputs.",
      "Developed a multi-model benchmarking system to evaluate LLM performance across all pipeline stages with parallel execution.",
    ],
    tech: [
      "Python",
      "LLM Evaluation",
      "Security",
      "Benchmarking",
    ],
  },
];

export default function Experience() {
  return (
    <SectionWrapper id="experience" title="Experience" index="02">
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-accent/20 to-transparent" />

        <div className="space-y-16">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative pl-8 md:pl-20"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-8 top-2 w-2 h-2 -translate-x-[3.5px] bg-accent rounded-full glow" />

              {/* Period badge */}
              <div className="font-mono text-accent text-xs mb-2 tracking-wider">
                {exp.period}
              </div>

              {/* Card */}
              <div className="bg-surface/50 border border-border rounded-lg p-6 hover:border-accent/30 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h3
                      className="text-xl font-semibold text-foreground"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {exp.role}{" "}
                      <span className="text-accent">@ {exp.company}</span>
                    </h3>
                    <p className="text-muted text-sm font-mono">
                      {exp.location}
                    </p>
                  </div>
                </div>

                <ul className="space-y-3 mb-4">
                  {exp.description.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="text-accent mt-1.5 text-xs">▹</span>
                      <span className="text-secondary text-sm leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-xs font-mono text-accent bg-accent/5 border border-accent/10 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative pl-8 md:pl-20 mt-16"
        >
          <div className="absolute left-0 md:left-8 top-2 w-2 h-2 -translate-x-[3.5px] bg-violet rounded-full" />
          <div className="font-mono text-violet text-xs mb-2 tracking-wider">
            Sep 2021 — Aug 2025
          </div>
          <div className="bg-surface/50 border border-border rounded-lg p-6">
            <h3
              className="text-xl font-semibold text-foreground"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              B.Tech, Computer Science{" "}
              <span className="text-violet">(AI & ML)</span>
            </h3>
            <p className="text-secondary text-sm mt-1">
              Amrita Vishwa Vidyapeetham, Amritapuri
            </p>
            <p className="text-muted text-sm font-mono mt-2">CGPA: 8.48</p>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

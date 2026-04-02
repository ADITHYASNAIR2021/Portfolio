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
    current: true,
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
    current: false,
  },
];

export default function Experience() {
  return (
    <SectionWrapper id="experience" title="Experience" index="02" alternate>
      <div className="relative">
        {/* Animated timeline line */}
        <div
          className="absolute left-0 md:left-8 top-0 bottom-0 w-px"
          style={{
            background: "linear-gradient(180deg, var(--accent) 0%, var(--violet) 50%, transparent 100%)",
            backgroundSize: "100% 200%",
            animation: "timeline-pulse 4s ease-in-out infinite",
          }}
        />

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
              <div className={`absolute left-0 md:left-8 top-2 -translate-x-[3.5px] ${
                exp.current ? "w-3 h-3" : "w-2 h-2"
              }`}>
                <div className={`w-full h-full rounded-full ${
                  exp.current ? "bg-accent pulse-glow" : "bg-accent/60"
                }`} />
                {exp.current && (
                  <div className="absolute inset-0 rounded-full bg-accent/30 animate-ping" />
                )}
              </div>

              {/* Period badge */}
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-accent text-xs tracking-wider">
                  {exp.period}
                </span>
                {exp.current && (
                  <span className="px-2 py-0.5 text-[10px] font-mono text-emerald bg-emerald/10 rounded-full border border-emerald/20">
                    CURRENT
                  </span>
                )}
              </div>

              {/* Card */}
              <div className="glass border border-white/5 rounded-xl p-6 card-hover hover:border-accent/20 group">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h3
                      className="text-xl font-semibold text-foreground"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {exp.role}{" "}
                      <span className="text-accent">@ {exp.company}</span>
                    </h3>
                    <p className="text-muted text-sm font-mono mt-0.5">
                      📍 {exp.location}
                    </p>
                  </div>
                </div>

                <ul className="space-y-3 mb-5">
                  {exp.description.map((item, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + j * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-accent mt-1.5 text-xs">▹</span>
                      <span className="text-secondary text-sm leading-relaxed">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-xs font-mono text-accent bg-accent/5 border border-accent/10 rounded-full hover:bg-accent/10 hover:border-accent/20 transition-colors"
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
          <div className="absolute left-0 md:left-8 top-2 w-2 h-2 -translate-x-[3.5px] bg-violet rounded-full glow-violet" />
          <div className="font-mono text-violet text-xs mb-2 tracking-wider">
            Sep 2021 — Aug 2025
          </div>
          <div className="glass border border-white/5 rounded-xl p-6 hover:border-violet/20 transition-all">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎓</span>
              <div>
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
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

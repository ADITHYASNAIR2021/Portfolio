"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import {
  LensAIIllustration,
  MittiMitraIllustration,
  NamudeYatraIllustration,
  MedReportIllustration,
  OptiHireIllustration,
  DQNIllustration,
} from "./ProjectIllustrations";

const featuredProjects = [
  {
    title: "LensAI",
    subtitle: "AI-Powered Screen Region Explainer",
    period: "Feb 2026 — Present",
    description:
      "Browser extension that lets users highlight any screen region — code, diagrams, articles, UI — and get instant, context-aware explanations powered by LLM integration. No more context-switching friction for developers and researchers.",
    tech: ["JavaScript", "Browser Extension APIs", "Claude", "Claude Code"],
    github: "https://github.com/ADITHYASNAIR2021",
    Illustration: LensAIIllustration,
    color: "#00d4ff",
  },
  {
    title: "Mitti Mitra",
    subtitle: "AI Soil Health Diagnostics for Farmers",
    period: "Dec 2025 — Mar 2026",
    description:
      "Mobile app using computer vision and multi-source data fusion to help Indian farmers assess soil health and receive actionable crop recommendations. Designed the ML pipeline and integrated with a Flutter/Firebase frontend for field-ready deployment.",
    tech: ["Python", "Computer Vision", "Flutter", "Firebase"],
    github: "https://github.com/ADITHYASNAIR2021",
    Illustration: MittiMitraIllustration,
    color: "#22c55e",
  },
  {
    title: "Namude Yatra",
    subtitle: "Multi-Agent Travel Planner",
    period: "Feb — Mar 2025",
    description:
      "Multi-agent travel planner that generates full day-by-day itineraries through coordinated LLM agents using LangChain, with interactive map visualisations (Pydeck) and a chatbot interface for real-time trip adjustments.",
    tech: ["LangChain", "Streamlit", "Pydeck", "Multi-Agent", "Geopy"],
    github: "https://github.com/ADITHYASNAIR2021",
    Illustration: NamudeYatraIllustration,
    color: "#8b5cf6",
  },
];

const otherProjects = [
  {
    title: "MedReportGen AI",
    subtitle: "AI Engine & Architecture",
    period: "Aug 2024 — Feb 2025",
    description:
      "Advanced medical report generation system integrating Microsoft's Radino VLM for feature extraction and an LLM for detailed analysis, transforming unstructured clinical data into precise, structured reports.",
    tech: ["Python", "VLM", "LLM", "Medical AI"],
    github: "https://github.com/ADITHYASNAIR2021",
    Illustration: MedReportIllustration,
    color: "#00d4ff",
  },
  {
    title: "OptiHire",
    subtitle: "AI Job Application Assistant",
    period: "Oct — Nov 2024",
    description:
      "Web app generating tailored cover letters from job descriptions, analysing resumes for keyword gaps, and tracking applications in one place with real-time feedback and visual analytics.",
    tech: ["Streamlit", "Web Scraping", "LLM", "NLP"],
    github: "https://github.com/ADITHYASNAIR2021",
    Illustration: OptiHireIllustration,
    color: "#f59e0b",
  },
  {
    title: "Inventory Optimisation",
    subtitle: "Deep Q-Network Agent",
    period: "Apr — Jun 2024",
    description:
      "Modelled inventory control as a Markov Decision Process. The DQN agent outperformed classic (s,S) reorder policies with lower total costs and fewer stockouts across test scenarios.",
    tech: ["Reinforcement Learning", "DQN", "Python"],
    github: "https://github.com/ADITHYASNAIR2021",
    Illustration: DQNIllustration,
    color: "#8b5cf6",
  },
];

function GitHubIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

export default function Projects() {
  return (
    <SectionWrapper id="projects" title="Projects" index="03">
      {/* Featured projects */}
      <div className="space-y-20 mb-24">
        {featuredProjects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="group"
          >
            {/* Label */}
            <div className="flex items-center gap-3 mb-5">
              <span
                className="font-mono text-xs tracking-widest uppercase"
                style={{ color: project.color }}
              >
                Featured Project
              </span>
              <span className="text-muted font-mono text-xs">
                — {project.period}
              </span>
            </div>

            {/* Card */}
            <div
              className="grid md:grid-cols-2 gap-0 rounded-xl overflow-hidden glass border border-white/5 group-hover:border-opacity-50 transition-all duration-500 card-hover"
              style={{
                borderColor: `${project.color}15`,
              }}
            >
              {/* Illustration side */}
              <div
                className={`relative min-h-[260px] flex items-center justify-center overflow-hidden ${
                  i % 2 === 1 ? "md:order-2" : ""
                }`}
                style={{
                  background: `radial-gradient(ellipse at center, ${project.color}0a 0%, transparent 70%)`,
                }}
              >
                <div className="w-full h-full p-4 group-hover:scale-[1.03] transition-transform duration-700">
                  <project.Illustration />
                </div>
                {/* Corner accent */}
                <div
                  className="absolute top-0 left-0 w-32 h-32 opacity-15 group-hover:opacity-25 transition-opacity"
                  style={{
                    background: `radial-gradient(circle at top left, ${project.color}, transparent 70%)`,
                  }}
                />
                {/* Shimmer effect on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none shimmer"
                />
              </div>

              {/* Content side */}
              <div
                className={`p-8 flex flex-col justify-center ${
                  i % 2 === 1 ? "md:order-1" : ""
                }`}
              >
                <h3
                  className="text-2xl md:text-3xl font-bold mb-1 group-hover:text-foreground transition-colors"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {project.title}
                </h3>
                <p
                  className="font-mono text-xs mb-5"
                  style={{ color: project.color }}
                >
                  {project.subtitle}
                </p>
                <p className="text-secondary text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono px-2.5 py-1 rounded-full border"
                      style={{
                        color: project.color,
                        borderColor: `${project.color}25`,
                        background: `${project.color}08`,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted hover:text-accent transition-colors group/link"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <GitHubIcon />
                    <span className="text-xs font-mono group-hover/link:underline">
                      Source
                    </span>
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-muted hover:text-accent transition-colors group/link"
                    aria-label={`View ${project.title} live`}
                  >
                    <ExternalLinkIcon />
                    <span className="text-xs font-mono group-hover/link:underline">
                      Details
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Other projects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-border" />
          <span className="font-mono text-muted text-xs tracking-widest uppercase whitespace-nowrap">
            Other Noteworthy Projects
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {otherProjects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group flex flex-col glass border border-white/5 rounded-xl overflow-hidden card-hover cursor-pointer"
            >
              {/* Mini illustration */}
              <div
                className="relative h-[160px] flex items-center justify-center overflow-hidden"
                style={{
                  background: `radial-gradient(ellipse at center, ${project.color}08 0%, transparent 80%)`,
                }}
              >
                <div className="w-full h-full p-2 scale-90 origin-center group-hover:scale-95 transition-transform duration-500">
                  <project.Illustration />
                </div>
              </div>

              {/* Card body */}
              <div className="p-5 flex flex-col flex-1 border-t border-white/5">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-muted">
                    {project.period}
                  </span>
                  <span className="text-muted group-hover:text-accent transition-colors">
                    <ExternalLinkIcon />
                  </span>
                </div>
                <h4
                  className="text-lg font-bold mb-1 group-hover:text-accent transition-colors"
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    color: project.color,
                  }}
                >
                  {project.title}
                </h4>
                <p className="text-muted text-xs font-mono mb-3">
                  {project.subtitle}
                </p>
                <p className="text-secondary text-sm leading-relaxed flex-1 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono text-muted"
                    >
                      {t}
                      {t !== project.tech[project.tech.length - 1] && (
                        <span className="text-border ml-1.5">·</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}

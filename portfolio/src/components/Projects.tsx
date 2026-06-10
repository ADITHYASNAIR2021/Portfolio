"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import SectionWrapper from "./SectionWrapper";
import TiltCard from "./TiltCard";
import { featuredProjects, otherProjects, type IllustrationKey } from "@/content/portfolio";
import {
  LensAIIllustration,
  MittiMitraIllustration,
  NamudeYatraIllustration,
  MedReportIllustration,
  OptiHireIllustration,
  DQNIllustration,
  VidyapathIllustration,
  SWCMriIllustration,
} from "./ProjectIllustrations";

const illustrationMap: Record<IllustrationKey, React.ComponentType> = {
  vidyapath: VidyapathIllustration,
  lensai: LensAIIllustration,
  mittiMitra: MittiMitraIllustration,
  namudeYatra: NamudeYatraIllustration,
  swcMri: SWCMriIllustration,
  medReport: MedReportIllustration,
  optiHire: OptiHireIllustration,
  dqn: DQNIllustration,
};

function Illustration({ name }: { name: IllustrationKey }) {
  const Cmp = illustrationMap[name];
  return <Cmp />;
}

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

type Tab = "featured" | "other";

export default function Projects() {
  const [activeTab, setActiveTab] = useState<Tab>("featured");

  return (
    <SectionWrapper id="projects" title="Projects" index="03">

      {/* Tab switcher */}
      <div className="flex items-center gap-1 mb-12 border-b border-border/50 pb-0 -mt-4 overflow-x-auto">
        {(["featured", "other"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-5 py-3 text-sm font-mono transition-colors whitespace-nowrap ${
              activeTab === tab ? "text-accent" : "text-muted hover:text-secondary"
            }`}
          >
            {tab === "featured" ? "Featured" : "Other Projects"}
            {activeTab === tab && (
              <motion.span
                layoutId="tab-underline"
                className="absolute bottom-0 left-0 right-0 h-px bg-accent"
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "featured" ? (
          <motion.div
            key="featured"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-16"
          >
            {featuredProjects.map((project, i) => (
              <div key={project.title} className="group">
                {/* Period label */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-mono text-xs tracking-widest uppercase" style={{ color: project.color }}>
                    Featured
                  </span>
                  <span className="text-muted font-mono text-xs">— {project.period}</span>
                </div>

                {/* Card */}
                <TiltCard max={5} className="rounded-xl">
                <div
                  className="grid md:grid-cols-2 gap-0 rounded-xl overflow-hidden glass border transition-all duration-500 card-hover"
                  style={{ borderColor: `${project.color}18` }}
                >
                  {/* Illustration */}
                  <div
                    className={`relative min-h-[240px] flex items-center justify-center overflow-hidden ${i % 2 === 1 ? "md:order-2" : ""}`}
                    style={{ background: `radial-gradient(ellipse at center, ${project.color}09 0%, transparent 70%)` }}
                  >
                    <div className="w-full h-full p-4 group-hover:scale-[1.03] transition-transform duration-700">
                      <Illustration name={project.illustration} />
                    </div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none shimmer" />
                  </div>

                  {/* Content */}
                  <div className={`p-7 md:p-8 flex flex-col justify-center ${i % 2 === 1 ? "md:order-1" : ""}`}>
                    <h3 className="text-2xl md:text-3xl font-bold mb-1" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                      {project.title}
                    </h3>
                    <p className="font-mono text-xs mb-5" style={{ color: project.color }}>{project.subtitle}</p>
                    <p className="text-secondary text-sm leading-relaxed mb-6">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t) => (
                        <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-full border"
                          style={{ color: project.color, borderColor: `${project.color}25`, background: `${project.color}08` }}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4">
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-muted hover:text-accent transition-colors group/link">
                        <GitHubIcon />
                        <span className="text-xs font-mono group-hover/link:underline">Source</span>
                      </a>
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-muted hover:text-accent transition-colors group/link">
                        <ExternalLinkIcon />
                        <span className="text-xs font-mono group-hover/link:underline">Details</span>
                      </a>
                    </div>
                  </div>
                </div>
                </TiltCard>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="other"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-5"
          >
            {otherProjects.map((project, i) => (
              <TiltCard key={project.title} max={6} className="h-full">
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="group flex flex-col h-full glass border border-white/5 rounded-xl overflow-hidden card-hover cursor-pointer"
              >
                {/* Mini illustration */}
                <div
                  className="relative h-[150px] flex items-center justify-center overflow-hidden"
                  style={{ background: `radial-gradient(ellipse at center, ${project.color}08 0%, transparent 80%)` }}
                >
                  <div className="w-full h-full p-2 scale-90 origin-center group-hover:scale-95 transition-transform duration-500">
                    <Illustration name={project.illustration} />
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col flex-1 border-t border-white/5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-muted">{project.period}</span>
                    <span className="text-muted group-hover:text-accent transition-colors"><ExternalLinkIcon /></span>
                  </div>
                  <h4 className="text-lg font-bold mb-1 group-hover:text-accent transition-colors"
                    style={{ fontFamily: "var(--font-space-grotesk)", color: project.color }}>
                    {project.title}
                  </h4>
                  <p className="text-muted text-xs font-mono mb-3">{project.subtitle}</p>
                  <p className="text-secondary text-sm leading-relaxed flex-1 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.tech.map((t, idx) => (
                      <span key={t} className="text-xs font-mono text-muted">
                        {t}{idx < project.tech.length - 1 && <span className="text-border ml-1.5">·</span>}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
              </TiltCard>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}

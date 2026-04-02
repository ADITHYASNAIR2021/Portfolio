"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const roles = [
  {
    title: "ACM Student Chapter, Amritapuri",
    role: "Member → AI Club Mentor → Chairperson → Advisory Council",
    period: "2022 — Present",
    description:
      "Led the chapter as Chairperson for 1.5 years — organised national-level hackathons, coding competitions, workshops, and the annual tech fest. Mentored students in the AI Club on ML fundamentals. Now serve on the Advisory Council.",
    highlight: true,
  },
  {
    title: "ICPC Asia West Regional Finals",
    role: "Overall Coordinator",
    period: "2022 — 2023",
    description:
      "Coordinated event logistics, participant management, and on-ground operations for the ICPC regional finals hosted at campus.",
    highlight: false,
  },
  {
    title: "Vidyut Multi-Fest",
    role: "Core Committee '24, Executive Member '23",
    period: "2023 — 2024",
    description:
      "Managed participant accommodations and logistics for one of Kerala's largest student-run multi-fests.",
    highlight: false,
  },
  {
    title: "Decoding AI",
    role: "Student Social Responsibility Project",
    period: "2024",
    description:
      "Conducted an introductory AI awareness program at Sreyas Public School, Kottayam — addressing the AI knowledge gap and fostering equitable access to technology education.",
    highlight: false,
  },
];

export default function Leadership() {
  return (
    <SectionWrapper id="leadership" title="Leadership & Community" index="05">
      <div className="grid md:grid-cols-2 gap-6">
        {roles.map((role, i) => (
          <motion.div
            key={role.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`relative p-6 rounded-lg border transition-colors ${
              role.highlight
                ? "bg-accent/5 border-accent/20 hover:border-accent/40"
                : "bg-surface/50 border-border hover:border-accent/20"
            }`}
          >
            {role.highlight && (
              <div className="absolute top-4 right-4">
                <span className="px-2 py-0.5 text-[10px] font-mono text-accent bg-accent/10 rounded-full border border-accent/20">
                  LEAD
                </span>
              </div>
            )}

            <div className="font-mono text-xs text-muted mb-2">
              {role.period}
            </div>
            <h3
              className="text-lg font-semibold text-foreground mb-1"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {role.title}
            </h3>
            <p className="text-accent text-sm font-mono mb-3">{role.role}</p>
            <p className="text-secondary text-sm leading-relaxed">
              {role.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
      >
        {[
          { value: "200+", label: "Members Led" },
          { value: "1.5yr", label: "As Chairperson" },
          { value: "10+", label: "Events Organized" },
          { value: "3", label: "Languages Spoken" },
        ].map((stat, i) => (
          <div key={stat.label} className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
              className="text-3xl md:text-4xl font-bold text-accent glow-text mb-1"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {stat.value}
            </motion.div>
            <p className="text-muted text-xs font-mono uppercase tracking-wider">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}

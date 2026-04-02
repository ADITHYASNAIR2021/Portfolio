"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import SectionWrapper from "./SectionWrapper";

const roles = [
  {
    title: "ACM Student Chapter, Amritapuri",
    role: "Member → AI Club Mentor → Chairperson → Advisory Council",
    period: "2022 — Present",
    description:
      "Led the chapter as Chairperson for 1.5 years — organised national-level hackathons, coding competitions, workshops, and the annual tech fest. Mentored students in the AI Club on ML fundamentals. Now serve on the Advisory Council.",
    highlight: true,
    icon: "🏆",
  },
  {
    title: "ICPC Asia West Regional Finals",
    role: "Overall Coordinator",
    period: "2022 — 2023",
    description:
      "Coordinated event logistics, participant management, and on-ground operations for the ICPC regional finals hosted at campus.",
    highlight: false,
    icon: "🌐",
  },
  {
    title: "Vidyut Multi-Fest",
    role: "Core Committee '24, Executive Member '23",
    period: "2023 — 2024",
    description:
      "Managed participant accommodations and logistics for one of Kerala's largest student-run multi-fests.",
    highlight: false,
    icon: "⚡",
  },
  {
    title: "Decoding AI",
    role: "Student Social Responsibility Project",
    period: "2024",
    description:
      "Conducted an introductory AI awareness program at Sreyas Public School, Kottayam — addressing the AI knowledge gap and fostering equitable access to technology education.",
    highlight: false,
    icon: "📚",
  },
];

const stats = [
  { value: 200, suffix: "+", label: "Members Led" },
  { value: 1.5, suffix: "yr", label: "As Chairperson", decimals: 1 },
  { value: 10, suffix: "+", label: "Events Organized" },
  { value: 3, suffix: "", label: "Languages Spoken" },
];

function AnimatedCounter({
  value,
  suffix,
  decimals = 0,
}: {
  value: number;
  suffix: string;
  decimals?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </span>
  );
}

export default function Leadership() {
  return (
    <SectionWrapper id="leadership" title="Leadership & Community" index="05">
      {/* Featured ACM role — full width */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <div
          className="relative p-8 rounded-xl glass border border-accent/15 overflow-hidden group card-hover"
        >
          {/* Background gradient */}
          <div
            className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity"
            style={{
              background:
                "radial-gradient(ellipse at 80% 20%, rgba(0,212,255,0.08) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(139,92,246,0.06) 0%, transparent 60%)",
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
            <div className="text-4xl">🏆</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2 py-0.5 text-[10px] font-mono text-accent bg-accent/10 rounded-full border border-accent/20">
                  LEAD
                </span>
                <span className="font-mono text-xs text-muted">
                  {roles[0].period}
                </span>
              </div>
              <h3
                className="text-xl md:text-2xl font-semibold text-foreground mb-1"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {roles[0].title}
              </h3>
              <p className="text-accent text-sm font-mono mb-3">
                {roles[0].role}
              </p>
              <p className="text-secondary text-sm leading-relaxed max-w-3xl">
                {roles[0].description}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Other roles */}
      <div className="grid md:grid-cols-3 gap-5 mb-12">
        {roles.slice(1).map((role, i) => (
          <motion.div
            key={role.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (i + 1) * 0.1 }}
            className="relative p-6 rounded-xl glass border border-white/5 card-hover hover:border-accent/15"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xl">{role.icon}</span>
              <span className="font-mono text-xs text-muted">
                {role.period}
              </span>
            </div>
            <h3
              className="text-base font-semibold text-foreground mb-1"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {role.title}
            </h3>
            <p className="text-accent text-xs font-mono mb-3">{role.role}</p>
            <p className="text-secondary text-sm leading-relaxed">
              {role.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Animated Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {stats.map((stat, i) => (
          <div key={stat.label} className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
              className="text-3xl md:text-4xl font-bold text-accent glow-text mb-1"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals}
              />
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

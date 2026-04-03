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
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: "ICPC Asia West Regional Finals",
    role: "Overall Coordinator",
    period: "2022 — 2023",
    description:
      "Coordinated event logistics, participant management, and on-ground operations for the ICPC regional finals hosted at campus.",
    highlight: false,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Vidyut Multi-Fest",
    role: "Core Committee '24, Executive Member '23",
    period: "2023 — 2024",
    description:
      "Managed participant accommodations and logistics for one of Kerala's largest student-run multi-fests.",
    highlight: false,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Decoding AI",
    role: "Student Social Responsibility Project",
    period: "2024",
    description:
      "Conducted an introductory AI awareness program at Sreyas Public School, Kottayam — addressing the AI knowledge gap and fostering equitable access to technology education.",
    highlight: false,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
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
        <div className="relative p-8 rounded-xl glass border border-accent/15 overflow-hidden group card-hover">
          {/* Background gradient */}
          <div
            className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity"
            style={{
              background:
                "radial-gradient(ellipse at 80% 20%, rgba(0,212,255,0.08) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(139,92,246,0.06) 0%, transparent 60%)",
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
            <div className="text-accent shrink-0">{roles[0].icon}</div>
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
              <span className="text-accent">{role.icon}</span>
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

      {/* Stats — bento style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.08 }}
            className="bento-cell bento-cell-accent text-center py-5"
          >
            <div
              className="text-3xl md:text-4xl font-bold text-accent mb-1"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals}
              />
            </div>
            <p className="text-muted text-[10px] font-mono uppercase tracking-wider">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}

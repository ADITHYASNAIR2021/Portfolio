"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type Accent = "cyan" | "violet" | "amber" | "emerald";

const accentVar: Record<Accent, string> = {
  cyan: "var(--accent)",
  violet: "var(--violet)",
  amber: "var(--amber)",
  emerald: "var(--emerald)",
};

interface Props {
  id: string;
  title: string;
  index: string;
  children: ReactNode;
  className?: string;
  alternate?: boolean;
  /** Per-section personality tint for the index number + divider line. Defaults to cyan. */
  accent?: Accent;
}

export default function SectionWrapper({
  id,
  title,
  index,
  children,
  className = "",
  alternate = false,
  accent = "cyan",
}: Props) {
  const color = accentVar[accent];
  return (
    <section
      id={id}
      className={`py-24 md:py-32 px-6 ${alternate ? "section-alt" : ""} ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-sm" style={{ color }}>{index}.</span>
          <h2 className="text-section-title font-display font-bold tracking-tight">
            {title}
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 h-px ml-4 origin-left"
            style={{ background: `linear-gradient(90deg, ${color}33, transparent)` }}
          />
        </motion.div>
        {children}
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  id: string;
  title: string;
  index: string;
  children: ReactNode;
  className?: string;
  alternate?: boolean;
}

export default function SectionWrapper({
  id,
  title,
  index,
  children,
  className = "",
  alternate = false,
}: Props) {
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
          <span className="font-mono text-accent text-sm">{index}.</span>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {title}
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 h-px bg-gradient-to-r from-border to-transparent ml-4 origin-left"
          />
        </motion.div>
        {children}
      </div>
    </section>
  );
}

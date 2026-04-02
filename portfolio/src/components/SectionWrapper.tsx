"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  id: string;
  title: string;
  index: string;
  children: ReactNode;
  className?: string;
}

export default function SectionWrapper({
  id,
  title,
  index,
  children,
  className = "",
}: Props) {
  return (
    <section id={id} className={`py-24 md:py-32 px-6 ${className}`}>
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
          <div className="flex-1 h-px bg-border ml-4" />
        </motion.div>
        {children}
      </div>
    </section>
  );
}

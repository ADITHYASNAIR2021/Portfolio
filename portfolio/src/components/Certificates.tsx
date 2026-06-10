"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { certificates, languages, certificateRepoUrl } from "@/content/portfolio";

function CertIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export default function Certificates() {
  return (
    <SectionWrapper id="certificates" title="Certificates & Languages" index="06">
      <div className="grid md:grid-cols-5 gap-12 items-start">

        {/* Certificates */}
        <div className="md:col-span-3">
          <p className="font-mono text-muted text-[10px] mb-5 tracking-widest uppercase">
            Certifications
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {certificates.map((cert, i) => (
              <motion.a
                key={cert.title}
                href={cert.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group flex items-start gap-3 glass border border-white/5 rounded-xl p-4 card-hover hover:border-accent/15"
                style={{ borderColor: `${cert.color}14` }}
              >
                <span className="shrink-0 mt-0.5" style={{ color: cert.color }}>
                  <CertIcon />
                </span>
                <div className="flex-1 min-w-0">
                  <h4
                    className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {cert.title}
                  </h4>
                  <p className="text-muted text-xs font-mono mt-0.5 truncate">{cert.issuer}</p>
                </div>
                <span className="text-muted group-hover:text-accent transition-colors shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </motion.a>
            ))}
          </div>
          <motion.a
            href={certificateRepoUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="inline-flex items-center gap-2 mt-5 text-xs font-mono text-muted hover:text-accent transition-colors"
          >
            <span>View full certificate repository</span>
            <span>↗</span>
          </motion.a>
        </div>

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-2"
        >
          <p className="font-mono text-muted text-[10px] mb-5 tracking-widest uppercase">
            Languages
          </p>
          <div className="space-y-5">
            {languages.map((lang, i) => (
              <div key={lang.name}>
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-sm text-foreground font-medium">{lang.name}</span>
                  <span className="text-muted text-[10px] font-mono uppercase tracking-wider">
                    {lang.level}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-border/40 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, var(--accent), var(--violet))" }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

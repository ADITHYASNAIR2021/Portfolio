"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/5">
      {/* Subtle aurora glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[180px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 100%, rgba(0,212,255,0.05) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 py-12 relative z-10"
      >
        {/* Personal line */}
        <div className="text-center mb-8">
          <p
            className="text-2xl md:text-3xl font-bold tracking-tight mb-2"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Adithya <span className="gradient-text">S Nair</span>
          </p>
          <p className="text-muted text-sm font-mono">
            AI Engineer &middot; Kerala, India
          </p>
        </div>

        {/* Divider */}
        <div className="section-divider mb-8" />

        {/* Back to top + links row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          {/* Links */}
          <div className="flex items-center gap-6 order-2 sm:order-1">
            <a
              href="https://github.com/ADITHYASNAIR2021"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors font-mono text-xs"
            >
              GitHub
            </a>
            <span className="text-border">·</span>
            <a
              href="https://linkedin.com/in/adithya-s-nair"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors font-mono text-xs"
            >
              LinkedIn
            </a>
            <span className="text-border">·</span>
            <a
              href="mailto:adithyasnair2021@gmail.com"
              className="text-muted hover:text-accent transition-colors font-mono text-xs"
            >
              Email
            </a>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="liquid-glass-btn liquid-glass-btn-secondary !px-4 !py-2 !rounded-full order-1 sm:order-2"
            aria-label="Back to top"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
            <span className="text-xs">Top</span>
          </button>
        </div>

        {/* Credit */}
        <p className="text-muted/50 text-[10px] font-mono text-center mt-6">
          Designed &amp; Built by Adithya S Nair &middot; 2026
        </p>
      </motion.div>
    </footer>
  );
}

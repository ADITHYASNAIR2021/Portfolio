"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-10 px-6 border-t border-white/5 relative overflow-hidden">
      {/* Subtle aurora glow at bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(0,212,255,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto relative z-10"
      >
        {/* Back to top */}
        <div className="flex justify-center mb-8">
          <button
            onClick={scrollToTop}
            className="liquid-glass-btn liquid-glass-btn-secondary px-5 py-2 rounded-full"
            aria-label="Back to top"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M5 15l7-7 7 7"
              />
            </svg>
            <span className="text-xs">Back to top</span>
          </button>
        </div>

        <div className="flex flex-col items-center gap-4">
          {/* Links */}
          <div className="flex items-center gap-6">
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

          {/* Credit */}
          <p className="text-muted text-xs font-mono text-center">
            Designed &amp; Built by{" "}
            <span className="text-secondary hover:text-accent transition-colors">
              Adithya S Nair
            </span>
          </p>
        </div>
      </motion.div>
    </footer>
  );
}

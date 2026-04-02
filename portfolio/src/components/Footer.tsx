"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-10 px-6 border-t border-white/5">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        {/* Back to top */}
        <div className="flex justify-center mb-8">
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2 glass border border-white/5 rounded-full hover:border-accent/20 transition-all"
            aria-label="Back to top"
          >
            <svg
              className="w-4 h-4 text-muted group-hover:text-accent group-hover:-translate-y-0.5 transition-all"
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
            <span className="text-muted group-hover:text-accent text-xs font-mono transition-colors">
              Back to top
            </span>
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
            Designed & Built by{" "}
            <span className="text-secondary hover:text-accent transition-colors">
              Adithya S Nair
            </span>
          </p>

          {/* Easter egg hint */}
          <p className="text-muted/40 text-[10px] font-mono text-center">
            hint: try the konami code ↑↑↓↓←→←→ba
          </p>
        </div>
      </motion.div>
    </footer>
  );
}

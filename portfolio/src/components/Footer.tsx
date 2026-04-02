"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-border">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto flex flex-col items-center gap-4"
      >
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/ADITHYASNAIR2021"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors font-mono text-xs"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/adithya-s-nair"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors font-mono text-xs"
          >
            LinkedIn
          </a>
          <a
            href="mailto:adithyasnair2021@gmail.com"
            className="text-muted hover:text-accent transition-colors font-mono text-xs"
          >
            Email
          </a>
        </div>
        <p className="text-muted text-xs font-mono text-center">
          Designed & Built by Adithya S Nair
        </p>
        <p className="text-muted/50 text-[10px] font-mono text-center">
          hint: try the konami code
        </p>
      </motion.div>
    </footer>
  );
}

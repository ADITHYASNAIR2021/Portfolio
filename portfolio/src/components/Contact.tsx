"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/ADITHYASNAIR2021",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/adithya-s-nair",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:adithyasnair2021@gmail.com",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    label: "Phone",
    href: "tel:+918136859455",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
  },
];

export default function Contact() {
  return (
    <SectionWrapper id="contact" title="Get In Touch" index="06" alternate>
      <div className="max-w-2xl mx-auto text-center">
        {/* Big gradient headline */}
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold mb-6 gradient-text"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Let&apos;s Build Something
          <br />
          Together.
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-secondary text-lg leading-relaxed mb-8"
        >
          I&apos;m always open to discussing new opportunities, interesting AI
          projects, or just having a good conversation about technology. Whether
          you have a question or want to collaborate — my inbox is always open.
        </motion.p>

        {/* Terminal-style email */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass border border-white/5 rounded-xl p-4 mb-10 max-w-md mx-auto"
        >
          <div className="flex items-center gap-2 mb-3 px-1">
            <div className="w-2.5 h-2.5 rounded-full bg-rose/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald/80" />
            <span className="ml-2 font-mono text-[10px] text-muted">
              terminal
            </span>
          </div>
          <div className="font-mono text-sm text-left px-1">
            <span className="text-accent">adithya</span>
            <span className="text-muted">@</span>
            <span className="text-violet">world</span>
            <span className="text-muted">:~$ </span>
            <span className="text-secondary">echo &quot;Let&apos;s connect&quot;</span>
          </div>
          <a
            href="mailto:adithyasnair2021@gmail.com"
            className="block font-mono text-sm text-accent hover:text-accent/80 transition-colors mt-2 text-left px-1 group"
          >
            → adithyasnair2021@gmail.com
            <span className="cursor-blink ml-1 text-accent/60">█</span>
          </a>
        </motion.div>

        {/* CTA Button */}
        <motion.a
          href="mailto:adithyasnair2021@gmail.com"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-block px-10 py-4 bg-gradient-to-r from-accent/10 to-violet/10 border border-accent/30 text-accent font-mono text-sm hover:from-accent/20 hover:to-violet/20 hover:border-accent/50 transition-all duration-300 rounded-lg glow"
        >
          Say Hello
        </motion.a>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-center gap-5 mt-12"
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="relative text-muted hover:text-accent hover:-translate-y-1 transition-all group p-2"
              aria-label={link.label}
            >
              {link.icon}
              {/* Tooltip */}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-[10px] font-mono text-accent bg-surface-2 border border-border rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {link.label}
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

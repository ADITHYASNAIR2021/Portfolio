"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Leadership", href: "#leadership" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      // Close mobile menu when user scrolls
      if (window.scrollY > 50) setMobileOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver for active section
  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    },
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    });

    navItems.forEach((item) => {
      const el = document.querySelector(item.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [handleIntersect]);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX, transformOrigin: "0%" }}
      />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass-strong border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center font-mono text-accent font-bold text-sm group-hover:bg-accent/20 group-hover:border-accent/40 transition-all">
              A
            </span>
            <span className="font-mono text-secondary text-sm hidden sm:inline group-hover:text-accent transition-colors">
              adithya.dev
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
                className={`px-4 py-2 text-sm transition-colors font-mono relative group ${
                  activeSection === item.href
                    ? "text-accent"
                    : "text-secondary hover:text-accent"
                }`}
              >
                {item.label}
                {/* Active indicator */}
                <motion.span
                  className="absolute bottom-0 left-4 right-4 h-px bg-accent"
                  initial={false}
                  animate={{
                    scaleX: activeSection === item.href ? 1 : 0,
                    opacity: activeSection === item.href ? 1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                  style={{ transformOrigin: "left" }}
                />
                {/* Hover indicator */}
                <span className="absolute bottom-0 left-4 right-4 h-px bg-accent/40 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </motion.a>
            ))}
            <motion.a
              href="/Adithya_S_Nair_Resume.pdf"
              target="_blank"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="ml-4 px-4 py-2 border border-accent text-accent text-sm font-mono hover:bg-accent/10 transition-all rounded group"
            >
              <span className="group-hover:mr-1 transition-all">Resume</span>
              <span className="inline-block group-hover:translate-x-0.5 transition-transform opacity-0 group-hover:opacity-100 text-xs">↗</span>
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-accent"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-0.5 bg-accent"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-accent"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 glass-strong lg:hidden flex flex-col items-center justify-center gap-6"
          >
            {navItems.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
                className={`text-2xl font-mono transition-colors ${
                  activeSection === item.href
                    ? "text-accent"
                    : "text-secondary hover:text-accent"
                }`}
              >
                {item.label}
              </motion.a>
            ))}
            <a
              href="/Adithya_S_Nair_Resume.pdf"
              target="_blank"
              onClick={() => setMobileOpen(false)}
              className="mt-4 px-6 py-3 border border-accent text-accent font-mono hover:bg-accent/10 transition-colors rounded"
            >
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

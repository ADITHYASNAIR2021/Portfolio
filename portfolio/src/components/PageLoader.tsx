"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Hide after the reveal animation completes
    const t = setTimeout(() => setVisible(false), 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex items-center justify-center"
          style={{ background: "#06080d", pointerEvents: "none" }}
        >
          {/* Monogram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center gap-4"
          >
            <div
              className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/25 flex items-center justify-center font-mono text-accent font-bold text-2xl"
              style={{ boxShadow: "0 0 40px rgba(0,212,255,0.15)" }}
            >
              A
            </div>
            {/* Loading bar */}
            <motion.div
              className="h-px bg-accent/30 rounded-full overflow-hidden"
              style={{ width: 48 }}
            >
              <motion.div
                className="h-full bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.7, ease: "easeInOut", delay: 0.15 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

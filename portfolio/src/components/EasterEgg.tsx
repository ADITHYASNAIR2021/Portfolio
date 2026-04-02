"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const aiResponses = [
  "> NEURAL LINK ESTABLISHED",
  "> Hello, human! You found the secret passage.",
  "> I'm Adithya's AI assistant. Well, sort of.",
  "> Fun fact: this portfolio was built with love, caffeine, and Claude.",
  "> Did you know? Adithya has trained models that read X-rays better than... well, let's not brag.",
  "> Loading personality module... [████████░░] 80%",
  "> ERROR: Too much awesome detected in this portfolio.",
  "> Adithya once debugged a RAG pipeline at 3 AM. The pipeline won.",
  "> If you're a recruiter, you've already made a great choice by being here.",
  "> P.S. — Try hovering over the neural network in the hero section. You're welcome.",
  "> END TRANSMISSION ████",
];

export default function EasterEgg() {
  const [keys, setKeys] = useState<string[]>([]);
  const [activated, setActivated] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [currentMsg, setCurrentMsg] = useState(0);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (activated) return;
      const newKeys = [...keys, e.key].slice(-KONAMI.length);
      setKeys(newKeys);

      if (newKeys.length === KONAMI.length && newKeys.every((k, i) => k === KONAMI[i])) {
        setActivated(true);
      }
    },
    [keys, activated]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  useEffect(() => {
    if (!activated) return;

    const timer = setInterval(() => {
      setCurrentMsg((prev) => {
        if (prev >= aiResponses.length) {
          clearInterval(timer);
          return prev;
        }
        setMessages((m) => [...m, aiResponses[prev]]);
        return prev + 1;
      });
    }, 1200);

    return () => clearInterval(timer);
  }, [activated]);

  return (
    <AnimatePresence>
      {activated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9998] bg-[#06080d]/95 backdrop-blur-xl flex items-center justify-center p-6"
          onClick={() => {
            setActivated(false);
            setMessages([]);
            setCurrentMsg(0);
            setKeys([]);
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 20 }}
            className="max-w-xl w-full bg-surface border border-accent/30 rounded-lg overflow-hidden glow"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-surface-2 border-b border-border">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-3 font-mono text-xs text-muted">
                adithya-ai-terminal — secret_mode
              </span>
            </div>

            {/* Terminal body */}
            <div className="p-6 font-mono text-sm space-y-2 min-h-[300px] max-h-[400px] overflow-y-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-accent mb-4"
              >
                ╔══════════════════════════════════════╗
                <br />
                ║ &nbsp; KONAMI CODE ACCEPTED &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ║
                <br />
                ║ &nbsp; Welcome to the hidden terminal &nbsp;║
                <br />
                ╚══════════════════════════════════════╝
              </motion.div>

              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={
                    msg.includes("ERROR")
                      ? "text-red-400"
                      : msg.includes("END TRANSMISSION")
                      ? "text-violet"
                      : "text-secondary"
                  }
                >
                  {msg}
                </motion.div>
              ))}

              {currentMsg < aiResponses.length && (
                <span className="text-accent cursor-blink">█</span>
              )}

              {currentMsg >= aiResponses.length && messages.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4 text-muted text-xs"
                >
                  [Click anywhere to close]
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

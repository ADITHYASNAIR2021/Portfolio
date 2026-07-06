"use client";

import { useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Pull strength — higher pulls harder toward the cursor. */
  strength?: number;
  className?: string;
}

/**
 * Wraps a CTA so it drifts slightly toward the cursor on hover.
 * Same pointer-fine + reduced-motion gate as TiltCard, so it never
 * fires on touch devices or for users who've opted out of motion.
 */
export default function Magnetic({ children, strength = 0.25, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const enabled = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !enabled()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * strength;
    const y = (e.clientY - r.top - r.height / 2) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0, 0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`inline-block ${className}`}
      style={{ transition: "transform 0.2s ease-out" }}
    >
      {children}
    </div>
  );
}

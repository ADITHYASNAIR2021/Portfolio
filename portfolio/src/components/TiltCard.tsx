"use client";

import { useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  max?: number;
  /** Adds a moving light glare. */
  glare?: boolean;
}

/**
 * Pointer-driven 3D tilt wrapper. Disabled on touch devices and when the user
 * prefers reduced motion, so it never degrades the mobile experience.
 */
export default function TiltCard({ children, className = "", max = 7, glare = true }: Props) {
  const innerRef = useRef<HTMLDivElement>(null);

  const enabled = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = innerRef.current;
    if (!el || !enabled()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateX(${-py * max}deg) rotateY(${px * max}deg)`;
    el.style.setProperty("--glare-x", `${(px + 0.5) * 100}%`);
    el.style.setProperty("--glare-y", `${(py + 0.5) * 100}%`);
    el.style.setProperty("--glare-o", glare ? "1" : "0");
  };

  const reset = () => {
    const el = innerRef.current;
    if (!el) return;
    el.style.transform = "rotateX(0deg) rotateY(0deg)";
    el.style.setProperty("--glare-o", "0");
  };

  return (
    <div
      style={{ perspective: "1000px" }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={className}
    >
      <div
        ref={innerRef}
        className="tilt-inner relative h-full"
        style={{ transformStyle: "preserve-3d", transition: "transform 0.25s ease-out" }}
      >
        {children}
      </div>
    </div>
  );
}

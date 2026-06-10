"use client";

import { useEffect, useMemo, useRef } from "react";
import { skillGroups } from "@/content/portfolio";

/**
 * DOM-based 3D tag sphere (TagCloud-style). Each skill is a billboarded label
 * positioned on a sphere; a rAF loop rotates the sphere and projects every tag
 * to screen with depth-based scale + opacity. Labels stay upright (readable)
 * and the cursor steers the spin. No WebGL — robust and theme-consistent.
 */
export default function SkillConstellation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tagEls = useRef<(HTMLSpanElement | null)[]>([]);

  const items = useMemo(
    () => skillGroups.flatMap((g) => g.skills.map((label) => ({ label, color: g.color }))),
    []
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const n = items.length;

    // Fibonacci sphere — stable unit vectors
    const pts = items.map((_, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const phi = i * Math.PI * (3 - Math.sqrt(5));
      return { x: Math.cos(phi) * r, y, z: Math.sin(phi) * r };
    });

    let rx = 0.3;
    let ry = 0;
    // base idle spin + pointer-steered target
    const vel = { x: 0.0024, y: 0.0011 };
    const target = { x: 0.0024, y: 0.0011 };
    let raf = 0;

    const radius = () => Math.min(container.clientWidth, 520) * 0.34;

    const onMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      target.x = -py * 0.05;
      target.y = px * 0.06;
    };
    const onLeave = () => {
      target.x = 0.0024;
      target.y = 0.0011;
    };
    container.addEventListener("pointermove", onMove);
    container.addEventListener("pointerleave", onLeave);

    const animate = () => {
      vel.x += (target.x - vel.x) * 0.05;
      vel.y += (target.y - vel.y) * 0.05;
      rx += vel.x;
      ry += vel.y;
      const sinX = Math.sin(rx);
      const cosX = Math.cos(rx);
      const sinY = Math.sin(ry);
      const cosY = Math.cos(ry);
      const R = radius();

      for (let i = 0; i < n; i++) {
        const el = tagEls.current[i];
        if (!el) continue;
        const p = pts[i];
        // rotate around Y then X
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        const y1 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;
        const depth = (z2 + 1) / 2; // 0 (back) → 1 (front)
        const scale = 0.55 + depth * 0.55;
        el.style.transform = `translate(-50%, -50%) translate(${x1 * R}px, ${y1 * R}px) scale(${scale})`;
        el.style.opacity = String(0.28 + depth * 0.72);
        el.style.zIndex = String(Math.floor(depth * 100));
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerleave", onLeave);
    };
  }, [items]);

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="relative h-[380px] w-full select-none overflow-hidden"
        style={{ cursor: "grab" }}
      >
        {items.map((it, i) => (
          <span
            key={it.label}
            ref={(el) => {
              tagEls.current[i] = el;
            }}
            className="absolute left-1/2 top-1/2 font-mono text-sm whitespace-nowrap pointer-events-none"
            style={{ color: it.color, willChange: "transform, opacity", textShadow: "0 0 12px rgba(0,0,0,0.6)" }}
          >
            {it.label}
          </span>
        ))}
      </div>

      {/* Category legend */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-2">
        {skillGroups.map((g) => (
          <span key={g.label} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: g.color }} />
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted">
              {g.label}
            </span>
          </span>
        ))}
      </div>
      <p className="text-center text-[10px] font-mono text-muted/60 mt-3">move cursor to steer</p>
    </div>
  );
}

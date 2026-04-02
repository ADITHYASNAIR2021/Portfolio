"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  hue: number; // 0 = cyan, 1 = violet
}

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      // Fewer particles but wider connection radius for a "neural" feel
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 18000), 120);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.8 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        hue: Math.random() > 0.7 ? 1 : 0, // 30% violet, 70% cyan
      }));
    };

    const drawParticle = (p: Particle, mouseProximity: number) => {
      // Brighten near mouse
      const boost = mouseProximity > 0 ? mouseProximity * 0.5 : 0;
      const finalOpacity = Math.min(p.opacity + boost, 1);
      const finalRadius = p.radius + (mouseProximity > 0 ? mouseProximity * 1.5 : 0);

      ctx.beginPath();
      ctx.arc(p.x, p.y, finalRadius, 0, Math.PI * 2);

      if (p.hue === 1) {
        ctx.fillStyle = `rgba(139, 92, 246, ${finalOpacity})`;
      } else {
        ctx.fillStyle = `rgba(0, 212, 255, ${finalOpacity})`;
      }
      ctx.fill();
    };

    const drawConnection = (p1: Particle, p2: Particle, dist: number) => {
      const opacity = (1 - dist / 180) * 0.12;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);

      // Mix colors if different hues
      if (p1.hue !== p2.hue) {
        const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        grad.addColorStop(0, `rgba(0, 212, 255, ${opacity})`);
        grad.addColorStop(1, `rgba(139, 92, 246, ${opacity})`);
        ctx.strokeStyle = grad;
      } else if (p1.hue === 1) {
        ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
      } else {
        ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
      }

      ctx.lineWidth = 0.5;
      ctx.stroke();
    };

    const drawMouseConnection = (p: Particle, dist: number) => {
      const opacity = (1 - dist / 250) * 0.35;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(mouse.x, mouse.y);

      const grad = ctx.createLinearGradient(p.x, p.y, mouse.x, mouse.y);
      grad.addColorStop(0, p.hue === 1
        ? `rgba(139, 92, 246, ${opacity})`
        : `rgba(0, 212, 255, ${opacity})`
      );
      grad.addColorStop(1, `rgba(139, 92, 246, ${opacity * 0.5})`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    };

    // Grid-based spatial hashing for O(n) neighbor lookup
    const CELL_SIZE = 180;
    const getCell = (x: number, y: number) => {
      return `${Math.floor(x / CELL_SIZE)},${Math.floor(y / CELL_SIZE)}`;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Build spatial grid
      const grid: Map<string, number[]> = new Map();
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const cell = getCell(p.x, p.y);
        if (!grid.has(cell)) grid.set(cell, []);
        grid.get(cell)!.push(i);
      });

      // Draw particles with mouse proximity
      particles.forEach((p) => {
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        const mouseProximity = mDist < 250 ? 1 - mDist / 250 : 0;
        drawParticle(p, mouseProximity);

        if (mDist < 250) {
          drawMouseConnection(p, mDist);
        }
      });

      // Draw connections using spatial grid
      const checkedPairs = new Set<string>();
      particles.forEach((p, i) => {
        const cx = Math.floor(p.x / CELL_SIZE);
        const cy = Math.floor(p.y / CELL_SIZE);

        // Check neighboring cells
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            const neighborCell = `${cx + dx},${cy + dy}`;
            const neighbors = grid.get(neighborCell);
            if (!neighbors) continue;

            for (const j of neighbors) {
              if (j <= i) continue;
              const pairKey = `${i}-${j}`;
              if (checkedPairs.has(pairKey)) continue;
              checkedPairs.add(pairKey);

              const ddx = p.x - particles[j].x;
              const ddy = p.y - particles[j].y;
              const dist = Math.sqrt(ddx * ddx + ddy * ddy);
              if (dist < 180) {
                drawConnection(p, particles[j], dist);
              }
            }
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    const handleMouse = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouse = { x: -1000, y: -1000 };
    };

    resize();
    createParticles();
    animate();

    const onResize = () => {
      resize();
      createParticles();
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ background: "transparent" }}
    />
  );
}

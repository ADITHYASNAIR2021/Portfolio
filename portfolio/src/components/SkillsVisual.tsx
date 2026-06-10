"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ReactNode } from "react";

const SkillConstellation = dynamic(() => import("./SkillConstellation"), {
  ssr: false,
  loading: () => null,
});

/**
 * Shows the interactive 3D skill constellation on capable screens, and falls
 * back to the categorised list on mobile / reduced-motion.
 */
export default function SkillsVisual({ fallback }: { fallback: ReactNode }) {
  const [enable3D, setEnable3D] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmall = window.matchMedia("(max-width: 767px)").matches;
    if (!reduceMotion && !isSmall) setEnable3D(true);
  }, []);

  return enable3D ? <SkillConstellation /> : <>{fallback}</>;
}

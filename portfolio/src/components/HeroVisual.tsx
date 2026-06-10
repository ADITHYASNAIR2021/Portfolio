"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { CpuArchitecture } from "@/components/ui/cpu-architecture";

/** SVG fallback — shown on mobile, with reduced-motion, or while the 3D scene loads. */
function CpuFallback() {
  return (
    <CpuArchitecture
      text="AI"
      className="opacity-80 w-full h-auto"
      animateText
      animateLines
      animateMarkers
    />
  );
}

const Hero3D = dynamic(() => import("./Hero3D"), {
  ssr: false,
  loading: () => <CpuFallback />,
});

/**
 * Decides between the R3F neural-cloud centerpiece and the lightweight CPU SVG.
 * 3D only when the user hasn't requested reduced motion and the viewport is large.
 */
export default function HeroVisual() {
  const [enable3D, setEnable3D] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmall = window.matchMedia("(max-width: 767px)").matches;
    if (!reduceMotion && !isSmall) setEnable3D(true);
  }, []);

  return enable3D ? <Hero3D /> : <CpuFallback />;
}

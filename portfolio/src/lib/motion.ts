import type { Variants } from "framer-motion";

/** Standard scroll-reveal: fade + rise. Reduced motion is handled globally via <MotionConfig reducedMotion="user">. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1 },
};

export const viewportOnce = { once: true, margin: "-100px" } as const;

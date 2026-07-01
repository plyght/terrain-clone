"use client";

import { motion } from "motion/react";

// exact easing preset from the source bundle
const GENTLE = [0.05, 0.5, 0.5, 0.75] as const;

export default function FadeInUp({
  className,
  up = true,
  children,
}: {
  className?: string;
  up?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: up ? 10 : 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: GENTLE }}
    >
      {children}
    </motion.div>
  );
}

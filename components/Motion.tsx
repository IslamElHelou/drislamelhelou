"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

export function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: fadeUp.hidden,
        show: {
          ...fadeUp.show,
          transition: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...(fadeUp.show as any).transition,
            delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function MotionFadeInUp({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return <FadeIn delay={delay}>{children}</FadeIn>;
}

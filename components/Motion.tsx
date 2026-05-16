"use client";

import * as React from "react";

export function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return <div style={{ animationDelay: `${delay}s` }}>{children}</div>;
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

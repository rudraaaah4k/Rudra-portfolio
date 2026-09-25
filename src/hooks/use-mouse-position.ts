"use client";
import { useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export function useMousePosition(spring = false) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [x, y]);

  if (spring) {
    return { x: springX, y: springY };
  }

  return { x, y };
}

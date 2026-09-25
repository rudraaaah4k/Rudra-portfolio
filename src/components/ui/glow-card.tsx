"use client";
import { useRef, useCallback } from "react";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * GlowCard — mouse-following radial glow using direct DOM manipulation.
 * No React state, no re-renders during mouse movement.
 */
export function GlowCard({ children, className = "" }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (!ref.current || !glowRef.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(99,102,241,0.12), transparent 60%)`;
    glowRef.current.style.opacity = "0.4";
  }, []);

  const handleLeave = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = "0";
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className={`relative rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden ${className}`}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{ opacity: 0 }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

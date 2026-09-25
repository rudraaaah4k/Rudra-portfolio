"use client";
import { useRef, useCallback } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltAmount?: number;
  glareEnabled?: boolean;
}

/**
 * High-perf tilt card — uses direct DOM manipulation instead of React state.
 * On every mouse move we update CSS transform + glare gradient directly via refs,
 * skipping React's reconciliation entirely.
 */
export function TiltCard({ children, className = "", tiltAmount = 8, glareEnabled = true }: TiltCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);

    const tiltX = -percentY * tiltAmount;
    const tiltY = percentX * tiltAmount;

    el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

    if (glareEnabled && glareRef.current) {
      const gx = ((e.clientX - rect.left) / rect.width) * 100;
      const gy = ((e.clientY - rect.top) / rect.height) * 100;
      glareRef.current.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.15), transparent 60%)`;
      glareRef.current.style.opacity = "1";
    }
  }, [tiltAmount, glareEnabled]);

  const handleMouseLeave = useCallback(() => {
    const el = containerRef.current;
    if (el) el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    if (glareRef.current) glareRef.current.style.opacity = "0";
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
      style={{ transformStyle: "preserve-3d", transition: "transform 0.15s ease-out" }}
    >
      {children}
      {/* Glare overlay */}
      {glareEnabled && (
        <div
          ref={glareRef}
          className="absolute inset-0 rounded-2xl pointer-events-none z-20 transition-opacity duration-300"
          style={{ opacity: 0 }}
        />
      )}
    </div>
  );
}

"use client";
import { useRef, useCallback } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  variant?: "primary" | "secondary" | "ghost";
}

/**
 * Magnetic button — uses direct DOM transform instead of framer-motion springs.
 * Removes framer-motion dependency entirely from this component.
 */
export function MagneticButton({ children, className = "", onClick, href, target, variant = "primary" }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }, []);

  const reset = useCallback(() => {
    if (ref.current) ref.current.style.transform = "translate3d(0, 0, 0)";
  }, []);

  const baseStyles = "relative inline-flex items-center gap-2 rounded-full font-medium transition-all duration-300 text-sm";
  const variants = {
    primary: "bg-indigo-500 text-white hover:bg-indigo-400 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] px-6 py-3",
    secondary: "border border-white/20 text-white hover:bg-white/5 hover:border-indigo-500/30 px-6 py-3",
    ghost: "text-zinc-400 hover:text-white px-4 py-2",
  };

  const content = (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      style={{ transition: "transform 0.2s ease-out, background 0.3s, box-shadow 0.3s, border-color 0.3s" }}
    >
      {children}
    </div>
  );

  if (href) {
    return <a href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined}>{content}</a>;
  }
  return content;
}

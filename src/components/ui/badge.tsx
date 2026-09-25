"use client";
import { motion } from "framer-motion";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline";
}

export function Badge({ children, className = "", variant = "default" }: BadgeProps) {
  const styles = variant === "outline"
    ? "border border-white/10 text-zinc-400"
    : "bg-white/5 text-zinc-300";

  return (
    <motion.span
      whileHover={{ scale: 1.05, backgroundColor: "rgba(99, 102, 241, 0.15)" }}
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${styles} ${className}`}
    >
      {children}
    </motion.span>
  );
}

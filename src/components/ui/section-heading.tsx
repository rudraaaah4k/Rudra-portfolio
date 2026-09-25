"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({ eyebrow, title, subtitle, className = "", align = "left" }: SectionHeadingProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const alignment = align === "center" ? "text-center" : "text-left";

  return (
    <div ref={ref} className={`mb-16 md:mb-24 ${alignment} ${className}`}>
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-indigo-400 text-xs tracking-[0.2em] uppercase font-medium mb-4"
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-zinc-400 text-base md:text-lg mt-4 max-w-xl"
          style={align === "center" ? { marginInline: "auto" } : {}}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

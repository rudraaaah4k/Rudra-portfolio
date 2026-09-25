"use client";
import { motion } from "framer-motion";

const techStack = [
  "React", "TypeScript", "Node.js", "Express.js", "PostgreSQL", "MongoDB",
  "Prisma", "REST API", "JWT", "Docker", "Tailwind CSS", "Git",
  "RBAC", "Bcrypt", "Vite", "Vercel", "TanStack Query", "Chart.js",
];

export function Marquee() {
  return (
    <div className="relative py-10 overflow-hidden border-y border-white/[0.04]">
      {/* Gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-black to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-black to-transparent pointer-events-none" />

      {/* Scrolling row 1 */}
      <div className="flex gap-8 mb-4 animate-marquee">
        {[...techStack, ...techStack].map((tech, i) => (
          <span
            key={`a-${i}`}
            className="shrink-0 text-sm font-medium text-zinc-600 whitespace-nowrap flex items-center gap-3"
          >
            <span className="text-indigo-500/40">◆</span>
            {tech}
          </span>
        ))}
      </div>

      {/* Scrolling row 2 — reverse */}
      <div className="flex gap-8 animate-marquee-reverse">
        {[...techStack.slice().reverse(), ...techStack.slice().reverse()].map((tech, i) => (
          <span
            key={`b-${i}`}
            className="shrink-0 text-sm font-medium text-zinc-700 whitespace-nowrap flex items-center gap-3"
          >
            <span className="text-violet-500/30">●</span>
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

/* Single-row variant for tighter spaces */
export function MarqueeSingle({ className = "" }: { className?: string }) {
  return (
    <div className={`relative py-6 overflow-hidden ${className}`}>
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-black to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-black to-transparent pointer-events-none" />

      <div className="flex gap-12 animate-marquee">
        {[...techStack, ...techStack].map((tech, i) => (
          <span
            key={i}
            className="shrink-0 text-xs tracking-[0.15em] uppercase text-zinc-600 font-mono whitespace-nowrap"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

const orbitingTech = [
  { label: "React", angle: 0 },
  { label: "Node", angle: 60 },
  { label: "TS", angle: 120 },
  { label: "DB", angle: 180 },
  { label: "API", angle: 240 },
  { label: "JWT", angle: 300 },
];

export function HeroPhoto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(0, { stiffness: 100, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 100, damping: 30 });

  useEffect(() => setMounted(true), []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
    rotateX.set(-(e.clientY - centerY) / 15);
    rotateY.set((e.clientX - centerX) / 15);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex items-center justify-center"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        {/* Ambient glow behind photo */}
        <div className="photo-glow" />

        {/* Outer orbital ring 1 */}
        <div
          className="absolute inset-[-30px] rounded-full border border-indigo-500/[0.08] pointer-events-none"
          style={{
            animation: "orbit 20s linear infinite",
            transformStyle: "preserve-3d",
            transform: "rotateX(65deg)",
          }}
        >
          {/* Orbiting dot */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.6)]" />
        </div>

        {/* Outer orbital ring 2 */}
        <div
          className="absolute inset-[-50px] rounded-full border border-violet-500/[0.06] pointer-events-none"
          style={{
            animation: "orbit-reverse 30s linear infinite",
            transformStyle: "preserve-3d",
            transform: "rotateX(75deg) rotateY(20deg)",
          }}
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
        </div>

        {/* Outer orbital ring 3 */}
        <div
          className="absolute inset-[-70px] rounded-full border border-indigo-400/[0.04] pointer-events-none"
          style={{
            animation: "orbit 40s linear infinite",
            transformStyle: "preserve-3d",
            transform: "rotateX(50deg) rotateY(-15deg)",
          }}
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-300 shadow-[0_0_8px_rgba(129,140,248,0.4)]" />
        </div>

        {/* Animated gradient border */}
        <div className="photo-border-glow">
          <div className="rounded-full overflow-hidden bg-black p-1">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden">
              <Image
                src="/rudra.jpg"
                alt="Rudra - Full-Stack Developer"
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 288px, 320px"
                priority
              />
              {/* Subtle overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* Orbiting tech badges */}
        {mounted && (
          <div
            className="absolute inset-[-90px] pointer-events-none hidden lg:block"
            style={{
              animation: "orbit 35s linear infinite",
              transformStyle: "preserve-3d",
              transform: "rotateX(70deg)",
            }}
          >
            {orbitingTech.map((tech) => (
              <div
                key={tech.label}
                className="absolute"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `rotate(${tech.angle}deg) translateX(calc(50% + 90px)) rotate(-${tech.angle}deg) rotateX(-70deg)`,
                }}
              >
                <span className="px-2 py-0.5 rounded-full bg-black/80 border border-white/10 text-[9px] font-mono text-indigo-300/60 whitespace-nowrap backdrop-blur-sm">
                  {tech.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Corner accents */}
        <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-indigo-500/30 rounded-tr-lg pointer-events-none" />
        <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-indigo-500/30 rounded-bl-lg pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}

/* Smaller photo for About section */
export function AboutPhoto() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative"
    >
      {/* Decorative frame */}
      <div className="relative">
        {/* Glow backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-violet-500/10 to-transparent rounded-2xl blur-3xl -z-10 scale-110" />

        {/* Photo container */}
        <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.02]">
          <div className="relative w-full aspect-[3/4] max-w-[320px]">
            <Image
              src="/rudra.jpg"
              alt="Rudra"
              fill
              className="object-cover object-top"
              sizes="320px"
            />
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-violet-500/10 mix-blend-overlay" />
          </div>

          {/* Info bar at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
            <p className="text-white font-semibold text-sm">Rudra</p>
            <p className="text-indigo-300 text-xs font-mono mt-0.5">Full-Stack Developer</p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-2 -right-2 w-16 h-16 border border-indigo-500/20 rounded-lg -z-10 hidden md:block" />
        <div className="absolute -bottom-2 -left-2 w-12 h-12 border border-violet-500/15 rounded-lg -z-10 hidden md:block" />

        {/* Status indicator */}
        <div className="absolute -top-3 -right-3 px-3 py-1 rounded-full bg-black border border-emerald-500/30 flex items-center gap-1.5 hidden md:flex">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] text-emerald-400 font-medium">Open to work</span>
        </div>
      </div>
    </motion.div>
  );
}

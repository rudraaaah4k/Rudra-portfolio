"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PERSONAL, LINKS } from "@/lib/constants";
import { ArrowDown, Download, Sparkles } from "lucide-react";
import { HeroPhoto } from "@/components/ui/hero-photo";
import { HeroDecorations } from "@/components/ui/floating-shapes";
import { Terminal } from "@/components/ui/terminal";
import { TypingEffect } from "@/components/ui/typing-effect";
import { MagneticButton } from "@/components/ui/magnetic-button";

/**
 * Canvas particle network — optimized with offscreen pre-rendering
 * and reduced particle count. Only runs when hero is visible.
 */
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    let isVisible = true;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // 20 particles instead of 30, reduced connection distance
    for (let i = 0; i < 20; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    // Visibility observer — pause animation when off screen
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    const animate = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections — reduced threshold distance to 100px
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 10000) { // 100px squared
            const dist = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.04 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${p.opacity})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

/**
 * CSS-only floating keywords — replaces 8 framer-motion animate loops
 */
const floatingKeywords = ["React", "Node.js", "TypeScript", "PostgreSQL", "REST API", "Docker", "JWT", "Express"];

function FloatingKeywords() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
      {floatingKeywords.map((word, i) => (
        <span
          key={word}
          className="absolute text-[10px] tracking-widest uppercase text-white/[0.06] font-mono floating-keyword"
          style={{
            left: `${10 + (i * 12) % 80}%`,
            top: `${15 + (i * 17) % 70}%`,
            animationDelay: `${i * 1.5}s`,
            animationDuration: `${8 + i * 2}s`,
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}

export function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section ref={containerRef} id="hero" className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <Particles />
      <HeroDecorations />
      <FloatingKeywords />

      {/* Radial gradient mouse follower replaced with static ambient glow for performance */}
      {mounted && (
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[600px] h-[600px] rounded-full pointer-events-none hidden lg:block z-0 hero-ambient-glow" />
      )}

      {/* Main content area */}
      <motion.div style={{ y, opacity }} className="relative z-10 flex-1 flex items-center w-full max-w-7xl mx-auto px-6 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          {/* Left: Text content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Eyebrow with sparkle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center lg:justify-start gap-3 mb-8"
            >
              <div className="h-px w-8 bg-gradient-to-r from-indigo-500/50 to-violet-500/50 hidden lg:block" />
              <span className="text-xs tracking-[0.25em] uppercase text-zinc-500 font-medium flex items-center gap-2">
                <Sparkles size={12} className="text-indigo-400 animate-pulse" />
                {PERSONAL.title.toUpperCase()}
              </span>
            </motion.div>

            {/* Headline with typing effect */}
            <div className="overflow-hidden mb-6">
              <motion.h1
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.08]"
              >
                I build
                <br />
                <TypingEffect />
                <br />
                <span className="text-gradient">that scale.</span>
              </motion.h1>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-zinc-400 text-base md:text-lg max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              {PERSONAL.heroDescription}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <MagneticButton
                variant="primary"
                onClick={() => document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })}
                className="group"
              >
                View My Work
                <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
              </MagneticButton>
              <MagneticButton
                variant="secondary"
                href={LINKS.resume}
                target="_blank"
                className="group"
              >
                <Download size={14} />
                Download Resume
              </MagneticButton>
            </motion.div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="mt-10 flex items-center justify-center lg:justify-start gap-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs text-zinc-500">{PERSONAL.availability}</span>
            </motion.div>
          </div>

          {/* Right: Photo */}
          <div className="order-1 lg:order-2 flex justify-center">
            <HeroPhoto />
          </div>
        </div>
      </motion.div>

      {/* Terminal widget */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-3xl mx-auto px-6 pb-20 mt-8"
      >
        <Terminal />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="scroll-indicator-mouse">
          <div className="scroll-indicator-dot" />
        </div>
      </motion.div>
    </section>
  );
}

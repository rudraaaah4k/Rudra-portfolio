"use client";
import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const techWords = [
  "React", "Node.js", "TypeScript", "Express", "PostgreSQL", "MongoDB",
  "REST API", "JWT", "Docker", "Prisma", "Git", "RBAC",
  "HTML", "CSS", "Tailwind", "Vite", "Vercel", "Render",
  "JavaScript", "SQL", "Java", "C++", "Python", "OOP",
  "TanStack", "Chart.js", "Bcrypt", "ERD", "CI/CD", "DSA",
];

interface Point3D {
  x: number; y: number; z: number;
  word: string;
}

function fibonacciSphere(n: number, words: string[]): Point3D[] {
  const points: Point3D[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    points.push({
      x: Math.cos(theta) * radius,
      y,
      z: Math.sin(theta) * radius,
      word: words[i % words.length],
    });
  }
  return points;
}

export function TechSphere({ size = 280 }: { size?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const angleRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0.002, y: 0.003 });
  const pointsRef = useRef(fibonacciSphere(techWords.length, techWords));
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  /* ── Direct DOM manipulation — bypasses React entirely ── */
  const updatePositions = useCallback(() => {
    const { x: ax, y: ay } = angleRef.current;
    const cosX = Math.cos(ax), sinX = Math.sin(ax);
    const cosY = Math.cos(ay), sinY = Math.sin(ay);
    const r = size / 2;

    pointsRef.current.forEach((p, i) => {
      // Rotate around Y axis
      let x = p.x * cosY - p.z * sinY;
      let z = p.x * sinY + p.z * cosY;
      // Rotate around X axis
      let y = p.y * cosX - z * sinX;
      z = p.y * sinX + z * cosX;

      const perspective = 600;
      const projScale = perspective / (perspective + z * r);
      const opacity = Math.max(0.15, 0.2 + 0.8 * ((z + 1) / 2));
      const px = x * r * projScale;
      const py = y * r * projScale;

      const el = spanRefs.current[i];
      if (el) {
        el.style.transform = `translate(-50%, -50%) translate(${px}px, ${py}px) scale(${projScale})`;
        el.style.opacity = String(opacity);
        el.style.fontSize = `${10 + projScale * 3}px`;
        el.style.color = z > 0.3
          ? `rgba(129, 140, 248, ${opacity})`
          : `rgba(161, 161, 170, ${opacity * 0.7})`;
        el.style.fontWeight = z > 0.5 ? "600" : "400";
        el.style.textShadow = z > 0.5 ? "0 0 20px rgba(99,102,241,0.3)" : "none";
        el.style.zIndex = String(Math.round((z + 1) * 50));
      }
    });
  }, [size]);

  useEffect(() => {
    const animate = () => {
      if (!isDragging.current) {
        angleRef.current.x += velocityRef.current.x;
        angleRef.current.y += velocityRef.current.y;
      }
      updatePositions();
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [updatePositions]);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;
    angleRef.current.y += dx * 0.005;
    angleRef.current.x += dy * 0.005;
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="relative select-none touch-none"
      style={{ width: size, height: size, cursor: "grab" }}
      data-cursor="DRAG"
    >
      {/* Center glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: size * 0.4,
          height: size * 0.4,
          background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* Words — rendered once, updated via direct DOM refs */}
      {pointsRef.current.map((p, i) => (
        <span
          key={i}
          ref={(el) => { spanRefs.current[i] = el; }}
          className="absolute whitespace-nowrap font-mono pointer-events-none"
          style={{
            left: "50%",
            top: "50%",
            willChange: "transform, opacity",
          }}
        >
          {p.word}
        </span>
      ))}

      {/* Subtle ring */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04] pointer-events-none"
        style={{ width: size * 0.85, height: size * 0.85 }}
      />
    </motion.div>
  );
}

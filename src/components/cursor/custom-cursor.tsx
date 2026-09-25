"use client";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

/**
 * Creative Custom Cursor — Acts as a glowing aura and trail behind the hardware cursor.
 * We no longer hide the hardware cursor, so input lag is physically impossible.
 * This runs on requestAnimationFrame for butter-smooth visual trailing.
 */
export function CustomCursor() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [cursorText, setCursorText] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  const mouseRef = useRef({ x: 0, y: 0 });
  const auraRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  // Trail positions
  const pos = useRef({
    dot: { x: 0, y: 0 },
    aura: { x: 0, y: 0 },
  });

  useEffect(() => {
    if (!isDesktop) return;

    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let rafId: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const p = pos.current;

      // The dot is snappy, the aura floats lazily behind
      p.dot.x = lerp(p.dot.x, mx, 0.4);
      p.dot.y = lerp(p.dot.y, my, 0.4);
      p.aura.x = lerp(p.aura.x, mx, 0.12);
      p.aura.y = lerp(p.aura.y, my, 0.12);

      // Apply transforms
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${p.dot.x - 3}px, ${p.dot.y - 3}px, 0)`;
      if (auraRef.current) auraRef.current.style.transform = `translate3d(${p.aura.x - 200}px, ${p.aura.y - 200}px, 0)`;

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // Hover detection for interactive elements
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el = target.closest("[data-cursor]");
      const link = target.closest("a, button");
      
      if (el) {
        setIsHovering(true);
        setCursorText(el.getAttribute("data-cursor") || "");
      } else if (link) {
        setIsHovering(true);
        setCursorText("");
      }
    };
    const handleOut = (e: MouseEvent) => {
      setIsHovering(false);
      setCursorText("");
    };

    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Huge subtle ambient glowing aura that follows the mouse lazily */}
      <div
        ref={auraRef}
        className={`fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-[9997] transition-opacity duration-700 mix-blend-screen ${
          isHovering ? "opacity-60" : "opacity-30"
        }`}
        style={{ 
          background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.05) 40%, transparent 70%)",
          willChange: "transform" 
        }}
      />
      
      {/* Little snappy dot that provides immediate visual feedback */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-indigo-400 rounded-full pointer-events-none z-[9999] shadow-[0_0_10px_rgba(99,102,241,0.8)]"
        style={{ willChange: "transform" }}
      />
      
      {/* Text label that pops up when hovering over elements */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center transition-all duration-300 ease-out ${
          isHovering && cursorText ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
        style={{
          transform: `translate3d(${mouseRef.current.x + 20}px, ${mouseRef.current.y - 20}px, 0)`,
        }}
      >
        <div className="px-3 py-1.5 rounded-full bg-indigo-500/90 backdrop-blur-md text-white text-[10px] font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(99,102,241,0.4)]">
          {cursorText}
        </div>
      </div>
    </>
  );
}

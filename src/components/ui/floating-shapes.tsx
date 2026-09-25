"use client";

/* ─── Pure CSS 3D Wireframe Cube ─── */
function WireframeCube({ size = 60, className = "" }: { size?: number; className?: string }) {
  const half = size / 2;
  const faces = [
    { transform: `rotateY(0deg) translateZ(${half}px)` },
    { transform: `rotateY(90deg) translateZ(${half}px)` },
    { transform: `rotateY(180deg) translateZ(${half}px)` },
    { transform: `rotateY(-90deg) translateZ(${half}px)` },
    { transform: `rotateX(90deg) translateZ(${half}px)` },
    { transform: `rotateX(-90deg) translateZ(${half}px)` },
  ];

  return (
    <div className={`pointer-events-none ${className}`} style={{ perspective: "800px" }}>
      <div
        className="preserve-3d"
        style={{
          width: size,
          height: size,
          animation: "rotate-cube 20s linear infinite",
          transformStyle: "preserve-3d",
        }}
      >
        {faces.map((face, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: size,
              height: size,
              border: "1px solid rgba(99, 102, 241, 0.12)",
              borderRadius: "2px",
              transform: face.transform,
              transformStyle: "preserve-3d",
              backfaceVisibility: "visible",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Pure CSS 3D Wireframe Octahedron ─── */
function WireframeOctahedron({ size = 50, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`pointer-events-none ${className}`} style={{ perspective: "600px" }}>
      <div
        style={{
          width: size,
          height: size,
          position: "relative",
          animation: "rotate-octa 25s linear infinite",
          transformStyle: "preserve-3d",
        }}
      >
        {[0, 90, 180, 270].map((angle) => (
          <div
            key={angle}
            style={{
              position: "absolute",
              width: 0,
              height: 0,
              left: "50%",
              top: "50%",
              borderLeft: `${size / 2}px solid transparent`,
              borderRight: `${size / 2}px solid transparent`,
              borderBottom: `${size * 0.7}px solid rgba(139, 92, 246, 0.06)`,
              transform: `translate(-50%, -50%) rotateY(${angle}deg) rotateX(30deg)`,
              transformStyle: "preserve-3d",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── CSS-Only Floating Gradient Orb ─── */
function GlowOrb({ size = 200, color = "rgba(99, 102, 241, 0.15)", delay = 0, className = "" }: {
  size?: number; color?: string; delay?: number; className?: string;
}) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: "blur(30px)",
        animation: `orb-drift 20s ease-in-out ${delay}s infinite`,
        contain: "layout style paint",
      }}
    />
  );
}

/* ─── Floating Code Brackets ─── */
function FloatingBracket({ children, className = "", style = {} }: { children: string; className?: string; style?: React.CSSProperties }) {
  return (
    <span
      className={`absolute font-mono text-white/[0.05] select-none pointer-events-none ${className}`}
      style={{ animation: "bracket-float 8s ease-in-out infinite", ...style }}
    >
      {children}
    </span>
  );
}

/* ─── Decorative Grid Dots ─── */
function GridDots({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        {Array.from({ length: 36 }).map((_, i) => {
          const row = Math.floor(i / 6);
          const col = i % 6;
          return (
            <circle
              key={i}
              cx={col * 20 + 10}
              cy={row * 20 + 10}
              r="1.5"
              fill="rgba(99, 102, 241, 0.15)"
              style={{
                animation: `dot-pulse 3s ease-in-out ${(row + col) * 0.2}s infinite`,
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}

/* ─── Aurora Background (CSS-only, near-zero CPU cost) ─── */
export function AuroraBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true" style={{ contain: "strict" }}>
      {/* Layer 1 — Vibrant Fuchsia/Purple sweep */}
      <div
        className="absolute"
        style={{
          top: "-30%",
          left: "-20%",
          width: "140%",
          height: "100%",
          background: "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(217, 70, 239, 0.08) 0%, transparent 50%)",
          animation: "aurora-1 18s ease-in-out infinite alternate",
        }}
      />
      {/* Layer 2 — Electric Cyan accent */}
      <div
        className="absolute"
        style={{
          top: "-20%",
          right: "-20%",
          width: "100%",
          height: "80%",
          background: "radial-gradient(ellipse 60% 40% at 70% 30%, rgba(6, 182, 212, 0.06) 0%, transparent 50%)",
          animation: "aurora-2 22s ease-in-out infinite alternate-reverse",
        }}
      />
      {/* Layer 3 — Deep Indigo undertone */}
      <div
        className="absolute"
        style={{
          bottom: "-20%",
          left: "10%",
          width: "80%",
          height: "60%",
          background: "radial-gradient(ellipse 70% 50% at 40% 80%, rgba(99, 102, 241, 0.05) 0%, transparent 50%)",
          animation: "aurora-3 25s ease-in-out infinite alternate",
        }}
      />
    </div>
  );
}

/* ─── Main Export: Floating 3D Shapes Layer ─── */
export function FloatingShapes() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ contain: "strict" }}>
      {/* Gradient orbs — CSS-only with contain for isolation */}
      <GlowOrb size={300} color="rgba(99, 102, 241, 0.06)" delay={0} className="top-[10%] -left-[5%]" />
      <GlowOrb size={250} color="rgba(139, 92, 246, 0.04)" delay={5} className="top-[60%] right-[-5%]" />
      <GlowOrb size={200} color="rgba(99, 102, 241, 0.03)" delay={10} className="bottom-[10%] left-[30%]" />
    </div>
  );
}

/* ─── Section-Level Decorations ─── */
export function HeroDecorations() {
  return (
    <>
      {/* 3D Cube - top right */}
      <div className="absolute top-[15%] right-[8%] hidden lg:block" style={{ animation: "float 6s ease-in-out infinite" }}>
        <WireframeCube size={50} />
      </div>

      {/* Octahedron - bottom left */}
      <div className="absolute bottom-[20%] left-[5%] hidden lg:block" style={{ animation: "float-slow 8s ease-in-out infinite" }}>
        <WireframeOctahedron size={40} />
      </div>

      {/* Code brackets */}
      <FloatingBracket className="text-6xl top-[25%] left-[12%] hidden lg:block">{"{"}</FloatingBracket>
      <FloatingBracket className="text-6xl bottom-[30%] right-[10%] hidden lg:block" >{"}"}</FloatingBracket>
      <FloatingBracket className="text-4xl top-[60%] left-[8%] hidden lg:block" style={{ animationDelay: "2s" } as React.CSSProperties}>{"</>"}</FloatingBracket>

      {/* Grid dots */}
      <GridDots className="top-[20%] right-[15%] opacity-40 hidden lg:block" />
      <GridDots className="bottom-[25%] left-[10%] opacity-30 hidden lg:block" />
    </>
  );
}

export function SectionDecorations({ variant = "default" }: { variant?: "default" | "alt" }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ contain: "layout style paint" }}>
      {variant === "default" ? (
        <>
          <div className="absolute -top-20 -right-20 hidden lg:block" style={{ animation: "float 10s ease-in-out infinite" }}>
            <WireframeCube size={35} />
          </div>
          <GlowOrb size={150} color="rgba(99, 102, 241, 0.04)" className="bottom-0 -left-20" />
        </>
      ) : (
        <>
          <div className="absolute top-10 -left-10 hidden lg:block" style={{ animation: "float-slow 12s ease-in-out infinite" }}>
            <WireframeOctahedron size={30} />
          </div>
          <GlowOrb size={180} color="rgba(139, 92, 246, 0.04)" className="-top-20 -right-20" />
        </>
      )}
    </div>
  );
}

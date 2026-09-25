"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ARCHITECTURE_LAYERS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionDecorations } from "@/components/ui/floating-shapes";

export function Architecture() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <section className="relative py-32 md:py-44 overflow-hidden">
      <SectionDecorations />
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading 
          eyebrow="Architecture" 
          title="How I build." 
          subtitle="The layers of a full-stack application, from user to deployment." 
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center mt-12">
          
          {/* Left: 3D Isometric Visualization */}
          <div 
            ref={ref} 
            className="relative h-[500px] flex items-center justify-center pointer-events-none"
            style={{ perspective: "1200px" }}
          >
            <div className="relative w-full max-w-[320px] h-[400px]" style={{ transformStyle: "preserve-3d" }}>
              {ARCHITECTURE_LAYERS.map((layer, i) => {
                const isActive = activeLayer === i;
                const offset = i * 60;
                
                return (
                  <motion.div
                    key={layer.label}
                    initial={{ opacity: 0, y: 100, rotateX: 60, rotateZ: -45 }}
                    animate={isInView ? { 
                      opacity: isActive ? 1 : 0.6, 
                      y: isActive ? offset - 20 : offset,
                      scale: isActive ? 1.05 : 1,
                      rotateX: 60, 
                      rotateZ: -45
                    } : {}}
                    transition={{ 
                      duration: 0.6, 
                      delay: isInView ? i * 0.15 : 0, 
                      type: "spring", 
                      stiffness: 100, 
                      damping: 15 
                    }}
                    className="absolute w-full aspect-square left-0 top-0 origin-center"
                    style={{ zIndex: ARCHITECTURE_LAYERS.length - i }}
                  >
                    <div 
                      className={`w-full h-full border ${isActive ? 'bg-indigo-500/20 border-indigo-400' : 'bg-white/5 border-white/10'} backdrop-blur-md rounded-2xl flex items-center justify-center transition-colors duration-500 shadow-2xl shadow-black/50`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/5 rounded-2xl" />
                      <span className={`text-2xl font-bold tracking-widest uppercase transform rotate-x-[60deg] rotate-z-[-45deg] ${isActive ? 'text-indigo-200' : 'text-zinc-600'}`}>
                        {layer.label}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Ambient glow behind stack */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10" />
          </div>

          {/* Right: Interactive List */}
          <div className="flex flex-col justify-center max-w-lg mx-auto lg:mx-0 w-full space-y-4">
            {ARCHITECTURE_LAYERS.map((layer, i) => {
              const isActive = activeLayer === i;
              
              return (
                <div
                  key={layer.label}
                  onMouseEnter={() => setActiveLayer(i)}
                  onMouseLeave={() => setActiveLayer(null)}
                  className={`relative p-5 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                    isActive 
                      ? "border-indigo-500/30 bg-indigo-500/5 shadow-[0_0_20px_rgba(99,102,241,0.05)]" 
                      : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]"
                  }`}
                  data-cursor="SELECT"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-xs font-mono text-zinc-500 w-6">0{i + 1}</span>
                    <h3 className={`font-semibold text-sm tracking-wide transition-colors ${isActive ? "text-indigo-300" : "text-white"}`}>
                      {layer.label}
                    </h3>
                  </div>
                  
                  <p className={`text-xs leading-relaxed transition-colors ${isActive ? "text-zinc-300" : "text-zinc-500"}`}>
                    {layer.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {layer.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors ${
                          isActive 
                            ? "bg-indigo-500/10 text-indigo-300 border-indigo-500/20" 
                            : "bg-white/[0.04] text-zinc-500 border-white/[0.06]"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

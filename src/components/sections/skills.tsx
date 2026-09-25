"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SKILL_CATEGORIES } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionDecorations } from "@/components/ui/floating-shapes";
import { TechSphere } from "@/components/ui/tech-sphere";
import { Marquee } from "@/components/ui/marquee";

const categoryIcons: Record<string, string> = {
  "WEB & APIs": "⟨/⟩",
  "DATABASES": "⊡",
  "AUTH & SECURITY": "⊕",
  "PROGRAMMING": "λ",
  "TOOLS & DEPLOYMENT": "⚙",
};

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="relative py-32 md:py-44">
      <SectionDecorations variant="alt" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading eyebrow="Skills" title="Developer stack." subtitle="Technologies and tools I use to build products." />

        <div className="grid lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <TechSphere size={320} />
          </div>
          
          <div ref={ref} className="lg:col-span-8 grid md:grid-cols-2 gap-6">
            {SKILL_CATEGORIES.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:bg-white/[0.04] hover:border-indigo-500/30 hover:shadow-[0_0_30px_rgba(99,102,241,0.05)] transition-all duration-300 group relative overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-violet-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10">
                {/* Category icon + title */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-lg text-indigo-400 font-mono drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]">{categoryIcons[category.title] || "◆"}</span>
                  <h3 className="text-xs tracking-[0.2em] uppercase text-indigo-400 font-medium group-hover:text-indigo-300 transition-colors">{category.title}</h3>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIdx) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: catIdx * 0.1 + skillIdx * 0.04 + 0.2 }}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-zinc-300 font-medium transition-all duration-300 cursor-default hover:scale-105 hover:bg-indigo-500/10 hover:border-indigo-500/30 hover:text-indigo-200"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        </div>
      </div>

      <Marquee />

      {/* Section divider */}
      <div className="section-divider mt-32 max-w-4xl mx-auto" />
    </section>
  );
}

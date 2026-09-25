"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { EXPERIENCES } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/section-heading";
import { Briefcase } from "lucide-react";
import { SectionDecorations } from "@/components/ui/floating-shapes";

export function Experience() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start center", "end center"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative py-32 md:py-44">
      <SectionDecorations />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading eyebrow="Experience" title="Professional journey." />

        <div ref={containerRef} className="relative max-w-3xl">
          {/* Timeline line background */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-white/[0.06]" />

          {/* Animated line */}
          <motion.div
            className="absolute left-[19px] top-0 w-px bg-gradient-to-b from-indigo-500 via-violet-500 to-transparent origin-top"
            style={{ height: lineHeight }}
          />

          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="relative pl-12 pb-12 last:pb-0 group/timeline"
            >
              {/* Dot */}
              <div className="absolute left-[12px] top-1 w-[15px] h-[15px] rounded-full border-2 border-indigo-500 bg-black z-10 transition-colors duration-500 group-hover/timeline:border-violet-400 group-hover/timeline:shadow-[0_0_12px_rgba(139,92,246,0.6)]">
                <div className="absolute inset-[3px] rounded-full bg-indigo-500 transition-colors duration-500 group-hover/timeline:bg-violet-400" />
              </div>

              <div className="group rounded-2xl p-6 -ml-3 border border-transparent hover:border-white/[0.08] hover:bg-white/[0.02] hover:shadow-[0_0_30px_rgba(99,102,241,0.03)] transition-all duration-300 relative overflow-hidden">
                {/* Subtle hover glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-100 transition-colors">{exp.title}</h3>
                  <div className="flex items-center gap-2">
                    <Briefcase size={14} className="text-indigo-400" />
                    <span className="text-xs text-zinc-400 font-medium px-2 py-1 rounded-full bg-white/5 border border-white/10">{exp.period}</span>
                  </div>
                </div>
                
                <p className="text-sm text-indigo-400 mb-5 font-medium">{exp.company}</p>
                
                <ul className="space-y-3">
                  {exp.details.map((detail, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: i * 0.2 + j * 0.1 + 0.3 }}
                      className="text-sm text-zinc-400 leading-relaxed flex gap-3 group/item"
                    >
                      <span className="text-indigo-500 mt-1.5 shrink-0 opacity-50 group-hover/item:opacity-100 group-hover/item:text-violet-400 transition-colors">&#8226;</span>
                      <span className="group-hover/item:text-zinc-300 transition-colors">{detail}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section divider */}
      <div className="section-divider mt-32 max-w-4xl mx-auto" />
    </section>
  );
}

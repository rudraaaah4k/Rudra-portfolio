"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EDUCATION } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/section-heading";
import { GraduationCap } from "lucide-react";

export function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading eyebrow="Education" title="Academic background." />

        <div ref={ref} className="max-w-2xl space-y-6">
          {EDUCATION.map((edu, i) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ x: 4, borderColor: "rgba(99,102,241,0.15)" }}
              className="flex gap-4 items-start p-4 -ml-4 rounded-xl border border-transparent transition-all duration-300 hover:bg-white/[0.02]"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
                <GraduationCap size={16} className="text-indigo-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">{edu.institution}</h3>
                <p className="text-zinc-400 text-sm">{edu.degree}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-zinc-500">{edu.period}</span>
                  <span className="text-xs text-indigo-400 font-medium">{edu.grade}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section divider */}
      <div className="section-divider mt-24 max-w-4xl mx-auto" />
    </section>
  );
}

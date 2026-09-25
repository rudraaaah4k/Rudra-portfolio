"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CERTIFICATIONS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/section-heading";
import { Award, ExternalLink } from "lucide-react";

export function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-32 md:py-44">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading eyebrow="Certifications" title="Verified knowledge." />

        <div ref={ref} className="grid md:grid-cols-3 gap-4">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, borderColor: "rgba(99,102,241,0.2)" }}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 group cursor-default relative overflow-hidden"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
                  <Award size={18} className="text-indigo-400" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2 leading-snug">{cert.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500">{cert.issuer}</span>
                  <span className="text-xs text-zinc-600">{cert.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

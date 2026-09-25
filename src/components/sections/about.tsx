"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PERSONAL, METRICS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { AboutPhoto } from "@/components/ui/hero-photo";
import { SectionDecorations } from "@/components/ui/floating-shapes";

const techFlowSteps = [
  { label: "Frontend", desc: "React, TypeScript, Tailwind CSS", icon: "layout" },
  { label: "API Layer", desc: "REST APIs, Express.js", icon: "arrow-right-left" },
  { label: "Authentication", desc: "JWT, RBAC, Bcrypt", icon: "shield" },
  { label: "Database", desc: "PostgreSQL, MongoDB, Prisma", icon: "database" },
  { label: "Deployment", desc: "Docker, Vercel, Render", icon: "cloud" },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32 md:py-44">
      <SectionDecorations variant="alt" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="About"
          title="Turning complex problems into simple experiences."
        />

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          {/* Left — Photo */}
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <AboutPhoto />
          </div>

          {/* Center — Text */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-zinc-400 text-lg leading-relaxed mb-6">
              {PERSONAL.summary}
            </p>
            <p className="text-zinc-500 text-base leading-relaxed">
              I work across the full stack — frontend interfaces, backend APIs, databases,
              authentication systems, and deployment pipelines — to deliver products that
              are both well-engineered and user-friendly.
            </p>

            {/* Quick stats inline */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {METRICS.map((metric) => (
                <div key={metric.label} className="text-center lg:text-left">
                  <p className="text-2xl md:text-3xl font-bold text-white">
                    <AnimatedCounter value={metric.value} decimals={metric.decimals} suffix={metric.suffix} />
                  </p>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">{metric.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Tech flow */}
          <div ref={ref} className="lg:col-span-4 space-y-0">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="text-xs tracking-[0.2em] uppercase text-indigo-400 font-medium mb-6"
            >
              How I Work
            </motion.p>

            {techFlowSteps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <div className="flex items-center gap-4 py-4 group">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/[0.08] flex items-center justify-center text-indigo-400 text-xs font-mono shrink-0 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{step.label}</p>
                    <p className="text-zinc-500 text-xs">{step.desc}</p>
                  </div>
                </div>
                {i < techFlowSteps.length - 1 && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : {}}
                    transition={{ duration: 0.3, delay: i * 0.15 + 0.2 }}
                    className="ml-5 w-px h-6 bg-gradient-to-b from-indigo-500/30 to-transparent origin-top"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Section divider */}
      <div className="section-divider mt-32 max-w-4xl mx-auto" />
    </section>
  );
}

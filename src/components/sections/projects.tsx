"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PROJECTS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/section-heading";
import { TiltCard } from "@/components/ui/tilt-card";
import { ArrowUpRight, ExternalLink, Layers, Zap } from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import { ProjectDetail } from "./project-detail";
import { SectionDecorations } from "@/components/ui/floating-shapes";
import type { Project } from "@/lib/constants";

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <TiltCard tiltAmount={4} className="rounded-2xl">
        <div
          onClick={onOpen}
          data-cursor="VIEW"
          className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden cursor-pointer transition-all duration-500 hover:border-indigo-500/20 hover:bg-white/[0.04] hover:shadow-[0_0_40px_rgba(99,102,241,0.05)]"
        >
          {/* Project preview area */}
          <div className="relative h-[300px] md:h-[400px] overflow-hidden" style={{ background: `linear-gradient(135deg, ${project.color}08, ${project.color}03)` }}>
            {/* Ambient glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{ background: `radial-gradient(circle, ${project.color}15, transparent 70%)` }}
            />

            {/* Mock dashboard UI */}
            <div className="absolute inset-6 md:inset-10 rounded-xl border border-white/[0.06] bg-black/40 overflow-hidden group-hover:scale-[1.02] transition-transform duration-700">
              {/* Dashboard header */}
              <div className="h-10 border-b border-white/[0.06] flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: `${project.color}40` }} />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                </div>
                <div className="ml-4 h-4 w-32 rounded bg-white/5" />
                <div className="ml-auto flex gap-2">
                  <div className="h-4 w-12 rounded bg-white/5" />
                  <div className="h-4 w-8 rounded bg-white/5" />
                </div>
              </div>
              {/* Dashboard content */}
              <div className="p-4 grid grid-cols-3 gap-3">
                <div className="col-span-2 h-24 rounded-lg bg-white/[0.03] border border-white/[0.04] group-hover:border-white/[0.08] transition-colors" />
                <div className="h-24 rounded-lg bg-white/[0.03] border border-white/[0.04]" />
                <div className="h-16 rounded-lg bg-white/[0.03] border border-white/[0.04]" />
                <div className="h-16 rounded-lg bg-white/[0.03] border border-white/[0.04]" />
                <div className="h-16 rounded-lg bg-white/[0.03] border border-white/[0.04]" />
              </div>
              {/* Flow visualization */}
              <div className="px-4 flex items-center gap-2 overflow-hidden">
                {project.architectureFlow.slice(0, 4).map((step, i) => (
                  <div key={step} className="flex items-center gap-2 shrink-0">
                    <div className="px-2.5 py-1 rounded-md text-[10px] font-mono text-white/40 bg-white/[0.03] border border-white/[0.06]">{step}</div>
                    {i < 3 && <div className="text-white/10 text-xs">&rarr;</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Project info */}
          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase font-medium flex items-center gap-1.5" style={{ color: project.color }}>
                  <Zap size={10} />
                  {project.label}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mt-1">{project.title}</h3>
              </div>
              <span className="text-5xl font-bold text-white/[0.04] tabular-nums">{project.number}</span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-lg">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.slice(0, 6).map((t) => (
                <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.04] text-zinc-400 border border-white/[0.06] hover:border-indigo-500/20 hover:text-indigo-300 transition-colors">{t}</span>
              ))}
              {project.tech.length > 6 && <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.04] text-zinc-500">+{project.tech.length - 6}</span>}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-white group-hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                <Layers size={14} />
                View Case Study <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
              <a href={project.links.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-zinc-500 hover:text-white transition-colors"><GithubIcon size={16} /></a>
              <a href={project.links.live} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-zinc-500 hover:text-white transition-colors"><ExternalLink size={16} /></a>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <section id="work" className="relative py-32 md:py-44">
        <SectionDecorations />
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow="Selected Work"
            title="Real products. Real engineering."
            subtitle="Projects built end-to-end with modern full-stack technologies."
          />
          <div className="grid gap-8 md:gap-12">
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} onOpen={() => setSelectedProject(project)} />
            ))}
          </div>
        </div>

        {/* Section divider */}
        <div className="section-divider mt-32 max-w-4xl mx-auto" />
      </section>
      <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}

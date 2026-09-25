"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/lib/constants";
import { X, ExternalLink, Shield, Server, Database, Cloud, Code, Layers } from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";

const sectionIcons: Record<string, React.ReactNode> = {
  problem: <Code size={18} />,
  solution: <Layers size={18} />,
  architecture: <Server size={18} />,
  security: <Shield size={18} />,
  deployment: <Cloud size={18} />,
  challenges: <Database size={18} />,
};

export function ProjectDetail({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
      document.addEventListener("keydown", handler);
      return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", handler); };
    }
    return () => { document.body.style.overflow = ""; };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-xl overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-4xl mx-auto px-6 py-20 min-h-screen"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="fixed top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-xs tracking-[0.2em] uppercase text-indigo-400 font-medium">{project.label}</span>
              <h2 className="text-4xl md:text-6xl font-bold text-white mt-2 mb-4">{project.title}</h2>
              <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">{project.longDescription}</p>
            </motion.div>

            {/* Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex gap-3 mt-8"
            >
              <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-sm text-white hover:bg-white/5 transition-colors">
                <GithubIcon size={14} /> GitHub
              </a>
              <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-500 text-sm text-white hover:bg-indigo-400 transition-colors">
                <ExternalLink size={14} /> Live Demo
              </a>
            </motion.div>

            {/* Architecture Flow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-16"
            >
              <h3 className="text-xs tracking-[0.2em] uppercase text-zinc-500 font-medium mb-6">Architecture Flow</h3>
              <div className="flex flex-wrap items-center gap-3">
                {project.architectureFlow.map((step, i) => (
                  <div key={step} className="flex items-center gap-3">
                    <div className="px-4 py-2 rounded-lg border border-white/[0.08] bg-white/[0.03] text-sm text-zinc-300 font-mono">
                      {step}
                    </div>
                    {i < project.architectureFlow.length - 1 && (
                      <span className="text-indigo-400/50">&rarr;</span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-16"
            >
              <h3 className="text-xs tracking-[0.2em] uppercase text-zinc-500 font-medium mb-6">Key Features</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {project.features.map((f) => (
                  <div key={f} className="px-4 py-3 rounded-lg border border-white/[0.06] bg-white/[0.02] text-sm text-zinc-300">
                    {f}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Detail sections */}
            {(["problem", "solution", "architecture", "security", "deployment", "challenges"] as const).map((key, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.08 }}
                className="mt-12"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-indigo-400">{sectionIcons[key]}</span>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider">{key}</h3>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed pl-[30px]">{project[key]}</p>
              </motion.div>
            ))}

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="mt-16"
            >
              <h3 className="text-xs tracking-[0.2em] uppercase text-zinc-500 font-medium mb-6">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-zinc-300 font-medium">{t}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

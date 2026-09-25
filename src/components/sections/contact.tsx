"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PERSONAL, LINKS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/section-heading";
import { Mail, ArrowUpRight, MapPin, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="relative py-32 md:py-44">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-indigo-500/[0.04] via-transparent to-transparent rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="Contact"
          title="Let's work together."
          subtitle="Have a project in mind? Let's build something great."
        />

        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
              I&apos;m currently open to new opportunities and collaborations. Whether you
              have a project idea, a question, or just want to connect — feel free
              to reach out.
            </p>

            <MagneticButton
              variant="secondary"
              href={LINKS.email}
              className="group !p-2 !pr-6 !rounded-2xl border-white/[0.08] bg-white/[0.02] hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)] flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                <Mail size={20} className="text-indigo-400" />
              </div>
              <div className="text-left">
                <p className="text-white font-medium text-sm">{PERSONAL.email}</p>
                <p className="text-zinc-500 text-xs">Send me an email</p>
              </div>
              <ArrowUpRight
                size={16}
                className="text-zinc-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all ml-4"
              />
            </MagneticButton>

            <div className="flex items-center gap-2 mt-6 text-zinc-500">
              <MapPin size={14} />
              <span className="text-xs">{PERSONAL.locations.join(" · ")}</span>
            </div>
          </motion.div>

          {/* Right — Social links */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {[
              { label: "GitHub", href: LINKS.github, icon: <GithubIcon size={18} />, desc: "View my repositories" },
              { label: "LinkedIn", href: LINKS.linkedin, icon: <LinkedinIcon size={18} />, desc: "Connect with me" },
            ].map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                whileHover={{ x: 4, borderColor: "rgba(99,102,241,0.2)" }}
                className="group flex items-center gap-4 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300 cursor-pointer hover:bg-white/[0.04] hover:shadow-[0_0_20px_rgba(99,102,241,0.05)]"
                data-cursor="OPEN"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-400 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-all">
                  {link.icon}
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium text-sm">{link.label}</p>
                  <p className="text-zinc-500 text-xs">{link.desc}</p>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-zinc-600 group-hover:text-indigo-400 transition-colors"
                />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-32 border-t border-white/[0.06] pt-8"
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600 flex items-center gap-1">
            © {new Date().getFullYear()} {PERSONAL.name}. Built with
            <Heart size={10} className="text-indigo-500 fill-indigo-500" />
            using Next.js & Framer Motion.
          </p>
          <div className="flex items-center gap-4">
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-zinc-400 transition-colors">
              <GithubIcon size={14} />
            </a>
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-zinc-400 transition-colors">
              <LinkedinIcon size={14} />
            </a>
            <a href={`mailto:${PERSONAL.email}`} className="text-zinc-600 hover:text-zinc-400 transition-colors">
              <Mail size={14} />
            </a>
          </div>
        </div>
      </motion.footer>
    </section>
  );
}

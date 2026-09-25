"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS, PERSONAL } from "@/lib/constants";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection("#" + entry.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    NAV_ITEMS.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/60 border-b border-white/[0.06]"
            : ""
        }`}
        style={scrolled ? { backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" } : {}}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo with gradient accent */}
          <button
            onClick={() => scrollTo("#hero")}
            className="text-white font-bold text-lg tracking-tight group flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-500 group-hover:bg-indigo-400 transition-colors group-hover:shadow-[0_0_12px_rgba(99,102,241,0.6)]" />
            {PERSONAL.name.toUpperCase()}
          </button>

          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => scrollTo(href)}
                className={`relative px-4 py-2 text-sm transition-colors duration-200 ${activeSection === href ? "text-white" : "text-zinc-500 hover:text-zinc-300"}`}
              >
                {label}
                {activeSection === href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <button
              onClick={() => scrollTo("#contact")}
              className="text-sm px-5 py-2.5 rounded-full bg-white text-black font-medium hover:bg-zinc-200 transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            >
              Let&apos;s Talk
            </button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center gap-8"
          >
            {NAV_ITEMS.map(({ label, href }, i) => (
              <motion.button
                key={href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                onClick={() => scrollTo(href)}
                className="text-3xl font-semibold text-white hover:text-indigo-400 transition-colors"
              >
                {label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={() => scrollTo("#contact")}
              className="mt-4 px-8 py-3 rounded-full bg-indigo-500 text-white font-medium"
            >
              Let&apos;s Talk
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

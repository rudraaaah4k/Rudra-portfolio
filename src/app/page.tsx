import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Architecture } from "@/components/sections/architecture";
import { About } from "@/components/sections/about";
import { Certifications } from "@/components/sections/certifications";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";
import { CustomCursor } from "@/components/cursor/custom-cursor";
import { FloatingShapes, AuroraBackground } from "@/components/ui/floating-shapes";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <AuroraBackground />
      <FloatingShapes />
      {/* Global noise overlay */}
      <div className="noise-overlay" />
      <Navbar />
      <main className="relative">
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <Architecture />
        <About />
        <Certifications />
        <Education />
        <Contact />
      </main>
    </>
  );
}

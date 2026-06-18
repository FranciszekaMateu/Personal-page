"use client";

import { motion } from "framer-motion";
import { ExternalLink, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import React, { useRef, useState } from "react";

const projects = [
  {
    name: "Eikos Labs",
    url: "https://eikoslabs.com",
    descKey: "projects.eikos.description",
    tech: ["Next.js", "TypeScript", "Node.js", "Tailwind CSS"],
    ascii: [
      "   (o)---(o)  ",
      "    | \\ / |   ",
      "    |  x  |   ",
      "    | / \\ |   ",
      "   (o)---(o)  "
    ]
  },
  {
    name: "Menuses QR",
    url: "https://menusesqr.com",
    descKey: "projects.menusesqr.description",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    ascii: [
      "  ■ ■ ■ ▢ ■ ■ ■ ",
      "  ■ ▢ ■ ▢ ■ ▢ ■ ",
      "  ■ ■ ■ ▢ ■ ■ ■ ",
      "  ▢ ▢ ▢ ▢ ▢ ▢ ▢ ",
      "  ■ ■ ▢ ▢ ■ ■ ■ "
    ]
  },
  {
    name: "La Penca",
    url: "https://penca.eikoslabs.com",
    descKey: "projects.penca.description",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "WebSockets"],
    ascii: [
      "  [Team A]──┐   ",
      "            ├───",
      "  [Team B]──┘   ",
      "            |   ",
      "  [Winner]◀─┘   "
    ]
  },
  {
    name: "Wifi Gomera",
    url: "https://www.wifigomera.com",
    descKey: "projects.wifigomera.description",
    tech: ["CSS", "JavaScript", "HTML", "SEO"],
    ascii: [
      "      ((●))     ",
      "     (( | ))    ",
      "    ((  |  ))   ",
      "   ((   |   ))  ",
      "  ==============="
    ]
  }
];

// 3D Card Tilt wrapper component
function TiltCard({ children, href }: { children: React.ReactNode; href: string }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [transformStyle, setTransformStyle] = useState("");

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Relative mouse percentage inside the card (-0.5 to 0.5)
    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;

    // Calculate rotation angles (max 15 degrees)
    const rotateY = px * 25;
    const rotateX = -py * 25;

    setTransformStyle(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle("rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };

  return (
    <a
      ref={cardRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transformStyle: "preserve-3d",
        transition: "transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)",
      }}
      className="group block cyber-card p-6 md:p-8 relative overflow-hidden card-container-3d"
    >
      {children}
    </a>
  );
}

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projects-section" className="py-12 sm:py-16 md:py-20 space-y-8 sm:space-y-10 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-end justify-between flex-wrap gap-4"
      >
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-foreground/50 mb-2">
            <span className="text-accent font-bold">$</span> {t("section.projects")}
          </p>
          <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-foreground">
            {t("section.projects.subtitle")}
          </h2>
        </div>
        
        <div className="font-mono text-xs uppercase tracking-widest text-primary flex items-center gap-1.5 animate-pulse">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span>3D TILT_SYS ACTIVE</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <TiltCard href={project.url}>
              <div 
                className="flex flex-col h-full space-y-4"
                style={{ transform: "translateZ(30px)" }} // Push children out in 3D space
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-background border-[2px] border-foreground group-hover:border-primary group-hover:bg-primary transition-all duration-150">
                      <Globe className="w-5 h-5 text-foreground/75 group-hover:text-background transition-colors duration-150" />
                    </div>
                    <h3 className="font-sans font-bold text-lg text-foreground uppercase tracking-tight">
                      {project.name}
                    </h3>
                  </div>
                  <ExternalLink className="w-4 h-4 text-foreground/40 group-hover:text-primary transition-colors duration-150" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center flex-grow">
                  <div className="sm:col-span-8">
                    <p className="font-sans text-sm text-foreground/75 leading-relaxed">
                      {t(project.descKey)}
                    </p>
                  </div>
                  {project.ascii && (
                    <div className="hidden sm:flex sm:col-span-4 justify-center items-center">
                      <pre className="font-mono text-[8px] leading-tight text-primary/40 group-hover:text-primary transition-colors duration-150 select-none">
                        {project.ascii.join("\n")}
                      </pre>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-1.5 pt-4 border-t-[2px] border-foreground/20">
                  {project.tech.map((techItem) => (
                    <span
                      key={techItem}
                      className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 border border-foreground bg-background text-foreground/80 group-hover:border-primary group-hover:text-primary transition-colors duration-150"
                    >
                      [{techItem}]
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}

        {/* GitHub CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <TiltCard href="https://github.com/FranciszekaMateu">
            <div 
              className="flex flex-col justify-center items-center text-center space-y-4 min-h-[220px]"
              style={{ transform: "translateZ(30px)" }}
            >
              <div className="p-3 bg-background border-[2px] border-foreground group-hover:bg-primary group-hover:border-primary transition-all duration-150">
                <ExternalLink className="w-5 h-5 text-foreground/80 group-hover:text-background" />
              </div>
              <div>
                <h3 className="font-mono font-bold text-base text-foreground uppercase mb-1 group-hover:text-primary transition-colors">
                  {t("projects.githubCTA.title")}
                </h3>
                <p className="font-mono text-xs text-foreground/60 uppercase">
                  {t("projects.githubCTA.description")}
                </p>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}

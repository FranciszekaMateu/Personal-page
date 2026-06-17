"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const expertiseKeys = [
  {
    titleKey: "expertise.frontend.title",
    descriptionKey: "expertise.frontend.description",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
  },
  {
    titleKey: "expertise.backend.title",
    descriptionKey: "expertise.backend.description",
    skills: ["Node.js", "Express", "NestJS", "PostgreSQL", "MongoDB"]
  },
  {
    titleKey: "expertise.practices.title",
    descriptionKey: "expertise.practices.description",
    skills: ["Clean Architecture", "TDD", "CI/CD", "Docker", "Git", "Agile/Scrum"]
  }
];

export default function Expertise() {
  const { t } = useLanguage();

  return (
    <section className="py-12 sm:py-16 md:py-20 space-y-8 sm:space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-foreground/50 mb-2">
          <span className="text-accent font-bold">$</span> {t("section.expertise")}
        </p>
        <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-foreground">
          {t("section.expertise.subtitle")}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
        {expertiseKeys.map((area, index) => (
          <motion.div
            key={area.titleKey}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.3, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3 sm:space-y-4 border-t-[2.5px] border-foreground pt-4"
          >
            <h3 className="font-sans text-lg sm:text-xl font-bold uppercase text-foreground">
              {t(area.titleKey)}
            </h3>

            <p className="font-sans text-sm sm:text-base text-foreground/60 leading-relaxed">
              {t(area.descriptionKey)}
            </p>

            <div className="flex flex-wrap gap-x-2 sm:gap-x-3 gap-y-1.5 sm:gap-y-2 pt-2">
              {area.skills.map((skill, i) => (
                <span key={skill} className="font-mono text-xs text-foreground/70">
                  {skill}{i < area.skills.length - 1 && <span className="text-foreground/25 ml-2 sm:ml-3">·</span>}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Calculator, Dices, Cpu, Atom, BookOpen, Music } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const interests = [
  { icon: Calculator, labelKey: "curiosity.math", ascii: "[ Math.dx/dy ]" },
  { icon: Dices, labelKey: "curiosity.probability", ascii: "[ Prob.P(A|B) ]" },
  { icon: Cpu, labelKey: "curiosity.cs", ascii: "[ Comp.sys() ]" },
  { icon: Atom, labelKey: "curiosity.science", ascii: "[ Science.exe ]" },
  { icon: BookOpen, labelKey: "curiosity.philosophy", ascii: "[ Philo.cog() ]" },
  { icon: Music, labelKey: "curiosity.music", ascii: "[ Music.wav ]" }
];

export default function Generalist() {
  const { t } = useLanguage();

  return (
    <section className="py-12 sm:py-16 md:py-20 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.4 }}
        className="cyber-card p-6 md:p-8 space-y-6 border-2 border-foreground shadow-brutal"
      >
        {/* Header */}
        <div className="flex items-end justify-between flex-wrap gap-4 border-b-2 border-foreground/20 pb-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-foreground/50 mb-1">
              <span className="text-accent font-bold">$</span> 003 / CURIOSITY_MODULE
            </p>
            <h2 className="font-sans text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-foreground">
              {t("curiosity.title")}
            </h2>
          </div>
          <div className="font-mono text-xs text-accent-secondary uppercase">
            // STATUS: CURIOUS_MIND_ACTIVE
          </div>
        </div>

        {/* Content grid */}
        <div className="grid md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-6 space-y-4">
            <p className="font-sans text-sm sm:text-base text-foreground/85 leading-relaxed">
              {t("curiosity.body.line1")}
            </p>
            <p className="font-sans text-sm sm:text-base text-foreground/75 leading-relaxed">
              {t("curiosity.body.line2")}
            </p>
          </div>

          {/* Interactive ASCII pills grid */}
          <div className="md:col-span-6 grid grid-cols-2 gap-3 pt-2 md:pt-0">
            {interests.map((interest, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                className="group flex flex-col justify-between p-3 border border-foreground/30 bg-background hover:bg-primary hover:border-foreground transition-all duration-150 relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-3 text-foreground/60 group-hover:text-background">
                  <interest.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-mono text-[8px] uppercase tracking-widest opacity-60">
                    node_{i+1}
                  </span>
                </div>
                <div>
                  <p className="font-sans text-xs font-bold text-foreground group-hover:text-background uppercase mb-1">
                    {t(interest.labelKey)}
                  </p>
                  <p className="font-mono text-[9px] text-accent group-hover:text-background font-semibold">
                    {interest.ascii}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

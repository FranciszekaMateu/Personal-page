"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const journalKeys = [
  { id: "004", date: "2021 – 2026", titleKey: "journal.004.title", reflectionKey: "journal.004.reflection" },
  { id: "003", date: "2019 – Present", titleKey: "journal.003.title", reflectionKey: "journal.003.reflection" },
  { id: "002", date: "2022 – 2025", titleKey: "journal.002.title", reflectionKey: "journal.002.reflection" },
  { id: "001", date: "Present", titleKey: "journal.001.title", reflectionKey: "journal.001.reflection" },
];

export default function Journal() {
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
          <span className="text-accent font-bold">$</span>{" "}
          {t("section.journal")}
        </p>
        <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-foreground">
          {t("section.journal.subtitle")}
        </h2>
      </motion.div>

      <div className="space-y-0">
        {journalKeys.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.3, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="editorial-row group flex flex-col md:flex-row md:items-baseline justify-between gap-3 sm:gap-4 md:gap-6 py-5 sm:py-6 md:py-7">
              <div className="flex-1 space-y-1.5 sm:space-y-2 min-w-0">
                <div className="flex items-baseline gap-2 sm:gap-3 md:gap-4 flex-wrap">
                  <span className="font-mono text-xs text-foreground/40 uppercase tabular-nums">
                    {t("journal.log")} {entry.id}
                  </span>
                  <span className="font-mono text-xs text-foreground/40 tabular-nums">
                    {entry.date}
                  </span>
                </div>
                <h3 className="font-sans text-xl sm:text-2xl md:text-3xl font-bold text-foreground row-title transition-all duration-150 leading-tight">
                  {t(entry.titleKey)}
                </h3>
                <p className="font-sans text-sm sm:text-base text-foreground/60 leading-relaxed max-w-2xl pt-1">
                  {t(entry.reflectionKey)}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

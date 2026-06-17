"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="py-12 mt-12 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pt-8 border-t-[3px] border-foreground"
      >
        <div className="space-y-3 max-w-md">
          <h3 className="font-sans text-2xl sm:text-3xl font-black uppercase tracking-tight text-foreground leading-none">
            {t("footer.title.line1")}{" "}
            <span className="gradient-text">{t("footer.title.line2")}</span>
          </h3>
          <a
            href="mailto:franciscomateoescobar1@gmail.com"
            className="group inline-flex items-center gap-2 font-mono text-xs text-foreground border-b-2 border-foreground hover:border-accent-secondary hover:text-accent-secondary transition-colors pb-0.5"
          >
            <Mail className="w-3.5 h-3.5 flex-shrink-0" />
            <span>franciscomateoescobar1@gmail.com</span>
          </a>
        </div>

        <div className="flex flex-col items-start md:items-end gap-3">
          <div className="flex items-center gap-4">
            {[
              { href: "https://github.com/FranciszekaMateu", label: "GitHub" },
              { href: "https://www.linkedin.com/in/franciscoesscobarr", label: "LinkedIn" }
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-foreground/70 hover:text-accent-secondary transition-colors"
              >
                {link.label}
                <ArrowUpRight className="w-3 h-3 text-foreground/40 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-foreground/40">
            <span>{t("signature.text")}</span>
            <span>·</span>
            <span>© {year} Francisco Escobar</span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}

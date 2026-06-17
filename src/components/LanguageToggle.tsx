"use client";

import { motion } from "framer-motion";
import { useLanguage, type Locale } from "@/contexts/LanguageContext";

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  const languages: { code: Locale; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "es", label: "ES" },
  ];

  return (
    <div className="relative flex items-center gap-1">
      {languages.map((lang, i) => {
        const isActive = locale === lang.code;
        return (
          <div key={lang.code} className="flex items-center">
            <button
              onClick={() => setLocale(lang.code)}
              className={`relative text-xs font-sans uppercase tracking-wider transition-colors duration-300 ${
                isActive ? "text-foreground" : "text-muted-foreground hover:text-secondary"
              }`}
            >
              {isActive ? (
                <motion.span
                  layoutId="language-underline"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-foreground"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              ) : null}
              <span className={isActive ? "font-medium" : ""}>{lang.label}</span>
            </button>
            {i < languages.length - 1 && (
              <span className="mx-1.5 md:mx-2 text-muted-foreground/40 text-xs">/</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navigation() {
  const { t } = useLanguage();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-40 bg-background border-b-[3px] border-foreground"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 h-14 sm:h-16 flex items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-2 md:gap-2.5 min-w-0"
        >
          <div className="w-12 h-8 rounded-none bg-accent text-white flex items-center justify-center font-mono text-[11px] font-bold group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] transition-transform duration-100 flex-shrink-0">
            [ FE ]
          </div>
          <span className="hidden md:block font-mono font-bold uppercase text-xs tracking-widest text-foreground truncate">
            &lt; FRANCISCO_ESCOBAR &gt;
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <LanguageToggle />
        </div>
      </div>
    </motion.nav>
  );
}

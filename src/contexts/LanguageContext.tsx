"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type Locale = "es" | "en";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Locale, Record<string, string>> = {
  en: {
    "nav.blog": "Blog",
    "nav.name": "Francisco Escobar",
    "hero.role": "Full Stack Engineer",
    "hero.title.line1": "BUILDING",
    "hero.title.line2": "THE",
    "hero.title.line3": "FUTURE",
    "hero.description": "Founder of Eikos Labs. Defying technology stagnation through vertical progress. I build high-leverage digital products that bring the future into reality.",
    "hero.contact": "Get in touch",
    "hero.readBlog": "Read the blog",
    "hero.github": "GitHub",
    "hero.linkedin": "LinkedIn",
    "section.journal": "001 / Journal",
    "section.journal.subtitle": "A chronicle of work and learning.",
    "section.projects": "002 / Rockets of Progress",
    "section.projects.subtitle": "Escaping horizontal copying. Building what didn't exist.",
    "section.writings": "003 / Writings",
    "section.writings.subtitle": "Recent thoughts and explorations.",
    "section.expertise": "004 / Expertise",
    "section.expertise.subtitle": "Tools, practices, and craft.",
    "section.generalist": "005 / Generalist",
    "generalist.title": "I refuse to be just one thing.",
    "generalist.body.line1": "I'm a generalist by conviction. I have a restless curiosity that refuses to stay inside a single discipline — and I've learned to treat that as an asset, not a flaw.",
    "generalist.body.line2": "Software is my craft, but the patterns I see in code, music, philosophy, and science are the same patterns. I follow what interests me, and I write about the connections I find.",
    "generalist.interestsLabel": "Some of what I think about",
    "journal.log": "LOG",
    "journal.001.title": "Building Eikos Labs",
    "journal.001.date": "Present",
    "journal.001.reflection": "The culmination of everything learned. Creating innovative, scalable software solutions from the ground up, pushing the boundaries of modern web engineering.",
    "journal.002.title": "Scaling at Levity",
    "journal.002.date": "2022 – 2025",
    "journal.002.reflection": "A masterclass in collaborative SCRUM development. Architected RESTful APIs with Node.js and MongoDB, and built maintainable UIs with React and Next.js.",
    "journal.003.title": "Freelance Journey",
    "journal.003.date": "2019 – Present",
    "journal.003.reflection": "Translating vague client visions into concrete, high-performance realities. From Three.js corporate sites to SEO-optimized sales funnels.",
    "journal.004.title": "The Foundation",
    "journal.004.date": "2021 – 2026",
    "journal.004.reflection": "Pursuing Computer Engineering at Universidad de la República. Building rigorous theoretical foundations while applying them to real-world scalable architecture.",
    "writings.fetched": "Fetched from API at",
    "writings.refresh": "Refresh",
    "writings.loading": "Loading...",
    "writings.viewAll": "View all writings",
    "writings.error": "Error",
    "writings.tryAgain": "Try again",
    "expertise.frontend.title": "Frontend Architecture",
    "expertise.frontend.description": "Crafting responsive, performant, and accessible user interfaces with modern frameworks.",
    "expertise.backend.title": "Backend & APIs",
    "expertise.backend.description": "Designing scalable, secure, and efficient server-side logic and RESTful architectures.",
    "expertise.practices.title": "Engineering Practices",
    "expertise.practices.description": "Commitment to code quality, maintainability, and robust development workflows.",
    "footer.title.line1": "Let's build",
    "footer.title.line2": "something meaningful.",
    "footer.copyright": "© {year} Francisco Escobar. Eikos Labs.",
    "blog.back": "Back to Home",
    "blog.allWritings": "All Writings",
    "blog.title.line1": "Latest",
    "blog.title.line2": "Articles",
    "blog.count": "Loaded from API: {count} article{plural} available",
    "blog.empty": "No posts available.",
    "blog.post.back": "Back to Blog",
    "blog.post.more": "Read more articles",
    "blog.post.writings": "Writings",
    "blog.post.read": "read",
    "blog.post.authorRole": "Full-Stack Engineer",
    "blog.post.writtenBy": "Written by",
    "blog.post.authorBio": "Founder of Eikos Labs. I write about software, ideas, and the connections between them.",
    "projects.title": "Selected Work",
    "projects.eikos.description": "My software startup focused on building innovative, scalable, and high-performance digital products and web applications.",
    "projects.menusesqr.description": "An interactive digital menu platform using dynamic QR codes for restaurants and local businesses, facilitating fast ordering and real-time updates.",
    "projects.penca.description": "A World Cup prediction bracket platform ('penca') allowing users to predict match outcomes, create private leagues, and track real-time standings.",
    "projects.wifigomera.description": "Comprehensive redesign, performance optimization, and SEO improvement for better search visibility.",
    "projects.githubCTA.title": "View More on GitHub",
    "projects.githubCTA.description": "Explore my open source contributions and personal projects.",
    "curiosity.title": "Curiosity & Generalism",
    "curiosity.body.line1": "I am driven by deep, restless curiosity. I refuse to stay inside a single discipline — software engineering is my tool for building, but my thinking is informed by the formal patterns of mathematics, the uncertainty of probability, and the rigor of computer science.",
    "curiosity.body.line2": "I study how complex systems behave, from codebases to abstract equations. I believe the best engineers are generalists who find connections between seemingly unrelated fields.",
    "curiosity.math": "Mathematics",
    "curiosity.probability": "Probability",
    "curiosity.cs": "Computer Science",
    "curiosity.science": "Science",
    "curiosity.philosophy": "Philosophy",
    "curiosity.music": "Music",
    "signature.text": "Handcrafted with intention",
  },
  es: {
    "nav.blog": "Blog",
    "nav.name": "Francisco Escobar",
    "hero.role": "Ingeniero Full Stack",
    "hero.title.line1": "CONSTRUYENDO",
    "hero.title.line2": "EL",
    "hero.title.line3": "FUTURO",
    "hero.description": "Fundador de Eikos Labs. Desafiando el estancamiento tecnológico mediante el progreso vertical. Construyo productos digitales de alto apalancamiento que traen el futuro a la realidad.",
    "hero.contact": "Contactar",
    "hero.github": "GitHub",
    "hero.linkedin": "LinkedIn",
    "section.journal": "001 / Bitácora",
    "section.journal.subtitle": "Una crónica de trabajo y aprendizaje.",
    "section.projects": "002 / Cohetes de Progreso",
    "section.projects.subtitle": "Escapando de la copia horizontal. Construyendo lo que no existía.",
    "section.writings": "003 / Escritos",
    "section.writings.subtitle": "Pensamientos y exploraciones recientes.",
    "section.expertise": "004 / Especialidades",
    "section.expertise.subtitle": "Herramientas, prácticas y oficio.",
    "section.generalist": "005 / Generalista",
    "journal.log": "BITÁCORA",
    "journal.001.title": "Construyendo Eikos Labs",
    "journal.001.date": "Presente",
    "journal.001.reflection": "La culminación de todo lo aprendido. Creando soluciones de software innovadoras y escalables desde cero, llevando al límite la ingeniería web moderna.",
    "journal.002.title": "Escalando en Levity",
    "journal.002.date": "2022 – 2025",
    "journal.002.reflection": "Una clase magistral de desarrollo colaborativo SCRUM. Diseñé APIs RESTful con Node.js y MongoDB, y construí interfaces mantenibles con React y Next.js.",
    "journal.003.title": "Viaje Freelance",
    "journal.003.date": "2019 – Presente",
    "journal.003.reflection": "Traduciendo visiones ambiguas de clientes en realidades concretas de alto rendimiento. Desde sitios corporativos con Three.js hasta embudos de venta optimizados para SEO.",
    "journal.004.title": "Los Cimientos",
    "journal.004.date": "2021 – 2026",
    "journal.004.reflection": "Cursando Ingeniería en Computación en la Universidad de la República. Construyendo bases teóricas rigurosas mientras las aplico a arquitecturas escalables del mundo real.",
    "writings.fetched": "Obtenido de la API a las",
    "writings.refresh": "Recargar",
    "writings.loading": "Cargando...",
    "writings.viewAll": "Ver todos los escritos",
    "writings.error": "Error",
    "writings.tryAgain": "Reintentar",
    "expertise.frontend.title": "Arquitectura Frontend",
    "expertise.frontend.description": "Creando interfaces responsivas, performantes y accesibles con frameworks modernos.",
    "expertise.backend.title": "Backend y APIs",
    "expertise.backend.description": "Diseñando lógica del servidor escalable, segura y eficiente, y arquitecturas RESTful.",
    "expertise.practices.title": "Prácticas de Ingeniería",
    "expertise.practices.description": "Compromiso con la calidad del código, mantenibilidad y flujos de trabajo robustos.",
    "footer.title.line1": "Construyamos",
    "footer.title.line2": "algo significativo.",
    "footer.copyright": "© {year} Francisco Escobar. Eikos Labs.",
    "blog.back": "Volver al Inicio",
    "blog.allWritings": "Todos los Escritos",
    "blog.title.line1": "Últimos",
    "blog.title.line2": "Artículos",
    "blog.count": "Cargado desde la API: {count} artículo{plural} disponible{plural}",
    "blog.empty": "No hay artículos disponibles.",
    "blog.post.back": "Volver al Blog",
    "blog.post.more": "Leer más artículos",
    "blog.post.writings": "Escritos",
    "blog.post.read": "de lectura",
    "blog.post.authorRole": "Ingeniero Full-Stack",
    "blog.post.writtenBy": "Escrito por",
    "blog.post.authorBio": "Fundador de Eikos Labs. Escribo sobre software, ideas y las conexiones entre ellas.",
    "projects.title": "Proyectos Destacados",
    "projects.eikos.description": "Mi startup de software enfocada en crear productos digitales y aplicaciones web innovadoras, escalables y de alto rendimiento.",
    "projects.menusesqr.description": "Plataforma interactiva de menús digitales mediante códigos QR dinámicos para restaurantes y comercios, facilitando pedidos rápidos y actualizaciones en tiempo real.",
    "projects.penca.description": "Plataforma de pronósticos del mundial ('penca') que permite a los usuarios pronosticar resultados, crear ligas privadas y seguir las tablas de posiciones en tiempo real.",
    "projects.wifigomera.description": "Rediseño integral, optimización de rendimiento y mejoras de SEO para mayor visibilidad en buscadores.",
    "projects.githubCTA.title": "Ver más en GitHub",
    "projects.githubCTA.description": "Explora mis contribuciones de código abierto y proyectos personales.",
    "curiosity.title": "Curiosidad y Generalismo",
    "curiosity.body.line1": "Me mueve una curiosidad profunda e inquieta. Me niego a permanecer dentro de una sola disciplina: la ingeniería de software es mi herramienta para construir, pero mi pensamiento se nutre de los patrones formales de las matemáticas, la incertidumbre de la probabilidad y el rigor de la computación.",
    "curiosity.body.line2": "Estudio cómo se comportan los sistemas complejos, desde bases de código hasta ecuaciones abstractas. Creo que los mejores ingenieros son generalistas que encuentran conexiones entre campos aparentemente inconexos.",
    "curiosity.math": "Matemáticas",
    "curiosity.probability": "Probabilidad",
    "curiosity.cs": "Computación",
    "curiosity.science": "Ciencia",
    "curiosity.philosophy": "Filosofía",
    "curiosity.music": "Música",
    "signature.text": "Hecho a mano con intención",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved && (saved === "en" || saved === "es")) {
      setLocaleState(saved);
    } else {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("es")) {
        setLocaleState("es");
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  const t = (key: string): string => {
    const dict = translations[locale] || translations.en;
    return dict[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

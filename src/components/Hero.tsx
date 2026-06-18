"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Terminal as TerminalIcon, Mail, ShieldAlert } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const { t, locale } = useLanguage();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  
  // Rotating ASCII Torus state
  const [asciiFrame, setAsciiFrame] = useState("");
  const [systemLoad, setSystemLoad] = useState({ cpu: 12, ram: 44 });

  // 3D ASCII Torus (Donut) Math Loop + Stats Loop
  useEffect(() => {
    let A = 0;
    let B = 0;
    
    const renderFrame = () => {
      // 40x16 buffer for split terminal panel
      const b = [];
      const z = [];
      const cols = 40;
      const rows = 14;
      
      for (let k = 0; k < cols * rows; k++) {
        b[k] = k % cols === cols - 1 ? "\n" : " ";
        z[k] = 0;
      }
      
      for (let j = 0; j < 6.28; j += 0.08) {
        for (let i = 0; i < 6.28; i += 0.03) {
          const c = Math.sin(i);
          const d = Math.cos(j);
          const e = Math.sin(A);
          const f_val = Math.sin(j);
          const g = Math.cos(A);
          const h = d + 2;
          const D = 1 / (c * h * e + f_val * g + 5);
          const l = Math.cos(i);
          const m = Math.cos(B);
          const n = Math.sin(B);
          const t_val = c * h * g - f_val * e;
          
          const x = Math.floor(cols / 2 + 15 * D * (l * h * m - t_val * n));
          const y = Math.floor(rows / 2 + 7 * D * (l * h * n + t_val * m));
          const o = x + cols * y;
          const N = Math.floor(8 * ((f_val * e - c * d * g) * m - c * d * e - f_val * g - l * d * n));
          
          if (y < rows && y >= 0 && x >= 0 && x < cols - 1 && D > z[o]) {
            z[o] = D;
            b[o] = ".,-~:;=!*#$@"[N > 0 ? N : 0];
          }
        }
      }
      
      setAsciiFrame(b.join(""));
      A += 0.04;
      B += 0.02;
    };

    const interval = setInterval(renderFrame, 50);
    return () => clearInterval(interval);
  }, []);

  // System stats oscillation loop
  useEffect(() => {
    const timer = setInterval(() => {
      setSystemLoad({
        cpu: Math.floor(10 + Math.random() * 25),
        ram: Math.floor(40 + Math.random() * 5),
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Initial terminal greetings
  useEffect(() => {
    const welcome = locale === "es" 
      ? [
          "sh init_fsociety.sh",
          "Connecting to 192.251.68.254...",
          "Establishing encrypted tunnel [TUN0]...",
          "---------------------------------------------",
          "NÚCLEO: EIKOS-OS v2.4.0-fsociety (ACTIVE)",
          "ESTUDIANTE: INGENIERÍA EN COMPUTACIÓN @ UDELAR, URUGUAY.",
          "FUNDADOR: EIKOS LABS - SOFTWARE DE ALTO RENDIMIENTO.",
          "---------------------------------------------",
          "Escribe 'help' o haz clic en los accesos rápidos para explorar.",
        ]
      : [
          "sh init_fsociety.sh",
          "Connecting to 192.251.68.254...",
          "Establishing encrypted tunnel [TUN0]...",
          "---------------------------------------------",
          "CORE: EIKOS-OS v2.4.0-fsociety (ACTIVE)",
          "UNDERGRAD: COMPUTER ENGINEERING @ UDELAR, URUGUAY.",
          "FOUNDER: EIKOS LABS - HIGH-PERFORMANCE DIGITAL PRODUCTS.",
          "---------------------------------------------",
          "Type 'help' or click the shortcuts below to explore.",
        ];
    setHistory(welcome);
  }, [locale]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    let response: string[] = [];
    if (trimmed === "help") {
      response = locale === "es"
        ? [
            `> ${cmd}`,
            "COMANDOS DISPONIBLES:",
            "  about      - Quién soy y mis estudios.",
            "  projects   - Ir a la sección de proyectos.",
            "  contact    - Información de contacto.",
            "  fsociety   - Inicializar protocolo fsociety.",
            "  clear      - Limpiar la pantalla de la terminal.",
          ]
        : [
            `> ${cmd}`,
            "AVAILABLE COMMANDS:",
            "  about      - Who I am and my studies.",
            "  projects   - Go to projects section.",
            "  contact    - Contact information.",
            "  fsociety   - Initialize fsociety protocol.",
            "  clear      - Clear the terminal screen.",
          ];
    } else if (trimmed === "about") {
      response = locale === "es"
        ? [
            `> ${cmd}`,
            "SOBRE MÍ:",
            "  Nombre: Francisco Escobar",
            "  Rol: Fundador de Eikos Labs & Ingeniero Full Stack.",
            "  Estudios: Cursando Ingeniería en Computación (UdelaR, Uruguay).",
            "  Misión: Crear productos digitales inmersivos con arquitectura robusta",
            "          y estética brutalista/geek de alto impacto.",
          ]
        : [
            `> ${cmd}`,
            "ABOUT ME:",
            "  Name: Francisco Escobar",
            "  Role: Founder of Eikos Labs & Full Stack Engineer.",
            "  Studies: Undergrad in Computer Engineering (UdelaR, Uruguay).",
            "  Mission: Crafting immersive digital products with robust architecture",
            "           and high-impact brutalist/geek aesthetics.",
          ];
    } else if (trimmed === "projects") {
      response = locale === "es"
        ? [
            `> ${cmd}`,
            "REDIRECCIONANDO A PROYECTOS...",
          ]
        : [
            `> ${cmd}`,
            "REDIRECTING TO PROJECTS...",
          ];
      setTimeout(() => {
        const el = document.getElementById("projects-section");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 500);
    } else if (trimmed === "contact") {
      response = locale === "es"
        ? [
            `> ${cmd}`,
            "CONTACTO DIRECTO:",
            "  Email: franciscomateoescobar1@gmail.com",
            "  GitHub: github.com/FranciszekaMateu",
            "  LinkedIn: linkedin.com/in/franciscoesscobarr",
          ]
        : [
            `> ${cmd}`,
            "DIRECT CONTACT:",
            "  Email: franciscomateoescobar1@gmail.com",
            "  GitHub: github.com/FranciszekaMateu",
            "  LinkedIn: linkedin.com/in/franciscoesscobarr",
          ];
    } else if (trimmed === "fsociety" || trimmed === "mrrobot") {
      response = [
        `> ${cmd}`,
        "[SYSTEM OVERRIDE] BYPASSING SEG-0...",
        "Executing: python fuxsocy.py...",
        "---------------------------------------------",
        "   __                     _      _",
        "  / _|                   (_)    | |",
        " | |_ ___  ___   ___ _ ___ _  __| |_   _",
        " |  _/ __| / _ \\ / __| |  __| | / _` | | | |",
        " | | \\__ \\ (_) | (__| | |_| | (_| | |_| |",
        " |_| |___/\\___/ \\___|_|\\__|_|\\__,_|\\__, |",
        "                                    __/ |",
        "                                   |___/",
        "",
        locale === "es"
          ? '"¿Hola amigo? Eso es cursi... Necesito un nombre."'
          : '"Hello friend. That\'s lame. I need a name."',
        locale === "es"
          ? '"El mundo es una gran mentira. Vivimos en una ilusión."'
          : '"We live in a world where everyone is gaslighted..."',
        "---------------------------------------------",
      ];
    } else if (trimmed === "clear") {
      setHistory([]);
      setInput("");
      return;
    } else {
      response = locale === "es"
        ? [`> ${cmd}`, `Comando no reconocido: '${trimmed}'. Escribe 'help' para ayuda.`]
        : [`> ${cmd}`, `Command not recognized: '${trimmed}'. Type 'help' for help.`];
    }

    setHistory((prev) => [...prev, ...response]);
    setInput("");
  };

  return (
    <section className="min-h-[85vh] md:min-h-screen flex flex-col justify-center py-12 md:py-16 relative">
      <div className="relative isolate grid lg:grid-cols-12 gap-8 items-center">
        {/* Bio column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="space-y-4">
            <span className="sticker font-mono">CORE_INIT_OK</span>
            <h1 
              className="font-sans text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-foreground"
            >
              {t("nav.name")}
            </h1>
            <p className="font-mono text-accent font-bold uppercase tracking-widest text-sm">
              // {t("hero.role")} & Computer Engineering Student
            </p>
          </div>

          <p className="font-sans text-base sm:text-lg text-foreground/85 leading-relaxed font-normal">
            {locale === "es"
              ? "Curso Ingeniería en Computación en la Universidad de la República (UdelaR), Uruguay. Creo software inmersivo, interactivo y de alto rendimiento. Fundador de Eikos Labs."
              : "Computer Engineering undergrad at UdelaR, Uruguay. I build immersive, interactive, high-performance software. Founder of Eikos Labs."}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="mailto:franciscomateoescobar1@gmail.com"
              className="btn-cyber btn-cyber-lime inline-flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              {t("hero.contact")}
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-wider text-foreground/50 pt-2">
            <a href="https://github.com/FranciszekaMateu" target="_blank" rel="noreferrer" className="hover:text-accent flex items-center gap-1">
              Github <ArrowUpRight className="w-3 h-3" />
            </a>
            <span>·</span>
            <a href="https://www.linkedin.com/in/franciscoesscobarr" target="_blank" rel="noreferrer" className="hover:text-accent flex items-center gap-1">
              LinkedIn <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </motion.div>

        {/* Integrated Terminal & ASCII Monitor (Visual Spectacle) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="lg:col-span-7 w-full space-y-3"
        >
          {/* Integrated Multi-Pane Terminal */}
          <div className="terminal-window border-2 border-foreground shadow-brutal flex flex-col h-[340px] sm:h-[380px]">
            {/* Top Bar */}
            <div className="bg-foreground text-background font-mono text-xs px-4 py-2 flex items-center justify-between font-bold select-none">
              <span className="flex items-center gap-2">
                <TerminalIcon className="w-4 h-4" />
                <span>elliot@fsociety:~/personal-page</span>
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#FF4500] border border-foreground" />
                <span className="w-2.5 h-2.5 bg-[#BAFF29] border border-foreground" />
                <span className="w-2.5 h-2.5 bg-[#00e5ff] border border-foreground" />
              </div>
            </div>

            {/* Split Screen Workspace */}
            <div className="flex flex-grow overflow-hidden bg-[#050508]">
              {/* Left Pane: Interactive Console Log (70% width) */}
              <div className="w-[62%] sm:w-[67%] p-4 flex flex-col justify-between overflow-y-auto border-r-2 border-foreground/20 font-mono text-[10px] sm:text-xs text-foreground/80 space-y-1 relative">
                <div className="absolute top-2 right-2 flex items-center gap-1 text-[#FF4500] opacity-40 text-[9px] animate-pulse">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>CON_FEED</span>
                </div>
                
                <div className="space-y-1">
                  {history.map((line, idx) => (
                    <div key={idx} className="whitespace-pre-wrap leading-relaxed">
                      {line.startsWith("> ") ? (
                        <span className="text-accent font-bold">{line}</span>
                      ) : line.includes("SISTEMA:") || line.includes("SYSTEM:") ? (
                        <span className="text-[#00e5ff]">{line}</span>
                      ) : line.includes("ESTUDIANTE:") || line.includes("UNDERGRAD:") || line.includes("FUNDADOR:") || line.includes("NÚCLEO:") || line.includes("CORE:") ? (
                        <span className="text-accent-secondary">{line}</span>
                      ) : (
                        line
                      )}
                    </div>
                  ))}
                  <div ref={terminalEndRef} />
                </div>
              </div>

              {/* Right Pane: Integrated ASCII Torus Monitor + Status Feed (30% width) */}
              <div className="w-[38%] sm:w-[33%] p-3 bg-[#08080f]/50 flex flex-col justify-between font-mono text-[9px] sm:text-[10px] text-foreground/70 overflow-hidden select-none">
                {/* 3D ASCII Torus viewport */}
                <div className="flex-grow flex items-center justify-center border-b border-foreground/20 py-2">
                  <pre className="text-[4.8px] sm:text-[6.5px] leading-none text-[#BAFF29]">
                    {asciiFrame}
                  </pre>
                </div>
                
                {/* Real-time system stats */}
                <div className="pt-3 space-y-1 sm:space-y-1.5">
                  <div className="flex justify-between">
                    <span>SYS_LOAD:</span>
                    <span className="text-[#00e5ff] font-bold">ONLINE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CPU_UTIL:</span>
                    <span className="text-accent font-bold tabular-nums">{systemLoad.cpu}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>RAM_ALLOC:</span>
                    <span className="text-[#BAFF29] font-bold tabular-nums">{systemLoad.ram}%</span>
                  </div>
                  <div className="flex justify-between border-t border-foreground/20 pt-1">
                    <span>SECTOR_3D:</span>
                    <span className="text-accent-secondary font-bold">ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Line */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCommand(input);
              }}
              className="border-t-[2px] border-foreground flex items-center bg-[#07070a] px-3 py-2"
            >
              <span className="font-mono text-xs text-[#BAFF29] font-bold mr-1.5">elliot@fsociety:~$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-transparent border-0 outline-none flex-grow text-xs font-mono text-foreground placeholder-foreground/30 focus:ring-0"
                placeholder={locale === "es" ? "Escribe 'help'..." : "Type 'help'..."}
              />
            </form>
          </div>

          {/* Quick links to click for terminal */}
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <button onClick={() => handleCommand("about")} className="px-2 py-0.5 border border-foreground/30 hover:border-accent text-foreground/60 hover:text-accent">
              [Run about]
            </button>
            <button onClick={() => handleCommand("projects")} className="px-2 py-0.5 border border-foreground/30 hover:border-accent text-foreground/60 hover:text-accent">
              [Run projects]
            </button>
            <button onClick={() => handleCommand("contact")} className="px-2 py-0.5 border border-foreground/30 hover:border-accent text-foreground/60 hover:text-accent">
              [Run contact]
            </button>
            <button onClick={() => handleCommand("fsociety")} className="px-2 py-0.5 border border-[#FF4500]/40 hover:border-[#FF4500] text-[#FF4500]/70 hover:text-[#FF4500] font-bold">
              [fsociety.sh]
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 w-full h-[3px] origin-left bg-foreground"
      />
    </section>
  );
}

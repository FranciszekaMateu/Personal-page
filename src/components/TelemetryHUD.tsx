"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TelemetryHUD() {
  const { locale } = useLanguage();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentTime, setCurrentTime] = useState("00:00:00");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let speedTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const h = document.documentElement;
      const totalHeight = h.scrollHeight - h.clientHeight;
      const progress = totalHeight > 0 ? h.scrollTop / totalHeight : 0;
      setScrollProgress(progress);

      const currentScrollY = window.scrollY;
      const now = performance.now();
      const dt = now - lastTime;
      
      if (dt > 0) {
        const dy = Math.abs(currentScrollY - lastScrollY);
        const speed = Math.round((dy / dt) * 1000); // px per second
        setScrollSpeed((prev) => Math.min(speed, 5000)); // Cap speed at 5000px/s
      }

      lastScrollY = currentScrollY;
      lastTime = now;

      // Reset speed after scrolling stops
      clearTimeout(speedTimeout);
      speedTimeout = setTimeout(() => {
        setScrollSpeed(0);
      }, 150);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const updateTime = () => {
      const d = new Date();
      setCurrentTime(d.toLocaleTimeString());
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    const timeInterval = setInterval(updateTime, 1000);
    updateTime();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(timeInterval);
      clearTimeout(speedTimeout);
    };
  }, []);

  if (!mounted) return null;

  const isEs = locale === "es";

  return (
    <div className="fixed inset-0 pointer-events-none select-none z-30 font-mono text-[9px] sm:text-[10px] text-foreground/40 hidden md:block">
      {/* Top Left: Diagnostics Status */}
      <div className="absolute top-20 left-6 flex flex-col gap-1 border-l-2 border-[#BAFF29] pl-3 py-1">
        <div className="flex gap-2">
          <span className="text-[#BAFF29] font-bold">● {isEs ? "EN LÍNEA" : "ONLINE"}</span>
          <span>{isEs ? "INIT_SISTEMA: ÉXITO" : "SYSTEM_INIT: SUCCESS"}</span>
        </div>
        <div>{isEs ? "ÍNDICE_OPTIMISMO" : "OPTIMISM_INDEX"}: <span className="text-white font-bold">100.0%</span></div>
        <div>{isEs ? "ESCUDO_ESTANCAMIENTO" : "STAGNATION_SHIELD"}: <span className="text-[#00e5ff] font-bold">{isEs ? "ARMADO" : "ARMED"}</span></div>
      </div>

      {/* Top Right: Time & Coordinates */}
      <div className="absolute top-20 right-6 text-right border-r-2 border-[#FF4500] pr-3 py-1">
        <div>UTC: {currentTime}</div>
        <div>SYS_COORD: X_{mousePos.x} Y_{mousePos.y}</div>
        <div>LOCALE: {isEs ? "ES_URUGUAY" : "EN_GLOBAL"}</div>
      </div>

      {/* Left Edge: 0 to 1 Vertical Progress Meter */}
      <div className="absolute left-6 top-[30vh] bottom-[30vh] flex flex-col items-center justify-between py-4 border-l border-foreground/15">
        <div className="text-accent-secondary font-bold font-sans">0</div>
        <div className="relative h-full w-px bg-foreground/10 my-4 flex items-center justify-center">
          <div 
            className="absolute top-0 w-1.5 h-1.5 bg-[#BAFF29] -translate-x-0.5 transition-all duration-75"
            style={{ top: `${scrollProgress * 100}%` }}
          />
        </div>
        <div className="text-[#BAFF29] font-bold font-sans">1</div>
      </div>

      {/* Right Edge: Velocity Meter */}
      <div className="absolute right-6 top-[30vh] bottom-[30vh] flex flex-col justify-between items-end pl-3 border-r border-foreground/15">
        <div className="text-[8px] tracking-wider text-foreground/30">{isEs ? "VELOCIDAD_SCROLL" : "SCROLL VELOCITY"}</div>
        <div className="flex-grow flex items-center justify-end">
          <div className="text-right">
            <span className={`text-sm font-bold ${scrollSpeed > 1000 ? "text-[#FF4500]" : scrollSpeed > 200 ? "text-[#BAFF29]" : "text-foreground/40"}`}>
              {scrollSpeed}
            </span>
            <span className="text-[8px] text-foreground/20"> PX/S</span>
            {scrollSpeed > 1000 && (
              <div className="text-accent text-[7px] tracking-tighter uppercase animate-pulse">
                [{isEs ? "WARP_ACTIVO" : "WARPING ACTIVE"}]
              </div>
            )}
          </div>
        </div>
        <div className="text-[8px] text-foreground/30">{isEs ? "ACELERACIÓN" : "ACCELERATION"}</div>
      </div>

      {/* Bottom Left: Techno-Optimism Thiel Statement Banner */}
      <div className="absolute bottom-6 left-6 max-w-xs border border-foreground/20 p-2 bg-[#050508]/85">
        <div className="text-accent font-bold mb-0.5">{isEs ? "Optimismo Definido // Progreso Vertical" : "Definite Optimism // Vertical Progress"}</div>
        <div className="text-[8px] leading-relaxed text-foreground/60 uppercase">
          {isEs
            ? "El progreso vertical no ocurre por accidente. Se construye mediante ingeniería atrevida y convicción indefinida."
            : "Vertical progress does not happen by accident. It is built through bold engineering and definite conviction."}
        </div>
      </div>

      {/* Bottom Right: Torus telemetry (Reflecting Reversion to Torus) */}
      <div className="absolute bottom-6 right-6 border border-foreground/20 p-2 bg-[#050508]/85 text-right">
        <div className="text-[#BAFF29] font-bold mb-0.5">{isEs ? "TOROIDE_ACTIVO" : "TORUS_ACTIVE"}</div>
        <div className="text-[8px] text-foreground/60 uppercase">
          {isEs ? "CANAL_PLANOS_HOLOGRÁFICOS" : "HOLOGRAPHIC BLUEPRINT FEED"}
        </div>
      </div>
    </div>
  );
}

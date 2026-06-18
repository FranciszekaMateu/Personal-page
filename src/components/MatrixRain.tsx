"use client";

import { useEffect, useRef } from "react";

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Matrix characters: Katakana, Latin letters, Numbers, and Tech symbols
    const chars = "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789<>[]{}/\\#@$%&*+-=";
    const charArray = chars.split("");

    const fontSize = 12;
    // Calculate columns
    const columns = Math.ceil(canvas.width / fontSize);
    const rainDrops: number[] = Array(columns).fill(0).map(() => Math.floor(Math.random() * -100));

    let animationFrameId: number;

    const draw = () => {
      // Dark semi-transparent background to create trailing/fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Crimson hacker red text
      ctx.fillStyle = "#ff1e27";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < rainDrops.length; i++) {
        // Only draw if it's on screen
        if (rainDrops[i] >= 0) {
          const char = charArray[Math.floor(Math.random() * charArray.length)];
          const x = i * fontSize;
          const y = rainDrops[i] * fontSize;

          // Introduce random brighter characters (glowing effect)
          if (Math.random() > 0.98) {
            ctx.fillStyle = "#ffffff";
            ctx.fillText(char, x, y);
            ctx.fillStyle = "#ff1e27";
          } else {
            ctx.fillText(char, x, y);
          }
        }

        // Move drop down
        rainDrops[i]++;

        // Reset drop if it exits screen
        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none select-none opacity-[0.09]"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  );
}

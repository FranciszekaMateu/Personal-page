import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Generalist from "@/components/Generalist";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import AmbientBackground from "@/components/AmbientBackground";
import MatrixRain from "@/components/MatrixRain";

export default function Home() {
  return (
    <main className="min-h-screen text-foreground relative selection:bg-accent selection:text-white overflow-hidden bg-[#08080c]">
      {/* CRT Scanline & flicker overlay for geek visual spectacle */}
      <div className="crt-overlay pointer-events-none" />
      <div className="crt-overlay crt-flicker pointer-events-none" />

      <Navigation />



      {/* 3D Interactive WebGL space field / Torus Knot */}
      <AmbientBackground />

      {/* Layered Matrix digital code rain */}
      <MatrixRain />

      {/* Brief, single-scrolling visual container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-12 pt-20 sm:pt-24 pb-8 sm:pb-10 md:pb-12">
        <Hero />
        <Projects />
        <Generalist />
        <Footer />
      </div>
    </main>
  );
}

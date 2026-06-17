"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Anthropic warm palette
const PARTICLE_COLOR = 0xc75d3a; // terracotta
const LINE_COLOR = 0x8a8782;     // muted taupe

export default function FractalField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const PARTICLE_COUNT = 600;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const originalPositions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);

    const generateFractalPoint = (depth: number): [number, number, number] => {
      let x = 0, y = 0, z = 0;
      for (let i = 0; i < depth; i++) {
        const r = Math.random() * 3;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const scale = 0.6 + (i * 0.15);
        x += r * Math.sin(phi) * Math.cos(theta) * scale;
        y += r * Math.sin(phi) * Math.sin(theta) * scale;
        z += r * Math.cos(phi) * scale;
      }
      return [x, y, z];
    };

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const [x, y, z] = generateFractalPoint(4 + Math.floor(Math.random() * 3));
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;
      sizes[i] = Math.random() * 0.5 + 0.2;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // Warm terracotta sprite
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(199, 93, 58, 1)");
      gradient.addColorStop(0.4, "rgba(199, 93, 58, 0.4)");
      gradient.addColorStop(1, "rgba(199, 93, 58, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      color: PARTICLE_COLOR,
      size: 0.15,
      map: particleTexture,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Constellation lines in warm taupe
    const MAX_CONNECTIONS = PARTICLE_COUNT * 3;
    const linePositions = new Float32Array(MAX_CONNECTIONS * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const lineMaterial = new THREE.LineBasicMaterial({
      color: LINE_COLOR,
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Mouse interaction
    const mouse = new THREE.Vector2();

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.active = true;
      mouse.x = mouseRef.current.x;
      mouse.y = mouseRef.current.y;
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    let scrollY = 0;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll);

    const clock = new THREE.Clock();
    let animationId: number;

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Slow, meditative rotation
      particles.rotation.y = elapsed * 0.04;
      particles.rotation.x = Math.sin(elapsed * 0.02) * 0.15;
      lines.rotation.y = particles.rotation.y;
      lines.rotation.x = particles.rotation.x;

      // Camera parallax
      const targetCamX = mouseRef.current.x * 2;
      const targetCamY = mouseRef.current.y * 1.5;
      camera.position.x += (targetCamX - camera.position.x) * 0.04;
      camera.position.y += (targetCamY - camera.position.y) * 0.04;
      
      const scrollFactor = scrollY * 0.005;
      camera.position.z = 30 - scrollFactor * 5;
      camera.lookAt(0, 0, 0);

      const positionAttr = particleGeometry.getAttribute("position") as THREE.BufferAttribute;
      const posArray = positionAttr.array as Float32Array;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const ix = i * 3;
        const ox = originalPositions[ix];
        const oy = originalPositions[ix + 1];
        const oz = originalPositions[ix + 2];

        const noiseX = Math.sin(oy * 0.3 + elapsed * 0.5) * Math.cos(oz * 0.3 + elapsed * 0.3) * 0.3;
        const noiseY = Math.sin(oz * 0.3 + elapsed * 0.4) * Math.cos(ox * 0.3 + elapsed * 0.5) * 0.3;
        const noiseZ = Math.sin(ox * 0.3 + elapsed * 0.6) * Math.cos(oy * 0.3 + elapsed * 0.4) * 0.3;

        const worldX = ox + camera.position.x;
        const worldY = oy + camera.position.y;
        const dx = mouseRef.current.x * 15 - worldX;
        const dy = -mouseRef.current.y * 10 - worldY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let forceX = 0, forceY = 0;
        if (mouseRef.current.active && dist < 15) {
          const force = (1 - dist / 15) * 2;
          forceX = (dx / dist) * force;
          forceY = (dy / dist) * force;
        }

        posArray[ix] = ox + noiseX + forceX;
        posArray[ix + 1] = oy + noiseY + forceY;
        posArray[ix + 2] = oz + noiseZ;
      }
      positionAttr.needsUpdate = true;

      // Constellation lines
      let lineIndex = 0;
      const threshold = 5.0;
      for (let i = 0; i < PARTICLE_COUNT && lineIndex < MAX_CONNECTIONS; i++) {
        const ax = posArray[i * 3];
        const ay = posArray[i * 3 + 1];
        const az = posArray[i * 3 + 2];

        for (let j = i + 1; j < PARTICLE_COUNT && lineIndex < MAX_CONNECTIONS; j++) {
          const bx = posArray[j * 3];
          const by = posArray[j * 3 + 1];
          const bz = posArray[j * 3 + 2];
          const dx = ax - bx;
          const dy = ay - by;
          const dz = az - bz;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < threshold) {
            const lineIdx = lineIndex * 6;
            linePositions[lineIdx] = ax;
            linePositions[lineIdx + 1] = ay;
            linePositions[lineIdx + 2] = az;
            linePositions[lineIdx + 3] = bx;
            linePositions[lineIdx + 4] = by;
            linePositions[lineIdx + 5] = bz;
            lineIndex++;
          }
        }
      }
      for (let i = lineIndex * 6; i < linePositions.length; i++) {
        linePositions[i] = 0;
      }
      (lineGeometry.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
      lineGeometry.setDrawRange(0, lineIndex * 2);

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.5 }}
    />
  );
}

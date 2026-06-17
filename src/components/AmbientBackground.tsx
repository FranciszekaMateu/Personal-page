"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function AmbientBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const container = containerRef.current;
    
    // Create canvas
    const canvas = document.createElement("canvas");
    canvas.className = "absolute inset-0 w-full h-full pointer-events-none";
    canvas.style.zIndex = "0";
    container.appendChild(canvas);

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08080c, 0.012);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      120
    );
    camera.position.z = 45;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // ═══════════════════════════════════════════════════════════════
    // THE 3D TORUS KNOT (Orange wireframe shape, as before)
    // ═══════════════════════════════════════════════════════════════
    const torusGeom = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0xff4500, // Hot orange
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const torusKnot = new THREE.Mesh(torusGeom, torusMat);
    scene.add(torusKnot);

    // ═══════════════════════════════════════════════════════════════
    // THE CYBER GRID TUNNEL (Infinite scroll horizon)
    // ═══════════════════════════════════════════════════════════════
    const gridLines = [];
    const tunnelRadius = 35;
    const tunnelLength = 150;
    const segments = 12;
    const rings = 15;

    const tunnelGroup = new THREE.Group();

    for (let r = 0; r < rings; r++) {
      const ringZ = (r / rings) * -tunnelLength + 30;
      
      // Horizontal rings
      const ringGeom = new THREE.BufferGeometry();
      const ringCoords = [];
      
      for (let s = 0; s <= segments; s++) {
        const theta = (s / segments) * Math.PI * 2;
        ringCoords.push(
          Math.sin(theta) * tunnelRadius,
          Math.cos(theta) * tunnelRadius,
          ringZ
        );
      }
      
      ringGeom.setAttribute("position", new THREE.Float32BufferAttribute(ringCoords, 3));
      const ringMat = new THREE.LineBasicMaterial({ 
        color: 0x1a1a2e, 
        transparent: true, 
        opacity: 0.25 
      });
      const ringLine = new THREE.Line(ringGeom, ringMat);
      tunnelGroup.add(ringLine);
    }

    // Longitudinal lines of the tunnel
    for (let s = 0; s < segments; s++) {
      const theta = (s / segments) * Math.PI * 2;
      const lineGeom = new THREE.BufferGeometry();
      lineGeom.setAttribute("position", new THREE.Float32BufferAttribute([
        Math.sin(theta) * tunnelRadius, Math.cos(theta) * tunnelRadius, 30,
        Math.sin(theta) * tunnelRadius, Math.cos(theta) * tunnelRadius, -tunnelLength
      ], 3));
      const lineMat = new THREE.LineBasicMaterial({ 
        color: 0x1a1a2e, 
        transparent: true, 
        opacity: 0.25 
      });
      const longLine = new THREE.Line(lineGeom, lineMat);
      tunnelGroup.add(longLine);
    }
    scene.add(tunnelGroup);

    // ═══════════════════════════════════════════════════════════════
    // WARP SPEED PARTICLES (Constellations)
    // ═══════════════════════════════════════════════════════════════
    const particlesCount = 400;
    const positions = new Float32Array(particlesCount * 3);
    const particleSpeeds = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount; i++) {
      // Cylindrical distribution around tunnel
      const angle = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 30;
      
      positions[i * 3] = Math.sin(angle) * radius;
      positions[i * 3 + 1] = Math.cos(angle) * radius;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 120; // Spread on Z

      particleSpeeds[i] = 0.2 + Math.random() * 0.8;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Dynamic particle point texture
    const pCanvas = document.createElement("canvas");
    pCanvas.width = 16;
    pCanvas.height = 16;
    const pCtx = pCanvas.getContext("2d");
    if (pCtx) {
      const grad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, "rgba(186, 255, 41, 1)");
      grad.addColorStop(1, "rgba(186, 255, 41, 0)");
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 16, 16);
    }
    const pTexture = new THREE.CanvasTexture(pCanvas);

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xbaff29, // Acid lime
      size: 0.8,
      transparent: true,
      opacity: 0.5,
      map: pTexture,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // ═══════════════════════════════════════════════════════════════
    // INTERACTIVE LOOPS
    // ═══════════════════════════════════════════════════════════════
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;
    let scrollY = 0;
    let targetScrollY = 0;
    let scrollSpeed = 0;
    let lastScrollY = 0;
    let lastScrollTime = performance.now();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) / 150;
      mouseY = (e.clientY - window.innerHeight / 2) / 150;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
      
      const now = performance.now();
      const dt = now - lastScrollTime;
      if (dt > 0) {
        const dy = Math.abs(window.scrollY - lastScrollY);
        scrollSpeed = (dy / dt) * 30; // Scale speed factor
      }
      lastScrollY = window.scrollY;
      lastScrollTime = now;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    const clock = new THREE.Clock();

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth interpolations
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      scrollY += (targetScrollY - scrollY) * 0.08;

      // Slow down scroll speed velocity decay
      scrollSpeed *= 0.95;

      // Rotate Torus Knot based on elapsed time + scroll velocity (subtly)
      const rotationMultiplier = 1.0 + scrollSpeed * 0.04;
      torusKnot.rotation.y = elapsedTime * 0.2 * rotationMultiplier;
      torusKnot.rotation.x = elapsedTime * 0.15 + targetY * 0.2;
      
      // Pulse scale matching scroll acceleration (subtly)
      const scaleFactor = 1.0 + Math.sin(elapsedTime * 2.0) * 0.05 + Math.min(scrollSpeed * 0.003, 0.08);
      torusKnot.scale.set(scaleFactor, scaleFactor, scaleFactor);

      // Animate particles (plunging forward)
      const posArr = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particlesCount; i++) {
        // Move particle forward (positive Z)
        // Accelerate when scrolling (subtly)
        const particleSpeed = particleSpeeds[i] * (1.0 + scrollSpeed * 0.06);
        posArr[i * 3 + 2] += particleSpeed;

        // If particle flies past camera, recycle it in the background
        if (posArr[i * 3 + 2] > 60) {
          posArr[i * 3 + 2] = -60;
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Parallax camera movement
      camera.position.x = targetX * 12;
      camera.position.y = -targetY * 12;
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      // Move camera slightly deeper or shift tunnel on scroll (subtly)
      tunnelGroup.position.z = (scrollY * 0.01) % 10;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
      torusGeom.dispose();
      torusMat.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      pTexture.dispose();
      
      tunnelGroup.traverse((child) => {
        if (child instanceof THREE.Line) {
          child.geometry.dispose();
          if (child.material instanceof THREE.Material) {
            child.material.dispose();
          }
        }
      });
      
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden select-none bg-[#08080c]"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}

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
      color: 0xff1e27, // Mr. Robot Crimson Red
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
    // INTERACTIVE LOOPS
    // ═══════════════════════════════════════════════════════════════
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;
    let scrollY = 0;
    let targetScrollY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) / 150;
      mouseY = (e.clientY - window.innerHeight / 2) / 150;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
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

      // Rotate Torus Knot based on elapsed time + scroll position smoothly (no speed multiplier)
      torusKnot.rotation.y = elapsedTime * 0.12 + scrollY * 0.0006;
      torusKnot.rotation.x = elapsedTime * 0.08 + scrollY * 0.0004 + targetY * 0.15;
      
      // Pulse scale matching elapsed time (subtly)
      const scaleFactor = 1.0 + Math.sin(elapsedTime * 1.5) * 0.04;
      torusKnot.scale.set(scaleFactor, scaleFactor, scaleFactor);



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

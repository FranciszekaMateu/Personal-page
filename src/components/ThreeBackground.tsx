"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function WireframeShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Continuous rotation
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      
      // Subtle mouse interaction
      const mouseX = state.mouse.x * 0.5;
      const mouseY = state.mouse.y * 0.5;
      meshRef.current.rotation.x += mouseY * 0.2;
      meshRef.current.rotation.y += mouseX * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={2.5}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial 
          color="#00ff9d" 
          wireframe={true} 
          transparent={true} 
          opacity={0.3} 
        />
      </mesh>
      {/* Inner core */}
      <mesh scale={1.5}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial 
          color="#00ff9d" 
          wireframe={true} 
          transparent={true} 
          opacity={0.15} 
        />
      </mesh>
    </Float>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00ff9d" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ccff" />
        <WireframeShape />
      </Canvas>
    </div>
  );
}

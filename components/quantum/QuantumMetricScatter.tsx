"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function QuantumMetricScatter() {
  const pointsRef = useRef<THREE.Points>(null!);
  
  // Generate random data points
  const particleCount = 2000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360); 
      const phi = THREE.MathUtils.randFloatSpread(360); 
      const r = 3 + Math.random() * 2; // Radius distribution
      
      pos[i * 3] = r * Math.sin(theta) * Math.cos(phi);
      pos[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      pos[i * 3 + 2] = r * Math.cos(theta);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    // Slow rotation of the entire data cloud
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    // Pulse effect
    const scale = 1 + Math.sin(state.clock.getElapsedTime()) * 0.05;
    pointsRef.current.scale.set(scale, scale, scale);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          itemSize={3}
          count={particleCount}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        color="#00ffff" 
        transparent 
        opacity={0.6} 
        sizeAttenuation={true} 
      />
    </points>
  );
}

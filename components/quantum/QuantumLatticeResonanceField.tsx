"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function QuantumLatticeResonanceField() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    mat.uniforms.time.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1]}>
      <planeGeometry args={[14, 14, 512, 512]} />
      <quantumLatticeResonanceMaterial
        time={0}
        scale={2.0}
        resonance={1.5}
      />
    </mesh>
  );
}

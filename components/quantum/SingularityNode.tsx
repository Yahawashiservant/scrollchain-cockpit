"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function SingularityNode() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const mat = ref.current.material as THREE.MeshStandardMaterial;

    ref.current.rotation.x = t * 0.15;
    ref.current.rotation.y = t * 0.22;

    // breathing glow
    mat.emissiveIntensity = 0.7 + Math.sin(t * 3.0) * 0.3;
  });

  return (
    <mesh ref={ref} scale={0.9}>
      <icosahedronGeometry args={[1, 4]} />
      <meshStandardMaterial
        color="#00ffff"
        emissive="#00ffff"
        emissiveIntensity={1.0}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
}

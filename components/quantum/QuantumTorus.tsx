"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

export default function QuantumTorus({ color = "#00ffff" }) {
  const meshRef = useRef<Mesh>(null!);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.005;
    meshRef.current.rotation.y += 0.004;
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[1, 0.35, 32, 100]} />
      <meshStandardMaterial emissive={color} emissiveIntensity={1.5} />
    </mesh>
  );
}

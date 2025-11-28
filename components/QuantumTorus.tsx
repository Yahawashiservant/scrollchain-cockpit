"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function QuantumTorus() {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
  });
  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[1.5, 0.4, 32, 100]} />
      <meshStandardMaterial color="#06b6d4" wireframe transparent opacity={0.6} />
    </mesh>
  );
}

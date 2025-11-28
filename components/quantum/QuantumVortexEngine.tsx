"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function QuantumVortexEngine() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.01;
    ref.current.rotation.z = Math.sin(state.clock.getElapsedTime()) * 0.1;
  });
  return (
    <mesh ref={ref}>
      <coneGeometry args={[1.5, 3, 32, 1, true]} />
      <meshStandardMaterial color="#8b5cf6" wireframe transparent opacity={0.6} side={THREE.DoubleSide} />
    </mesh>
  );
}

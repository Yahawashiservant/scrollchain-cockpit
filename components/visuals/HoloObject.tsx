"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function HoloObject({ type, speed }: { type: string, speed: number }) {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = state.clock.getElapsedTime() * speed;
    mesh.current.rotation.y = state.clock.getElapsedTime() * (speed * 0.5);
  });

  // Select geometry based on "room vibe"
  if (type === "AI" || type === "INTELLIGENCE") {
    return (
      <points ref={mesh}>
        <icosahedronGeometry args={[2.5, 4]} />
        <pointsMaterial color="#a855f7" size={0.04} transparent opacity={0.6} />
      </points>
    );
  }
  
  if (type === "FINANCE" || type === "DEFENSE") {
    return (
      <mesh ref={mesh}>
        <octahedronGeometry args={[2.2, 0]} />
        <meshStandardMaterial color={type === "DEFENSE" ? "#ef4444" : "#22c55e"} wireframe transparent opacity={0.3} />
      </mesh>
    );
  }

  if (type === "INFRA" || type === "CORE") {
    return (
      <mesh ref={mesh}>
        <torusKnotGeometry args={[1.5, 0.4, 128, 32]} />
        <meshStandardMaterial color="#06b6d4" wireframe transparent opacity={0.4} />
      </mesh>
    );
  }

  // Default (Frontier/Exotic/Sim)
  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[2.2, 32, 32]} />
      <meshStandardMaterial color="#eab308" wireframe transparent opacity={0.2} />
    </mesh>
  );
}

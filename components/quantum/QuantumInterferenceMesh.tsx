"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function QuantumInterferenceMesh() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    m.uniforms.time.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1]}>
      <planeGeometry args={[12, 12, 256, 256]} />
      <quantumInterferenceMaterial time={0} intensity={0.85} />
    </mesh>
  );
}

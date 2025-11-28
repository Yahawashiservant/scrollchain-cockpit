"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function StandingWaveEngine() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    m.uniforms.time.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1.5]}>
      <planeGeometry args={[14, 14, 256, 256]} />
      <standingWaveMaterial
        time={0}
        frequency={4.0}
        amplitude={0.3}
      />
    </mesh>
  );
}

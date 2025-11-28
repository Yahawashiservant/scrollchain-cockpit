"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { QuantumTensorFusionMaterialType } from "./shaders/QuantumTensorFusionMaterial";

export default function QuantumTensorFusionField() {
  const meshRef = useRef<any>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!meshRef.current) return;

    const mat = meshRef.current.material as QuantumTensorFusionMaterialType;
    mat.time = t;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <planeGeometry args={[18, 18, 256, 256]} />
      <quantumTensorFusionMaterial
        time={0}
        warp={1.35}
        amplitude={0.85}
      />
    </mesh>
  );
}

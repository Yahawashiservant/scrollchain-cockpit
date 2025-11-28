"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { EventHorizonMaterialType } from "./shaders/EventHorizonMaterial";

export default function QuantumSingularityCore() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const mat = ref.current.material as EventHorizonMaterialType;

    mat.uniforms.time.value = t;
    mat.uniforms.glowIntensity.value = 2.0 + Math.sin(t * 0.4) * 1.0;
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <circleGeometry args={[3.5, 128]} />
      <eventHorizonMaterial
        time={0}
        radius={1.25}
        distortion={0.45}
        glowIntensity={2.0}
      />
    </mesh>
  );
}

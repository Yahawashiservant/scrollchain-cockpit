"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { HologramMaterialType } from "./shaders/HologramMaterial";

export default function QuantumHologramTorus() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (ref.current) {
      ref.current.rotation.x = t * 0.2;
      ref.current.rotation.y = t * 0.15;

      // --- TYPE-SAFE ACCESS TO UNIFORMS ---
      const mat = ref.current.material as HologramMaterialType;
      if (mat.uniforms?.time) {
        mat.uniforms.time.value = t;
      }
    }
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[1, 0.28, 64, 256]} />
      {/** the hologram shader material */}
      <hologramMaterial time={0} />
    </mesh>
  );
}

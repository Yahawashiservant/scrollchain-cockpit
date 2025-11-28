"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import "@/components/quantum/shaders/registry";
import { TensorCurvatureMaterial } from "./shaders/TensorCurvatureMaterial";

export default function TensorCurvatureField() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const mesh = meshRef.current;

    // HARD RUNTIME GUARD — prevents browser crashes
    if (!mesh || !mesh.material) return;
    const mat = mesh.material as InstanceType<typeof tensorcurvaturematerial;
    if (!mat.uniforms) return;

    if (mat.uniforms.time) mat.uniforms.time.value = t;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[5, 5, 64, 64]} />

      {/* GUARANTEED CORRECT MATERIAL INSTANCE */}
      <tensorCurvatureMaterial time={0} intensity={1.0} warp={1.35} />
    </mesh>
  );
}

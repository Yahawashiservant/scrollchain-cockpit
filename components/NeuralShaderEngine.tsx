"use client";

import { Canvas } from "@react-three/fiber";

export default function NeuralShaderEngine() {
  return (
    <Canvas style={{ height: 400 }}>
      <color attach="background" args={["black"]} />
    </Canvas>
  );
}

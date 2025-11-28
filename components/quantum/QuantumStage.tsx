"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { ReactNode } from "react";

interface QuantumStageProps {
  children?: ReactNode;
}

export default function QuantumStage({ children }: QuantumStageProps) {
  return (
    <div className="w-full h-full min-h-[500px] rounded-xl overflow-hidden bg-black relative border border-purple-900/30">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} gl={{ antialias: true }}>
        <color attach="background" args={["#050505"]} />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#8b5cf6" />
        <OrbitControls enablePan={false} />
        {children}
      </Canvas>
    </div>
  );
}

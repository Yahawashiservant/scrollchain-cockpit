"use client";
import { Canvas } from "@react-three/fiber";
import { Stars, Float, Sparkles } from "@react-three/drei";

export default function CyberScene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        <color attach="background" args={["#020204"]} />
        <fog attach="fog" args={["#020204", 10, 40]} />
        <Stars radius={100} depth={50} count={7000} factor={6} saturation={0} fade speed={1} />
        <Sparkles count={300} scale={20} size={4} speed={0.3} opacity={0.6} color="#00ffff" />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh rotation={[0.5, 0.5, 0]} position={[5, -2, -10]}>
             <icosahedronGeometry args={[4, 0]} />
             <meshStandardMaterial color="#06b6d4" wireframe transparent opacity={0.08} />
          </mesh>
        </Float>
      </Canvas>
    </div>
  );
}

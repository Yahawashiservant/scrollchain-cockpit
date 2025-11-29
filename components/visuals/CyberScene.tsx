"use client";
import { Canvas } from "@react-three/fiber";
import { Stars, Float, Sparkles, Torus, Icosahedron, Sphere } from "@react-three/drei";

export default function CyberScene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        <color attach="background" args={["#02040a"]} />
        <fog attach="fog" args={["#02040a", 10, 50]} />
        <Stars radius={80} depth={60} count={5000} factor={4} saturation={0} fade speed={1} />
        <Sparkles count={300} scale={20} size={3} speed={0.4} opacity={0.5} color="#06b6d4" />
        <ambientLight intensity={0.5} />
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
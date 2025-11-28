"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Float } from "@react-three/drei";

export default function CyberScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <color attach="background" args={["#02040a"]} />
        <fog attach="fog" args={["#02040a", 5, 15]} />
        <Stars radius={80} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#06b6d4" />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh rotation={[0.5, 0.5, 0]}>
            <icosahedronGeometry args={[2, 0]} />
            <meshStandardMaterial color="#06b6d4" wireframe transparent opacity={0.15} />
          </mesh>
        </Float>
      </Canvas>
    </div>
  );
}

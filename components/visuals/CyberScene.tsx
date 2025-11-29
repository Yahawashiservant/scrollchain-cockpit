"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, Sparkles, Torus, Icosahedron, Sphere } from "@react-three/drei";
import { useRef } from "react";

function ActiveMesh({ category }: { category: string }) {
  const mesh = useRef<any>(null);
  useFrame((state) => { if(mesh.current){ mesh.current.rotation.x += 0.005; mesh.current.rotation.y += 0.01; } });

  if (category.includes("FINANCE")) return <Torus ref={mesh} args={[1.5, 0.4, 32, 100]}><meshStandardMaterial color="#eab308" wireframe transparent opacity={0.2} /></Torus>;
  if (category.includes("SECURITY")) return <Icosahedron ref={mesh} args={[2, 1]}><meshStandardMaterial color="#ef4444" wireframe transparent opacity={0.2} /></Icosahedron>;
  if (category.includes("AI")) return <points ref={mesh}><icosahedronGeometry args={[2, 4]} /><pointsMaterial color="#a855f7" size={0.04} transparent opacity={0.5} /></points>;
  return <Sphere ref={mesh} args={[1.8, 32, 32]}><meshStandardMaterial color="#06b6d4" wireframe transparent opacity={0.1} /></Sphere>;
}

export default function CyberScene({ category = "CORE" }: { category?: string }) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
        <color attach="background" args={["#02040a"]} />
        <fog attach="fog" args={["#02040a", 5, 30]} />
        <Stars radius={80} depth={60} count={5000} factor={4} saturation={0} fade speed={0.5} />
        <Sparkles count={300} scale={12} size={3} speed={0.2} opacity={0.5} color="#ffffff" />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}><ActiveMesh category={category} /></Float>
      </Canvas>
    </div>
  );
}

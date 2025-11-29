"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, Sparkles, Torus, Icosahedron, Sphere } from "@react-three/drei";
import { useRef } from "react";

function ActiveMesh({ category, mouse }: { category: string, mouse: any }) {
  const mesh = useRef<any>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += 0.002;
    mesh.current.rotation.y += 0.005;
    
    // Mouse Parallax
    if (mouse.current) {
        const targetX = (mouse.current[0] * Math.PI) / 10;
        const targetY = (mouse.current[1] * Math.PI) / 10;
        mesh.current.rotation.x += 0.05 * (targetY - mesh.current.rotation.x);
        mesh.current.rotation.y += 0.05 * (targetX - mesh.current.rotation.y);
    }
  });

  if (category.includes("FINANCE")) return <Torus ref={mesh} args={[1.5, 0.4, 32, 100]}><meshStandardMaterial color="#eab308" wireframe transparent opacity={0.2} /></Torus>;
  if (category.includes("SECURITY")) return <Icosahedron ref={mesh} args={[2, 1]}><meshStandardMaterial color="#ef4444" wireframe transparent opacity={0.2} /></Icosahedron>;
  if (category.includes("AI")) return <points ref={mesh}><icosahedronGeometry args={[2, 4]} /><pointsMaterial color="#a855f7" size={0.04} transparent opacity={0.5} /></points>;
  return <Sphere ref={mesh} args={[1.8, 32, 32]}><meshStandardMaterial color="#06b6d4" wireframe transparent opacity={0.1} /></Sphere>;
}

export default function CyberScene({ category = "CORE" }: { category?: string }) {
  const mouse = useRef([0, 0]);
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" onMouseMove={(e) => {
        mouse.current = [(e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1];
    }}>
      <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
        <color attach="background" args={["#02040a"]} />
        <fog attach="fog" args={["#02040a", 5, 30]} />
        <Stars radius={80} depth={60} count={8000} factor={5} saturation={0} fade speed={0.5} />
        <Sparkles count={400} scale={15} size={3} speed={0.2} opacity={0.5} color="#ffffff" />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
           <ActiveMesh category={category} mouse={mouse} />
        </Float>
      </Canvas>
    </div>
  );
}

"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, Sparkles, Torus, Icosahedron, Sphere } from "@react-three/drei";
import { useRef } from "react";

function ActiveMesh({ category }: { category: string }) {
  const mesh = useRef<any>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    // Slow down rotation for better performance
    mesh.current.rotation.x = state.clock.getElapsedTime() * 0.1;
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.15;
  });

  if (category.includes("FINANCE")) return <Torus ref={mesh} args={[1.5, 0.4, 16, 50]}><meshStandardMaterial color="#eab308" wireframe transparent opacity={0.3} /></Torus>;
  if (category.includes("SECURITY")) return <Icosahedron ref={mesh} args={[2, 0]}><meshStandardMaterial color="#ef4444" wireframe transparent opacity={0.3} /></Icosahedron>;
  if (category.includes("AI")) return <points ref={mesh}><icosahedronGeometry args={[2, 2]} /><pointsMaterial color="#a855f7" size={0.05} transparent opacity={0.6} /></points>;
  
  return <Sphere ref={mesh} args={[1.8, 16, 16]}><meshStandardMaterial color="#06b6d4" wireframe transparent opacity={0.1} /></Sphere>;
}

export default function CyberScene({ category = "CORE" }: { category?: string }) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Lower pixel ratio and disable antialias for performance */}
      <Canvas camera={{ position: [0, 0, 12], fov: 50 }} dpr={[1, 1.5]} gl={{ antialias: false }}>
        <color attach="background" args={["#02040a"]} />
        <fog attach="fog" args={["#02040a", 5, 30]} />
        
        {/* OPTIMIZED: Reduced count from 8000 to 800 */}
        <Stars radius={80} depth={60} count={800} factor={4} saturation={0} fade speed={0.2} />
        {/* OPTIMIZED: Reduced count from 400 to 50 */}
        <Sparkles count={50} scale={15} size={4} speed={0.2} opacity={0.4} color="#06b6d4" />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
           <ActiveMesh category={category} />
        </Float>
      </Canvas>
    </div>
  );
}

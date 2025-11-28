"use client";
import { useRef } from "react";
import { useFrame, Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function NeuralMesh() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.3;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.2;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.5, 1]} />
      <meshStandardMaterial color="#f59e0b" wireframe />
    </mesh>
  );
}

export default function NeuralShaderEnginePanel() {
  return (
    <div className="w-full h-full bg-black rounded-lg overflow-hidden border border-yellow-900/30">
       <Canvas camera={{ position: [0, 0, 5] }}>
         <ambientLight intensity={0.5} />
         <pointLight position={[10, 10, 10]} />
         <NeuralMesh />
         <OrbitControls enablePan={false} />
       </Canvas>
    </div>
  );
}

"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import QuantumTorus from "../../../components/QuantumTorus";

export default function RecursivePage() {
  return (
    <div className="h-full w-full bg-black relative">
       <div className="absolute top-4 left-4 z-10 pointer-events-none">
          <h1 className="text-xl font-bold text-purple-400">RECURSIVE FRACTAL ENGINE</h1>
       </div>
       <Canvas camera={{ position: [0, 0, 5] }}>
         <ambientLight intensity={0.5} />
         <pointLight position={[10, 10, 10]} />
         <group>
           <QuantumTorus />
           <mesh position={[2, 0, 0]} scale={0.5}><boxGeometry /><meshStandardMaterial color="purple" wireframe /></mesh>
           <mesh position={[-2, 0, 0]} scale={0.5}><boxGeometry /><meshStandardMaterial color="purple" wireframe /></mesh>
           <mesh position={[0, 2, 0]} scale={0.5}><boxGeometry /><meshStandardMaterial color="purple" wireframe /></mesh>
           <mesh position={[0, -2, 0]} scale={0.5}><boxGeometry /><meshStandardMaterial color="purple" wireframe /></mesh>
         </group>
         <OrbitControls />
       </Canvas>
    </div>
  );
}

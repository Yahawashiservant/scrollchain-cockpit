"use client";
import { Canvas } from "@react-three/fiber";
import QuantumTorus from "../../../components/QuantumTorus";

export default function Page() {
  return (
    <div className="h-full w-full bg-black relative">
       <div className="absolute top-4 left-4 z-10">
          <h1 className="text-xl font-bold text-cyan-400">QUANTUM BRIDGE</h1>
          <div className="text-xs text-cyan-600">L1 {'<-->'} L2 SYNC</div>
       </div>
       <Canvas camera={{ position: [0, 0, 5] }}>
         <ambientLight intensity={0.5} />
         <pointLight position={[10, 10, 10]} />
         <QuantumTorus />
       </Canvas>
    </div>
  );
}

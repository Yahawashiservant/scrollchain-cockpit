"use client";
import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";

export default function CosmicLayout({ title }: { title: string }) {
  return (
    <div className="h-full w-full relative bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas>
           <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
           <OrbitControls autoRotate autoRotateSpeed={0.5} enableZoom={false} />
        </Canvas>
      </div>
      
      <div className="absolute inset-0 z-10 p-8 flex flex-col">
         <h1 className="text-5xl font-thin text-white tracking-[0.5em] text-center mix-blend-overlay opacity-80">{title.toUpperCase()}</h1>
         
         <div className="flex-1 flex items-center justify-center">
            <div className="w-64 h-64 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-sm">
               <div className="w-48 h-48 rounded-full border border-white/20 flex items-center justify-center">
                  <div className="text-xs text-cyan-200 font-mono">ORBITAL STABLE</div>
               </div>
            </div>
         </div>
         
         <div className="grid grid-cols-3 gap-4 text-center text-xs text-gray-500 font-mono">
            <div>TELEM: ACTIVE</div>
            <div>VACUUM: 100%</div>
            <div>RADIATION: NOMINAL</div>
         </div>
      </div>
    </div>
  );
}

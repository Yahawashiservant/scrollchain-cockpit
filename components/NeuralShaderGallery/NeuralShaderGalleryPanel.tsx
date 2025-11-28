"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as Materials from "@/components/shaders";

export default function NeuralShaderGalleryPanel() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <h1 className="text-amber-400 text-3xl font-bold">
        ScrollChain Neural Shader Gallery
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(Materials).map(([name, Material]) => {
          const isExpanded = expanded === name;
          return (
            <div
              key={name}
              className={isExpanded ? "border border-amber-400/20 rounded-xl p-4 bg-black/40 backdrop-blur col-span-3 h-[600px]" : "border border-amber-400/20 rounded-xl p-4 bg-black/40 backdrop-blur h-[300px]"}
              onClick={() => setExpanded(isExpanded ? null : name)}
            >
              <div className="text-amber-300 text-lg font-semibold mb-2">
                {name}
              </div>

              <Canvas camera={{ position: [0, 0, 4] }}>
                <Suspense fallback={null}>
                  <mesh rotation={[0.4, 0.3, 0.1]}>
                    <boxGeometry args={[1.5, 1.5, 1.5]} />
                    <Material time={0} />
                  </mesh>
                  <OrbitControls enablePan={false} />
                </Suspense>
              </Canvas>
            </div>
          );
        })}
      </div>
    </div>
  );
}

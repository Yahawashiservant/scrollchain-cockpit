"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function ScrollEntropyShader() {
  const ref = useRef<any>();

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.1;
  });

  return (
    <mesh ref={ref} position={[0, -1.2, 0]}>
      <circleGeometry args={[2, 64]} />
      <meshBasicMaterial
        color="#0033ff"
        wireframe
        transparent
        opacity={0.4}
      />
    </mesh>
  );
}

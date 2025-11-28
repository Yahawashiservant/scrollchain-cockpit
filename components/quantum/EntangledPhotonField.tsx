"use client";
import { useRef } from "react";
import * as THREE from "three";

export default function EntangledPhotonField() {
  return (
    <points>
      <sphereGeometry args={[4, 32, 32]} />
      <pointsMaterial color="#ec4899" size={0.05} transparent opacity={0.4} />
    </points>
  );
}

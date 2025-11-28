"use client";

import { shaderMaterial } from "@react-three/drei";
import { extend, ReactThreeFiber } from "@react-three/fiber";
import * as THREE from "three";

  { time: 0, scale: 2.0, resonance: 1.5 },

  // vertex
  `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix *
                    modelViewMatrix *
                    vec4(position, 1.0);
    }
  `,

  // fragment
  `
    uniform float time;
    uniform float scale;
    uniform float resonance;

    varying vec2 vUv;

    void main() {
      float wave =
        sin(vUv.x * scale + time * resonance) +
        cos(vUv.y * scale * 1.5 + time * (resonance * 0.75));

      float glow = abs(wave) * 0.35;

      vec3 col = mix(
        vec3(0.0, 0.1, 0.2),
        vec3(0.3, 0.9, 1.0),
        glow
      );

      gl_FragColor = vec4(col, 1.0);
    }
  `
);


  uniforms: {
    time: { value: number };
    scale: { value: number };
    resonance: { value: number };
  };
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      quantumLatticeResonanceMaterial: ReactThreeFiber.Object3DNode<
      > & {
        time?: number;
        scale?: number;
        resonance?: number;
      };
    }
  }
}



export { QuantumLatticeResonanceMaterial };

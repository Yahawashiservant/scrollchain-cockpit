"use client";

import { shaderMaterial } from "@react-three/drei";
import { extend, ReactThreeFiber } from "@react-three/fiber";
import * as THREE from "three";

const QuantumInterferenceMaterial = shaderMaterial(
  { time: 0, intensity: 0.85 },

  // Vertex Shader
  `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix *
                    modelViewMatrix *
                    vec4(position, 1.0);
    }
  `,

  // Fragment Shader
  `
    uniform float time;
    uniform float intensity;
    varying vec2 vUv;

    void main() {
      float waveA = sin(vUv.x * 10.0 + time * 1.7);
      float waveB = cos(vUv.y * 14.0 + time * 2.3);

      float interference = waveA * waveB;

      float glow = abs(interference) * intensity;

      vec3 color = mix(
        vec3(0.05, 0.0, 0.1),
        vec3(0.8, 0.2, 1.0),
        glow
      );

      gl_FragColor = vec4(color, 1.0);
    }
  `
);

extend({ QuantumInterferenceMaterial });

 
  uniforms: {
    time: { value: number };
    intensity: { value: number };
  };
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      quantumInterferenceMaterial: ReactThreeFiber.Object3DNode<
        QuantumInterferenceMaterialType,
        typeof QuantumInterferenceMaterial
      > & {
        time?: number;
        intensity?: number;
      };
    }
  }
}



export { QuantumInterferenceMaterial };

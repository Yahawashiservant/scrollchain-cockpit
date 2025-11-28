"use client";

import { shaderMaterial } from "@react-three/drei";
import { extend, ReactThreeFiber } from "@react-three/fiber";
import * as THREE from "three";

const StandingWaveMaterial = shaderMaterial(
  { time: 0, frequency: 4.0, amplitude: 0.3 },

  `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix *
                    modelViewMatrix *
                    vec4(position, 1.0);
    }
  `,

  `
    uniform float time;
    uniform float frequency;
    uniform float amplitude;

    varying vec2 vUv;

    void main() {
      float wave =
        sin(vUv.x * frequency + time) *
        cos(vUv.y * frequency + time);

      float mag = abs(wave * amplitude);

      vec3 col = mix(
        vec3(0.0, 0.04, 0.1),
        vec3(0.0, 0.9, 0.5),
        mag
      );

      gl_FragColor = vec4(col, 1.0);
    }
  `
);

extend({ StandingWaveMaterial });

 
  uniforms: {
    time: { value: number };
    frequency: { value: number };
    amplitude: { value: number };
  };
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      standingWaveMaterial: ReactThreeFiber.Object3DNode<
        StandingWaveMaterialType,
        typeof StandingWaveMaterial
      > & {
        time?: number;
        frequency?: number;
        amplitude?: number;
      };
    }
  }
}



export { StandingWaveMaterial };

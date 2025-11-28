"use client";

import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";

// -------------------------------------
// 1. CREATE HOLOGRAM SHADER MATERIAL
// -------------------------------------
const HologramMaterial = shaderMaterial(
  { time: 0 },

  // Vertex Shader
  `
    varying vec3 vPos;
    varying float vWave;

    void main() {
      vPos = position;
      vWave = sin(position.y * 4.0 + position.x * 2.0) * 0.15;

      vec3 displaced = position + normal * vWave;

      gl_Position = projectionMatrix *
                    modelViewMatrix *
                    vec4(displaced, 1.0);
    }
  `,

  // Fragment Shader
  `
    varying vec3 vPos;
    varying float vWave;
    uniform float time;

    void main() {
      float wave = sin(vPos.x * 3.0 + time * 2.0) * 0.5 + 0.5;
      float glow = smoothstep(0.0, 1.0, wave + vWave);

      vec3 color = mix(vec3(0.0, 0.2, 1.0), vec3(0.0, 1.0, 1.0), glow);

      gl_FragColor = vec4(color, 0.95);
    }
  `
);

// Register so <hologramMaterial /> becomes valid JSX
extend({ HologramMaterial });

// -------------------------------------
// 2. TYPE DECLARATION FOR JSX SUPPORT
// -------------------------------------
declare global {
  namespace JSX {
    interface IntrinsicElements {
      hologramMaterial: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        time?: number;
        attach?: string;
      };
    }
  }
}

// -------------------------------------
// 3. Specific type for updating uniforms
// -------------------------------------
 
  uniforms: {
    time: { value: number };
  };
};





export { HologramMaterial };

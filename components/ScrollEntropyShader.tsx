"use client"

import * as THREE from "three"
import { shaderMaterial } from "@react-three/drei"
import { extend, useFrame } from "@react-three/fiber"
import { useRef } from "react"

const ScrollEntropyMaterial = shaderMaterial(
  { time: 0 },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
  `
    uniform float time;
    varying vec2 vUv;
    void main() {
      gl_FragColor = vec4(abs(sin(time+vUv.x)), abs(cos(time+vUv.y)), 0.5, 1.0);
    }
  `
)

extend({ ScrollEntropyMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      scrollEntropyMaterial: any
    }
  }
}

export default function ScrollEntropyShader() {
  const ref = useRef<any>()

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.time += delta
    }
  })

  return (
    <mesh>
      <planeGeometry args={[50, 50, 256, 256]} />
      <scrollEntropyMaterial ref={ref} />
    </mesh>
  )
}

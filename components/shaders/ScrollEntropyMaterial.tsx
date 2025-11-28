import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

const fragmentShader = `
  uniform float time;
  void main() {
    float v = abs(sin(time * 3.0));
    gl_FragColor = vec4(0.2, v, 1.0 - v, 1.0);
  }
`;

const vertexShader = `
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
`;

const ScrollEntropyMaterial = shaderMaterial(
  { time: 0 },
  vertexShader,
  fragmentShader
);

extend({ ScrollEntropyMaterial });
export default ScrollEntropyMaterial;

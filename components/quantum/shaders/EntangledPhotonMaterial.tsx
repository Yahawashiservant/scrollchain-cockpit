import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

const fragmentShader = `
  uniform float time;
  void main() {
    float glow = abs(sin(time * 2.0));
    gl_FragColor = vec4(glow, 0.2, 1.0 - glow, 1.0);
  }
`;

const vertexShader = `
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
`;

const EntangledPhotonMaterial = shaderMaterial(
  { time: 0 },
  vertexShader,
  fragmentShader
);

extend({ EntangledPhotonMaterial });
export default EntangledPhotonMaterial;

export { EntangledPhotonMaterial };

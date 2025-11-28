import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

const fragmentShader = `
  uniform float time;
  void main() {
    float v = sin(time + gl_FragCoord.x * 0.01) * 0.5 + 0.5;
    gl_FragColor = vec4(v, 0.1, 1.0 - v, 1.0);
  }
`;

const vertexShader = `
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
`;

const QuantumTensorFusionMaterial = shaderMaterial(
  { time: 0 },
  vertexShader,
  fragmentShader
);

extend({ QuantumTensorFusionMaterial });
export default QuantumTensorFusionMaterial;

export { QuantumTensorFusionMaterial };

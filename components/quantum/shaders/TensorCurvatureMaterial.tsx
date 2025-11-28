import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

const fragmentShader = `
  uniform float time;
  void main() {
    float f = abs(sin(time * 4.0 + gl_FragCoord.y * 0.02));
    gl_FragColor = vec4(f, 0.3, 0.9 - f, 1.0);
  }
`;

const vertexShader = `
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
`;

const TensorCurvatureMaterial = shaderMaterial(
  { time: 0 },
  vertexShader,
  fragmentShader
);

extend({ TensorCurvatureMaterial });
export default TensorCurvatureMaterial;

export { TensorCurvatureMaterial };

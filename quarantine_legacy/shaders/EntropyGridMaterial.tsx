import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

const fragmentShader = `
  uniform float time;
  void main() {
    float grid = step(0.9, fract((gl_FragCoord.x + gl_FragCoord.y + time * 20.0) * 0.05));
    gl_FragColor = vec4(grid, grid * 0.4, 1.0 - grid, 1.0);
  }
`;

const vertexShader = `
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
`;

const EntropyGridMaterial = shaderMaterial(
  { time: 0 },
  vertexShader,
  fragmentShader
);

extend({ EntropyGridMaterial });
export default EntropyGridMaterial;

import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

const fragmentShader = `
  uniform float time;
  void main() {
    float r = length(gl_PointCoord - 0.5);
    float halo = smoothstep(0.5, 0.2, r) * abs(sin(time * 3.0));
    gl_FragColor = vec4(halo, halo * 0.8, 1.0, 1.0);
  }
`;

const vertexShader = `
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
`;

const EventHorizonMaterial = shaderMaterial(
  { time: 0 },
  vertexShader,
  fragmentShader
);

extend({ EventHorizonMaterial });
export default EventHorizonMaterial;

export { EventHorizonMaterial };

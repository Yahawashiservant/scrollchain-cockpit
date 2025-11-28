import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

const fragmentShader = `\
  uniform float time;\
  void main() {\
    float swirl = abs(sin((gl_FragCoord.x + gl_FragCoord.y) * 0.01 + time));\
    gl_FragColor = vec4(swirl, 0.2, 1.0 - swirl, 1.0);\
  }\
`;

const vertexShader = `\
  void main() {\
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);\
  }\
`;

const VortexMaterial = shaderMaterial(
  { time: 0 },
  vertexShader,
  fragmentShader
);

extend({ VortexMaterial });
export default VortexMaterial;

export { VortexMaterial };

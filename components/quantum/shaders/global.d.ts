import { ReactThreeFiber } from "@react-three/fiber";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      entangledPhotonMaterial: ReactThreeFiber.Object3DNode<
        any,
        typeof EntangledPhotonMaterial
      >;
      entropyGridMaterial: ReactThreeFiber.Object3DNode<
        any,
        typeof EntropyGridMaterial
      >;
      eventHorizonMaterial: ReactThreeFiber.Object3DNode<
        any,
        typeof EventHorizonMaterial
      >;
      hologramMaterial: ReactThreeFiber.Object3DNode<
        any,
        typeof HologramMaterial
      >;
      quantumInterferenceMaterial: ReactThreeFiber.Object3DNode<
        any,
        typeof QuantumInterferenceMaterial
      >;
      quantumLatticeResonanceMaterial: ReactThreeFiber.Object3DNode<
        any,
        typeof QuantumLatticeResonanceMaterial
      >;
      quantumTensorFusionMaterial: ReactThreeFiber.Object3DNode<
        any,
        typeof QuantumTensorFusionMaterial
      >;
      standingWaveMaterial: ReactThreeFiber.Object3DNode<
        any,
        typeof StandingWaveMaterial
      >;
      tensorCurvatureMaterial: ReactThreeFiber.Object3DNode<
        any,
        typeof TensorCurvatureMaterial
      >;
      vortexMaterial: ReactThreeFiber.Object3DNode<
        any,
        typeof VortexMaterial
      >;
    }
  }
}
